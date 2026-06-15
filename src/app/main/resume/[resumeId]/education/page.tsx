"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useWorkspace } from "../workspace-context";
import { IEducation } from "@/types/resume.types";
import SectionCard from "../components/SectionCard";
import PageNavigation from "../components/PageNavigation";
import EmptyStateCard from "../components/EmptyStateCard";
import EducationForm from "../components/EducationForm";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { Plus, Trash2, Edit3, GraduationCap } from "lucide-react";

export default function EducationPage() {
  const { resume, loading, saveResume } = useWorkspace();
  const router = useRouter();
  const params = useParams();
  const resumeId = params?.resumeId as string;

  const [educationList, setEducationList] = useState<IEducation[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (resume?.education) {
      setEducationList(resume.education);
    }
  }, [resume]);

  const handleAdd = (newEdu: IEducation) => {
    setEducationList([...educationList, newEdu]);
    setIsAdding(false);
    setError(null);
  };

  const handleUpdate = (updatedEdu: IEducation) => {
    if (editingIndex !== null) {
      const newList = [...educationList];
      newList[editingIndex] = updatedEdu;
      setEducationList(newList);
      setEditingIndex(null);
      setError(null);
    }
  };

  const handleDelete = (index: number) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  const handleSaveAndContinue = async () => {
    if (educationList.length === 0) {
      setError("Please add at least one education record before continuing.");
      return;
    }
    try {
      setSaving(true);
      await saveResume({ education: educationList });
      router.push(`/main/resume/${resumeId}/workExperience`);
    } catch (err: any) {
      setError(err.message || "Failed to save education details");
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
        title="Education Credentials"
        description="Detail your academic background, degrees, and relevant dates. A minimum of one record is required."
        actions={
          !isAdding &&
          editingIndex === null && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-dark text-text-primary rounded-xl text-xs uppercase tracking-wider font-bold shadow-xs transition-all duration-200 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Education</span>
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
          <EducationForm
            onSave={handleAdd}
            onCancel={() => setIsAdding(false)}
          />
        )}

        {/* Education List */}
        <div className="space-y-4">
          {educationList.map((edu, index) => {
            const isEditing = index === editingIndex;

            if (isEditing) {
              return (
                <EducationForm
                  key={index}
                  initialData={edu}
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
                    <GraduationCap className="w-5 h-5 text-text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-semibold text-text-primary">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-text-secondary font-medium">
                      {edu.institute}
                    </p>
                    <p className="text-xs text-text-muted font-mono mt-1">
                      {edu.startDate} — {edu.endDate}
                    </p>
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

          {educationList.length === 0 && !isAdding && (
            <EmptyStateCard
              title="No Academic History Added"
              description="Outline your university degrees, colleges, or diplomas to meet application requirements."
              onAdd={() => setIsAdding(true)}
              buttonLabel="Add Academic Credentials"
            />
          )}
        </div>

        <PageNavigation onSave={handleSaveAndContinue} isSubmitting={saving} />
      </SectionCard>
    </div>
  );
}
