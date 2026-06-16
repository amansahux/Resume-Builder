import React from "react";
import { Edit3, Download, Check, Loader2, Trash2 } from "lucide-react";

interface ResumeActionsProps {
  onEdit: () => void;
  onExport: () => void;
  onDelete: () => void;
  exportState: "idle" | "loading" | "success";
}

export default function ResumeActions({ onEdit, onExport, onDelete, exportState }: ResumeActionsProps) {
  const isIdle = exportState === "idle";
  const isLoading = exportState === "loading";
  const isSuccess = exportState === "success";

  return (
    <div className="flex gap-2 pt-2 w-full items-center">
      {/* Edit Button */}
      <button
        onClick={onEdit}
        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-brand-400/60 bg-transparent text-text-primary text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-brand-500 hover:border-transparent hover:shadow-md transition-all duration-300 active:scale-[0.98]"
      >
        <Edit3 className="w-3.5 h-3.5" />
        Edit
      </button>

      {/* Export Button */}
      <button
        onClick={onExport}
        disabled={!isIdle}
        className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-300 active:scale-[0.98] ${
          isSuccess
            ? "bg-brand-500 text-text-primary border border-transparent shadow-sm"
            : isLoading
            ? "bg-brand-400/50 text-text-secondary border border-brand-400/40 cursor-not-allowed"
            : "bg-text-primary text-brand-100 hover:bg-text-secondary hover:shadow-lg"
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Gen...</span>
          </>
        ) : isSuccess ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Saved</span>
          </>
        ) : (
          <>
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </>
        )}
      </button>

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="flex items-center justify-center p-2.5 rounded-xl border border-red-200/60 bg-transparent text-red-500 hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-300 active:scale-[0.98] cursor-pointer"
        title="Delete Resume"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
