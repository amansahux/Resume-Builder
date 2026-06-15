"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createResumeAPI } from "@/apis/resume";

interface CreateResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ExperienceLevel = "FRESHER" | "MID_LEVEL" | "EXPERIENCED";

export default function CreateResumeModal({
  isOpen,
  onClose,
}: CreateResumeModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel>("FRESHER");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      // Small timeout to allow animation to start
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      // Prevent background scrolling
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) {
      setError("Please enter a job title.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await createResumeAPI({
        title: title,
        jobTitle: jobTitle,
        level: experienceLevel,
      });
      if (res.success) {
        onClose();
        const resumeId = res.data?._id;
        if (!resumeId) {
          throw new Error("No resume ID returned from server");
        }
        router.push(`/main/resume/${res.data._id}/personalInfo`);
      }
    } catch (error: any) {
      setError(
        error.message || "An error occurred while creating your resume.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg overflow-hidden relative rounded-2xl border border-brand-300/30 bg-brand-200/90 text-brand-500 shadow-2xl backdrop-blur-xl transition-all duration-300 transform scale-100 p-8 md:p-10 animate-scale-up"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 cursor-pointer right-6 p-2 rounded-full text-brand-500/70 hover:text-black hover:bg-brand-300/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mb-8">
          <h2
            id="modal-title"
            className="text-3xl font-serif tracking-tight text-black mb-2"
          >
            Begin Your Masterpiece
          </h2>
          <p className="text-sm text-brand-500/80 leading-relaxed font-sans">
            Define your aspiration. Let our elite AI engine curate a custom
            professional document tailored to your industry standards.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3.5 text-xs text-red-800 bg-red-100/75 border border-red-200 rounded-lg">
              {error}
            </div>
          )}

          {/* Job Title Field */}
          <div className="space-y-2">
            <label
              htmlFor="job-title"
              className="block text-xs font-semibold uppercase tracking-wider text-brand-500/90"
            >
              Title
            </label>
            <input
              ref={inputRef}
              id="title"
              type="text"
              required
              disabled={isSubmitting}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Resume"
              className="w-full px-4 py-3.5 text-sm uppercase rounded-xl border border-brand-400/50 bg-white/70 text-black placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200"
            />
            <label
              htmlFor="job-title"
              className="block text-xs font-semibold uppercase tracking-wider text-brand-500/90"
            >
              Desired Job Title
            </label>
            <input
              id="job-title"
              type="text"
              required
              disabled={isSubmitting}
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Frontend Developer"
              className="w-full px-4 py-3.5 text-sm uppercase rounded-xl border border-brand-400/50 bg-white/70 text-black placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200"
            />
          </div>

          {/* Experience Level Field */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold uppercase tracking-wider text-brand-500/90">
              Experience Level
            </span>
            {/* Premium segmented control */}
            <div className="relative flex p-1 bg-brand-300/40 rounded-xl border border-brand-400/30">
              {/* Animated sliding background indicator */}
              <div
                className="absolute top-1 bottom-1 rounded-lg bg-white shadow-sm transition-all duration-300 ease-out"
                style={{
                  width: "calc(33.33% - 4px)",
                  left:
                    experienceLevel === "FRESHER"
                      ? "4px"
                      : experienceLevel === "MID_LEVEL"
                        ? "calc(33.33% + 2px)"
                        : "calc(66.66% + 0px)",
                }}
              />

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setExperienceLevel("FRESHER")}
                className={`relative z-10 flex-1 py-2 text-xs font-medium tracking-wide uppercase rounded-lg transition-colors duration-300 focus:outline-none ${
                  experienceLevel === "FRESHER"
                    ? "text-black font-semibold"
                    : "text-brand-500/80 hover:text-black"
                }`}
              >
                Fresher
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setExperienceLevel("MID_LEVEL")}
                className={`relative z-10 flex-1 py-2 text-xs font-medium tracking-wide uppercase rounded-lg transition-colors duration-300 focus:outline-none ${
                  experienceLevel === "MID_LEVEL"
                    ? "text-black font-semibold"
                    : "text-brand-500/80 hover:text-black"
                }`}
              >
                Mid Level
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setExperienceLevel("EXPERIENCED")}
                className={`relative z-10 flex-1 py-2 text-xs font-medium tracking-wide uppercase rounded-lg transition-colors duration-300 focus:outline-none ${
                  experienceLevel === "EXPERIENCED"
                    ? "text-black font-semibold"
                    : "text-brand-500/80 hover:text-black"
                }`}
              >
                Experienced
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-4 bg-brand-500 text-white rounded-xl font-medium text-sm tracking-wide uppercase hover:bg-black transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-black/20 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                <span>Curating Workspace...</span>
              </>
            ) : (
              <span>Create Resume</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
