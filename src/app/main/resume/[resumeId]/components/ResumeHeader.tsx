"use client";

import React from "react";
import Link from "next/link";
import { useWorkspace } from "../workspace-context";
import { Sparkles, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ResumeHeader() {
  const { resume, completionPercentage } = useWorkspace();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-400/40 bg-brand-100/80 backdrop-blur-md px-6 py-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/main/resume"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">All Resumes</span>
          </Link>
          <div className="h-4 w-[1px] bg-brand-400/40 hidden sm:block" />
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-text-muted font-mono font-bold">
              ApexWorkspace
            </span>
            <h1 className="text-base font-serif font-semibold text-text-primary">
              {resume?.title || "Untitled Resume"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Progress Badge */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Completion
            </span>
            <div className="flex items-center gap-1.5 bg-brand-200 border border-brand-400/30 px-3 py-1 rounded-full">
              <span className="text-xs font-bold font-mono text-text-primary">
                {completionPercentage}%
              </span>
              <div className="w-12 h-1.5 bg-brand-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
