"use client";

import React from "react";
import { FolderOpen } from "lucide-react";

interface EmptyStateCardProps {
  title: string;
  description: string;
  onAdd?: () => void;
  buttonLabel?: string;
}

export default function EmptyStateCard({
  title,
  description,
  onAdd,
  buttonLabel = "Add Record",
}: EmptyStateCardProps) {
  return (
    <div className="w-full border border-dashed border-brand-400/50 rounded-2xl p-8 text-center bg-brand-200/20 hover:bg-brand-200/35 transition-all duration-300">
      <div className="w-12 h-12 rounded-full bg-brand-300/30 text-brand-500 mx-auto flex items-center justify-center mb-4">
        <FolderOpen className="w-6 h-6 text-text-secondary" />
      </div>
      <h3 className="text-base font-serif font-semibold text-text-primary">
        {title}
      </h3>
      <p className="text-sm text-text-secondary mt-1 max-w-sm mx-auto leading-relaxed">
        {description}
      </p>
      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="mt-5 inline-flex items-center justify-center px-5 py-2.5 bg-brand-500 hover:bg-brand-dark text-text-primary font-medium rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow cursor-pointer"
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
}
