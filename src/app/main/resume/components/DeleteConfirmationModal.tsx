"use client";

import React, { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  resumeTitle?: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
  resumeTitle,
}: DeleteConfirmationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md overflow-hidden relative rounded-2xl border border-brand-300/30 bg-brand-200/90 text-brand-500 shadow-2xl backdrop-blur-xl transition-all duration-300 transform scale-100 p-6 md:p-8 animate-scale-up"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Warning Icon Banner */}
          <div className="w-12 h-12 rounded-full bg-red-100/80 border border-red-200 flex items-center justify-center text-red-600 shadow-sm">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h2
              id="delete-modal-title"
              className="text-2xl font-serif tracking-tight text-black"
            >
              Confirm Deletion
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed font-sans max-w-xs mx-auto">
              Are you sure you want to permanently delete{" "}
              <span className="font-bold text-black italic">
                "{resumeTitle || "this resume"}"
              </span>
              ? This masterpiece will be lost forever.
            </p>
          </div>

          <div className="flex gap-3 pt-3 w-full">
            {/* Cancel Button */}
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-xl border border-brand-400/60 bg-transparent text-text-primary text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-brand-300/40 transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
            >
              Cancel
            </button>

            {/* Delete Button */}
            <button
              onClick={onConfirm}
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-xl bg-red-600 text-white text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-red-700 hover:shadow-lg transition-all duration-300 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Deleting...</span>
                </>
              ) : (
                <span>Delete</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
