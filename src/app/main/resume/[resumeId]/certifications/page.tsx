"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useWorkspace } from "../workspace-context";
import SectionCard from "../components/SectionCard";
import PageNavigation from "../components/PageNavigation";
import CertificationForm from "../components/CertificationForm";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function CertificationsPage() {
  const { resume, loading, saveResume } = useWorkspace();
  const router = useRouter();
  const params = useParams();
  const resumeId = params?.resumeId as string;

  const [certs, setCerts] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (resume?.certifications) {
      setCerts(resume.certifications);
    }
  }, [resume]);

  const handleSaveAndContinue = async () => {
    try {
      setSaving(true);
      setError(null);
      await saveResume({ certifications: certs });
      router.push(`/main/resume/${resumeId}/summary`);
    } catch (err: any) {
      setError(err.message || "Failed to save certifications");
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
        title="Certifications & Licensing"
        description="Verify your expertise with accredited certifications, professional coursework, or corporate trainings."
      >
        {error && (
          <div className="p-3.5 text-xs text-red-800 bg-red-100 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Credential Inventory
          </label>
          <CertificationForm value={certs} onChange={setCerts} />
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
