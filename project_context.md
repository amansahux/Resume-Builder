# Project Context: Resume Builder (Next.js & Mongoose)

This document provides a comprehensive overview of the current codebase of the **Resume Builder** project. You can feed this document directly to ChatGPT, Claude, or other LLMs to context-align them on the project structure and flow.

---

## 1. Project Overview & Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS v4 with CSS imports (`@import "tailwindcss"`)
- **Database / ORM**: MongoDB with Mongoose
- **Authentication**: Custom JWT cookie-based session management (`httpOnly` cookies)
- **Form Handling & Validation**: `react-hook-form` + `zod`

---

## 2. Directory Structure

```
resume_builder/
├── src/
│   ├── apis/                     # Client API requests
│   │   └── auth.ts               # Login, Register, getMe, Logout client APIs
│   ├── app/                      # Next.js App Router Pages & APIs
│   │   ├── api/                  # Backend Endpoints
│   │   │   ├── ai/               # AI generation endpoints (improve-content, ats-score)
│   │   │   ├── auth/             # Backend authentication logic (login, register, me, logout)
│   │   │   └── resume/           # Resume CRUD routes
│   │   ├── auth/                 # Auth pages (login, register)
│   │   ├── main/                 # Protected main dashboard
│   │   ├── layout.tsx            # Root layout wrapped with AuthProvider
│   │   └── page.tsx              # Root index redirect page
│   ├── context/                  # React Context Providers
│   │   └── auth-context.tsx      # Auth State, Hydration Check & Route Protection
│   ├── lib/                      # Helper libraries
│   │   ├── db.ts                 # Mongoose Connection helper
│   │   ├── jwt.ts                # Sign & verify JWT tokens
│   │   └── getCurrentUser.ts     # Extract user ID from cookie token on the server
│   ├── models/                   # Mongoose Database Models
│   │   ├── user.model.ts         # User schema & password hashing
│   │   └── resume.model.ts       # Resume schema (personalInfo, education, experience, etc.)
│   ├── schema/                   # Zod Validation Schemas
│   │   └── auth.schema.ts        # Forms validation schemas for Auth
│   └── types/                    # TypeScript Type Definitions
```

---

## 3. Database Models (`src/models`)

### A. User Model (`src/models/user.model.ts`)
Stores user details. Protects passwords using `bcrypt` pre-save middleware.
- **Fields**:
  - `name`: String (Required)
  - `email`: String (Required, unique)
  - `password`: String (Required, minLength: 6)
  - `mobile`: String (Required, length: 10)
- **Methods**:
  - `comparePassword(candidatePassword)`: Returns a boolean verifying the input.
- **Hot-Reload Safe compile**:
  `const userModal = mongoose.models.users || mongoose.model("users", userSchema)`

### B. Resume Model (`src/models/resume.model.ts`)
Stores user-curated resume documents.
- **Fields**:
  - `user_id`: Reference to `users` model.
  - `title`: String
  - `summary`: String
  - `personalInfo`: `{ fullname, email, mobile, location, github, portfolio }`
  - `education`: Array of `{ institute, degree, startDate, endDate }`
  - `workExperience`: Array of `{ company, position, startDate, endDate, description }`
  - `projects`: Array of `{ title, description, techStack: [String], githubUrl, liveUrl }`
  - `skills`: Array of Strings
  - `certifications`: Array of Strings

---

## 4. Authentication Architecture

### Flow
1. **Login / Register**: The client sends credentials via `src/apis/auth.ts`.
2. **Token Generation**: The server verifies credentials, generates a JWT token containing `{ userId }`, and attaches it to the response as an `httpOnly`, `sameSite: "lax"` cookie named `token`.
3. **Context Hydration**: When the client app mounts, `AuthProvider` calls `/api/auth/me`. The server decodes the cookie using `getCurrentUser.ts` and returns the user's name, email, and phone. The context saves this in state as `user`.
4. **Route Protection**:
   - If a logged-in user hits `/auth/login`, `/auth/register`, or the root `/`, they are redirected to `/main`.
   - If an unauthenticated user hits `/main` or `/`, they are redirected to `/auth/login`.

---

## 5. Key Authentication Files

### A. Auth Context (`src/context/auth-context.tsx`)
```typescript
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getMeAPI, logoutAPI } from "@/apis/auth";
import { AuthContextType, User } from "@/types/user.interface";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const refreshUser = async () => {
    try {
      const data = await getMeAPI();
      setUser(data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refreshUser(); }, []);

  useEffect(() => {
    if (loading) return;
    const isAuthRoute = pathname?.startsWith("/auth");
    const isProtectedRoute = pathname?.startsWith("/main");
    const isRootRoute = pathname === "/";

    if (user) {
      if (isAuthRoute || isRootRoute) router.replace("/main");
    } else {
      if (isProtectedRoute || isRootRoute) router.replace("/auth/login");
    }
  }, [user, loading, pathname, router]);

  const login = (userData: User) => {
    setUser(userData);
    router.replace("/main");
  };

  const logout = async () => {
    try {
      await logoutAPI();
      setUser(null);
      router.replace("/auth/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
}
```

### B. Backend `/api/auth/me` (`src/app/api/auth/me/route.ts`)
```typescript
import { connectToDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import userModal from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();
        const userId = await getCurrentUser();
        const user = await userModal.findById(userId).select("-password");
        if (!user) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        
        return NextResponse.json({
            success: true,
            data: { id: user._id, name: user.name, email: user.email, mobile: user.mobile }
        });
    } catch {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
}
```
