"use client";

import React from "react";
import { useAuth } from "@/context/auth-context";
import { Sparkles, LogOut, Mail, Phone, User as UserIcon, ShieldCheck } from "lucide-react";

export default function MainPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative overflow-hidden">
      {/* Subtle decorative glow */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />

      {/* Navigation */}
      <header className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-zinc-950" />
            </div>
            <span className="text-md font-semibold tracking-wider bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent uppercase">
              ApexResume
            </span>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 text-zinc-400 hover:text-zinc-200 text-sm font-light transition-all duration-300 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full relative group">
          {/* Glowing border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-amber-300 rounded-2xl opacity-10 group-hover:opacity-20 transition duration-1000 blur" />
          
          <div className="relative bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-8 backdrop-blur-xl">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-amber-400" />
              </div>
              <h1 className="text-2xl font-light tracking-tight text-white">
                Secure Session Active
              </h1>
              <p className="text-zinc-500 text-sm font-light mt-1">
                You have successfully authenticated via context hydration
              </p>
            </div>

            {user && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-800/30">
                  <UserIcon className="w-5 h-5 text-amber-400/80" />
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-widest text-zinc-500 font-light">Name</p>
                    <p className="text-zinc-200 font-normal mt-0.5">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-800/30">
                  <Mail className="w-5 h-5 text-amber-400/80" />
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-widest text-zinc-500 font-light">Email Address</p>
                    <p className="text-zinc-200 font-normal mt-0.5">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-800/30">
                  <Phone className="w-5 h-5 text-amber-400/80" />
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-widest text-zinc-500 font-light">Mobile Number</p>
                    <p className="text-zinc-200 font-normal mt-0.5">{user.mobile}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}