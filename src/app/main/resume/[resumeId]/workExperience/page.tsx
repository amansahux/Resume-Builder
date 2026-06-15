"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useWorkspace } from "../workspace-context";
import { IWorkExperience } from "@/types/resume.types";
import SectionCard from "../components/SectionCard";
import PageNavigation from "../components/PageNavigation";
import EmptyStateCard from "../components/EmptyStateCard";
import ExperienceForm from "../components/ExperienceForm";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { Plus, Trash2, Edit3, Briefcase } from "lucide-react";

export default function WorkExperiencePage() {
  const { resume, loading, saveResume } = useWorkspace();
  const router = useRouter();
  const params = useParams();
  const resumeId = params?.resumeId as string;

  const [experienceList, setExperienceList] = useState<IWorkExperience[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (resume?.workExperience) {
      setExperienceList(resume.workExperience);
    }
  }, [resume]);

  const handleAdd = (newExp: IWorkExperience) => {
    setExperienceList([...experienceList, newExp]);
    setIsAdding(false);
  };

  const handleUpdate = (updatedExp: IWorkExperience) => {
    if (editingIndex !== null) {
      const newList = [...experienceList];
      newList[editingIndex] = updatedExp;
      setExperienceList(newList);
      setEditingIndex(null);
    }
  };

  const handleDelete = (index: number) => {
    setExperienceList(experienceList.filter((_, i) => i !== index));
  };

  const handleSaveAndContinue = async () => {
    try {
      setSaving(true);
      await saveResume({ workExperience: experienceList });
      router.push(`/main/resume/${resumeId}/projects`);
    } catch (err: any) {
      setError(err.message || "Failed to save work experience details");
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
        title="Work Experience"
        description="Detail your professional roles, milestones, and achievements. You may skip this section if you are a fresher."
        actions={
          !isAdding &&
          editingIndex === null && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-dark text-text-primary rounded-xl text-xs uppercase tracking-wider font-bold shadow-xs transition-all duration-205 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Experience</span>
            </button>
          )
        }
      >
        {error && (
          <div className="p-3.5 text-xs text-red-800 bg-red-100 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        {/* Form to Add New */}
        {isAdding && (
          <ExperienceForm
            onSave={handleAdd}
            onCancel={() => setIsAdding(false)}
          />
        )}

        {/* Experience List */}
        <div className="space-y-4">
          {experienceList.map((exp, index) => {
            const isEditing = index === editingIndex;

            if (isEditing) {
              return (
                <ExperienceForm
                  key={index}
                  initialData={exp}
                  onSave={handleUpdate}
                  onCancel={() => setEditingIndex(null)}
                />
              );
            }

            return (
              <div
                key={index}
                className="flex items-start justify-between p-5 border border-brand-400/30 bg-white/50 hover:bg-white/80 rounded-2xl shadow-xs transition-all duration-250 animate-fade-in"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-300/30 text-brand-500 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-semibold text-text-primary">
                      {exp.position}
                    </h3>
                    <p className="text-sm text-text-secondary font-medium">
                      {exp.company}
                    </p>
                    <p className="text-xs text-text-muted font-mono mt-1">
                      {exp.startDate} — {exp.endDate}
                    </p>
                    {exp.description && (
                      <p className="text-sm text-text-secondary mt-3 whitespace-pre-line leading-relaxed font-sans">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingIndex(index)}
                    className="p-2 text-text-muted hover:text-text-primary transition-colors hover:bg-brand-300/20 rounded-lg cursor-pointer"
                    title="Edit Record"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 text-text-muted hover:text-red-600 transition-colors hover:bg-red-50 rounded-lg cursor-pointer"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {experienceList.length === 0 && !isAdding && (
            <EmptyStateCard
              title="No Professional Experience"
              description="Showcase your career highlights, internships, contract roles, or freelance work."
              onAdd={() => setIsAdding(true)}
              buttonLabel="Add Career Milestone"
            />
          )}
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
