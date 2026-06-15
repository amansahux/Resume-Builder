"use client";

import React from "react";

interface LoadingSkeletonProps {
  type?: "form" | "list" | "review";
}

export default function LoadingSkeleton({ type = "form" }: LoadingSkeletonProps) {
  if (type === "list") {
    return (
      <div className="w-full space-y-6 animate-pulse">
        <div className="h-28 bg-brand-300/40 rounded-2xl border border-brand-400/20" />
        <div className="h-28 bg-brand-300/40 rounded-2xl border border-brand-400/20" />
        <div className="h-12 bg-brand-300/40 rounded-xl max-w-xs" />
      </div>
    );
  }

  if (type === "review") {
    return (
      <div className="w-full space-y-8 animate-pulse">
        <div className="h-32 bg-brand-300/40 rounded-2xl border border-brand-400/20" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-48 bg-brand-300/40 rounded-2xl border border-brand-400/20" />
          <div className="h-48 bg-brand-300/40 rounded-2xl border border-brand-400/20" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-pulse">
      <div className="space-y-3">
        <div className="h-4 bg-brand-300/40 rounded-sm w-1/4" />
        <div className="h-12 bg-brand-300/40 rounded-xl w-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="h-4 bg-brand-300/40 rounded-sm w-1/3" />
          <div className="h-12 bg-brand-300/40 rounded-xl w-full" />
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-brand-300/40 rounded-sm w-1/3" />
          <div className="h-12 bg-brand-300/40 rounded-xl w-full" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-brand-300/40 rounded-sm w-1/5" />
        <div className="h-32 bg-brand-300/40 rounded-xl w-full" />
      </div>
      <div className="h-12 bg-brand-300/40 rounded-xl w-full mt-8" />
    </div>
  );
}
