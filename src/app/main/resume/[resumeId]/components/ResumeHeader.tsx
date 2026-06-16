"use client";

import React from "react";
import Link from "next/link";
import { useWorkspace } from "../workspace-context";
import { Sparkles, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ResumeHeader() {
  const { resume, completionPercentage } = useWorkspace();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-400/40 bg-brand-100/80 backdrop-blur-md">
      <div className="flex w-full items-center">
        {/* Left header portion, matching sidebar width & padding */}
        <div className="w-80 shrink-0 p-8 border-r border-brand-400/30 hidden lg:flex items-center h-[73px]">
          <Link
            href="/main/resume"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Resumes</span>
          </Link>
        </div>

        {/* Right header portion, matching main content padding & max-width */}
        <div className="flex-1 px-6 md:px-8 lg:px-10 py-4 h-[73px] flex items-center">
          <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/main/resume"
                className="lg:hidden flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">All Resumes</span>
              </Link>
              <div className="h-4 w-[1px] bg-brand-400/40 lg:hidden" />
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
        </div>
      </div>
    </header>
  );
}
