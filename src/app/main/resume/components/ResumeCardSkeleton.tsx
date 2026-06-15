import React from "react";

export default function ResumeCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand-400/30 bg-brand-200/40 p-6 md:p-8 space-y-6 animate-pulse">
      {/* Top Header Shimmer */}
      <div className="flex justify-between items-start">
        <div className="space-y-2.5 w-2/3">
          <div className="h-6 bg-brand-400/40 rounded-md w-11/12" />
          <div className="h-4 bg-brand-400/30 rounded-md w-8/12" />
        </div>
        <div className="h-5 bg-brand-400/40 rounded-full w-16" />
      </div>

      {/* Badges Shimmer */}
      <div className="flex items-center gap-2">
        <div className="h-5 bg-brand-400/30 rounded-md w-24" />
        <div className="h-5 bg-brand-400/30 rounded-md w-20" />
      </div>

      {/* Progress Bar Shimmer */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <div className="h-3 bg-brand-400/30 rounded w-16" />
          <div className="h-3 bg-brand-400/35 rounded w-8" />
        </div>
        <div className="h-2 bg-brand-400/20 rounded-full w-full" />
      </div>

      {/* Date Stamps Shimmer */}
      <div className="pt-2 border-t border-brand-400/20 flex justify-between text-[10px] text-text-secondary/60 font-mono">
        <div className="space-y-1 w-5/12">
          <div className="h-2 bg-brand-400/20 rounded w-full" />
          <div className="h-2 bg-brand-400/20 rounded w-3/4" />
        </div>
        <div className="space-y-1 w-5/12">
          <div className="h-2 bg-brand-400/20 rounded w-full" />
          <div className="h-2 bg-brand-400/20 rounded w-3/4" />
        </div>
      </div>

      {/* Actions Shimmer */}
      <div className="pt-2 flex gap-3">
        <div className="h-10 bg-brand-400/30 rounded-xl flex-1" />
        <div className="h-10 bg-brand-400/30 rounded-xl flex-1" />
      </div>

      {/* Shimmer light reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
    </div>
  );
}
