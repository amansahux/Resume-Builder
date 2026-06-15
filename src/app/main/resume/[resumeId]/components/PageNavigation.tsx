"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useWorkspace } from "../workspace-context";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface PageNavigationProps {
  onSave?: () => Promise<void>;
  isSubmitting?: boolean;
  canSkip?: boolean;
}

export default function PageNavigation({
  onSave,
  isSubmitting = false,
  canSkip = false,
}: PageNavigationProps) {
  const router = useRouter();
  const params = useParams();
  const resumeId = params?.resumeId as string;
  const { steps, currentStepIndex } = useWorkspace();

  const prevStep = currentStepIndex > 0 ? steps[currentStepIndex - 1] : null;
  const nextStep = currentStepIndex < steps.length - 1 ? steps[currentStepIndex + 1] : null;

  const handleBack = () => {
    if (prevStep) {
      router.push(`/main/resume/${resumeId}/${prevStep.path}`);
    } else {
      router.push("/main/resume");
    }
  };

  const handleSkip = () => {
    if (nextStep) {
      router.push(`/main/resume/${resumeId}/${nextStep.path}`);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-brand-400/20 pt-6 mt-8">
      <button
        type="button"
        onClick={handleBack}
        className="flex items-center justify-center gap-2 px-6 py-3 border border-brand-400/50 text-text-secondary hover:text-text-primary hover:border-text-primary rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {canSkip && nextStep && (
          <button
            type="button"
            onClick={handleSkip}
            className="px-6 py-3 border border-transparent text-text-muted hover:text-text-primary text-sm font-medium transition-all duration-200 cursor-pointer"
          >
            Skip & Continue
          </button>
        )}

        <button
          type="submit"
          onClick={onSave ? (e) => { e.preventDefault(); onSave(); } : undefined}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-brand-500 hover:bg-brand-dark text-text-primary font-semibold rounded-xl text-sm tracking-wide uppercase shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-text-primary" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <span>{currentStepIndex === steps.length - 1 ? "Finish & Complete" : "Save & Continue"}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
        <button></button>
      </div>
    </div>
  );
}
