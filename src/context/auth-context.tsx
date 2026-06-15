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

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isAuthRoute = pathname?.startsWith("/auth");
    const isProtectedRoute = pathname?.startsWith("/main");
    const isRootRoute = pathname === "/";

    if (user) {
      if (isAuthRoute || isRootRoute) {
        router.replace("/main/resume");
      }
    } else {
      if (isProtectedRoute || isRootRoute) {
        router.replace("/auth/login");
      }
    }
  }, [user, loading, pathname, router]);

  const login = (userData: User) => {
    setUser(userData);
    router.replace("/main/resume");
  };

  const logout = async () => {
    try {
      await logoutAPI();
      setUser(null);
      router.replace("/auth/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-zinc-800"></div>
              <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-amber-500 animate-spin"></div>
            </div>
            <div className="text-zinc-400 font-light tracking-widest text-sm animate-pulse uppercase">
              Loading......
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
