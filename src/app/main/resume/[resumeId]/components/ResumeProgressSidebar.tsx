"use client";

import React from "react";
import { useWorkspace, Step } from "../workspace-context";
import { useRouter, useParams } from "next/navigation";
import { Check, Dot, Circle } from "lucide-react";

export default function ResumeProgressSidebar() {
  const { steps, currentStepIndex, isStepCompleted } = useWorkspace();
  const router = useRouter();
  const params = useParams();
  const resumeId = params?.resumeId as string;

  const handleNavigate = (step: Step, index: number) => {
    // Only allow navigating if step is completed or it is within reach (optional steps or next in line)
    // For luxury experience, let's allow free navigation between any steps, or at least previously visited ones
    router.push(`/main/resume/${resumeId}/${step.path}`);
  };

  return (
    <aside className="w-80 border-r border-brand-400/30 bg-brand-200/50 p-8 hidden lg:block shrink-0 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Crafting Progress
          </h3>
          <p className="text-xs text-text-secondary mt-1">
            Build your portfolio step by step.
          </p>
        </div>

        <nav className="space-y-2 relative" aria-label="Progress sidebar">
          {steps.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isCompleted = isStepCompleted(step.id);
            
            return (
              <button
                key={step.id}
                onClick={() => handleNavigate(step, index)}
                className={`w-full flex items-center justify-between text-left p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-white border-brand-400 shadow-md text-text-primary scale-[1.01]"
                    : "bg-transparent border-transparent text-text-secondary hover:bg-brand-300/20 hover:text-text-primary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] transition-all duration-300 ${
                      isCompleted
                        ? "bg-brand-500 border-brand-500 text-white"
                        : isActive
                        ? "border-brand-500 text-brand-500 font-bold bg-brand-500/10"
                        : "border-brand-400 text-text-muted"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium tracking-tight">
                      {step.name}
                    </span>
                    {!step.required && (
                      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono">
                        Optional
                      </span>
                    )}
                  </div>
                </div>

                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
