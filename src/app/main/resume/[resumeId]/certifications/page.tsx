"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function PersonalInfoPage() {
  const params = useParams();
  const resumeId = params?.resumeId as string;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-950 text-white font-sans">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6 text-center shadow-xl">
        <div className="w-12 h-12 rounded-full bg-brand-500/10 text-brand-500 mx-auto flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-serif tracking-tight">Personal Information</h1>
          <p className="text-sm text-zinc-400">
            Workspace initialized for Resume ID: <span className="font-mono text-brand-400">{resumeId}</span>
          </p>
        </div>
        <div className="pt-4">
          <div className="p-4 bg-zinc-800/50 rounded-xl text-xs text-left border border-zinc-700/50 space-y-2">
            <p className="font-semibold text-zinc-300">Resume Creation Complete</p>
            <p className="text-zinc-400">Next Step: Collect fullname, email, mobile, and social links to complete the executive heading.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
