import React from "react";
import { FileText, Plus } from "lucide-react";

interface ResumeEmptyStateProps {
  onCreateClick: () => void;
}

export default function ResumeEmptyState({ onCreateClick }: ResumeEmptyStateProps) {
  return (
    <div className="max-w-xl mx-auto text-center px-6 py-16 md:py-24 rounded-2xl border border-dashed border-brand-400/40 bg-brand-200/10 flex flex-col items-center justify-center space-y-6">
      {/* Luxury Empty State Icon */}
      <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-brand-200 border border-brand-400/50 shadow-inner">
        <FileText className="w-10 h-10 text-brand-dark/70 stroke-[1.2]" />
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-brand-500 border-2 border-brand-100 flex items-center justify-center text-text-primary shadow-md">
          <Plus className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-2.5 max-w-sm">
        <h3 className="text-xl font-serif font-bold text-text-primary">
          No resumes yet
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
          Create your first professional resume and start building your career story.
        </p>
      </div>

      <button
        onClick={onCreateClick}
        className="px-8 py-3.5 bg-brand-500 hover:bg-brand-dark text-text-primary rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl active:scale-[0.98] flex items-center gap-2 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        Create Resume
      </button>
    </div>
  );
}
