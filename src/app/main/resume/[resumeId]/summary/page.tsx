"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useWorkspace } from "../workspace-context";
import SectionCard from "../components/SectionCard";
import PageNavigation from "../components/PageNavigation";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function SummaryPage() {
  const { resume, loading, saveResume } = useWorkspace();
  const router = useRouter();
  const params = useParams();
  const resumeId = params?.resumeId as string;

  const [summaryText, setSummaryText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (resume?.summary) {
      setSummaryText(resume.summary);
    }
  }, [resume]);

  const handleSaveAndContinue = async () => {
    try {
      setSaving(true);
      setError(null);
      await saveResume({ summary: summaryText });
      router.push(`/main/resume/${resumeId}/review`);
    } catch (err: any) {
      setError(err.message || "Failed to save summary");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton type="form" />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <SectionCard
        title="Professional Summary"
        description="Craft an executive summary to introduce yourself. Keep it brief, punchy, and rich in action verbs and impact metrics."
      >
        {error && (
          <div className="p-3.5 text-xs text-red-800 bg-red-100 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-2 relative">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="summary-textarea" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Professional Biography
            </label>
            <span className="text-xs text-text-muted font-mono">
              {summaryText.length} characters
            </span>
          </div>

          <textarea
            id="summary-textarea"
            rows={8}
            value={summaryText}
            onChange={(e) => setSummaryText(e.target.value)}
            placeholder="e.g. Results-driven Senior Software Engineer with 6+ years of experience leading engineering teams and building high-performance web applications. Expertise in React, Next.js, and Node.js. Proven track record of optimizing system architecture to improve scalability and load speeds..."
            className="w-full px-4 py-3.5 rounded-xl border border-brand-400/50 bg-white/70 text-text-primary placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200 text-sm resize-y leading-relaxed"
          />
        </div>

        <PageNavigation
          onSave={handleSaveAndContinue}
          isSubmitting={saving}
          canSkip={true}
        />
      </SectionCard>
    </div>
  );
}
