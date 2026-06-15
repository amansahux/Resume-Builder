"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useWorkspace } from "../workspace-context";
import SectionCard from "../components/SectionCard";
import PageNavigation from "../components/PageNavigation";
import SkillInput from "../components/SkillInput";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { getSpecificResumeAPI } from "@/apis/resume";

export default function SkillsPage() {
  const { resume, loading, saveResume } = useWorkspace();
  const router = useRouter();
  const params = useParams();
  const resumeId = params?.resumeId as string;

  const [skills, setSkills] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [level, setLevel] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    if (resume?.skills) {
      setSkills(resume.skills);
    }
  }, [resume]);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await getSpecificResumeAPI(resumeId);
        const resumeData = response?.data || response;
        setLevel(resumeData.level || "");
        setJobTitle(resumeData.jobTitle || "");
      } catch (err) {
        console.error("Error fetching resume data", err);
      }
    };
    if (resumeId) {
      fetchResumeData();
    }
  }, [resumeId]);

  const handleSaveAndContinue = async () => {
    if (skills.length === 0) {
      setError("Please add at least one core skill before continuing.");
      return;
    }
    try {
      setSaving(true);
      setError(null);
      await saveResume({ skills });
      router.push(`/main/resume/${resumeId}/certifications`);
    } catch (err: any) {
      setError(err.message || "Failed to save skills");
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
        title="Professional Skills"
        description="Detail your technological competencies, tools, programming languages, and soft skills."
      >
        {error && (
          <div className="p-3.5 text-xs text-red-800 bg-red-100 border border-red-200 rounded-lg animate-fade-in">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <SkillInput 
            value={skills} 
            onChange={(newSkills) => { setSkills(newSkills); setError(null); }} 
            level={level}
            jobTitle={jobTitle}
          />
        </div>

        <PageNavigation onSave={handleSaveAndContinue} isSubmitting={saving} />
      </SectionCard>
    </div>
  );
}
