"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useWorkspace } from "../workspace-context";
import { IProjects } from "@/types/resume.types";
import SectionCard from "../components/SectionCard";
import PageNavigation from "../components/PageNavigation";
import EmptyStateCard from "../components/EmptyStateCard";
import ProjectForm from "../components/ProjectForm";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { Plus, Trash2, Edit3, Folder, ExternalLink, Star } from "lucide-react";
import { getSpecificResumeAPI } from "@/apis/resume";

export default function ProjectsPage() {
  const { resume, loading, saveResume } = useWorkspace();
  const router = useRouter();
  const params = useParams();
  const resumeId = params?.resumeId as string;

  const [projectsList, setProjectsList] = useState<IProjects[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [level, setLevel] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);

  useEffect(() => {
    if (resume?.projects) {
      setProjectsList(resume.projects);
    }
  }, [resume]);

  const handleAdd = (newProj: IProjects) => {
    setProjectsList([...projectsList, newProj]);
    setIsAdding(false);
  };

  const handleUpdate = (updatedProj: IProjects) => {
    if (editingIndex !== null) {
      const newList = [...projectsList];
      newList[editingIndex] = updatedProj;
      setProjectsList(newList);
      setEditingIndex(null);
    }
  };

  const handleDelete = (index: number) => {
    setProjectsList(projectsList.filter((_, i) => i !== index));
  };

  const handleSaveAndContinue = async () => {
    try {
      setSaving(true);
      await saveResume({ projects: projectsList });
      router.push(`/main/resume/${resumeId}/skills`);
    } catch (err: any) {
      setError(err.message || "Failed to save projects details");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await getSpecificResumeAPI(resumeId);
        const resumeData = response?.data || response;
        const { level, jobTitle, projects } = resumeData;
        
        setLevel(level || "");
        setJobTitle(jobTitle || "");
        
        if (projects && projects.length > 0) {
          setProjectTitle(projects[0].title || "");
          setTechStack(projects[0].techStack || []);
        }
      } catch (err) {
        console.error("Error fetching resume data", err);
      }
    };

    if (resumeId) {
      fetchResumeData();
    }
  }, [resumeId]);

  if (loading) {
    return <LoadingSkeleton type="form" />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <SectionCard
        title="Key Projects"
        description="Showcase your best engineering and development work, tech stack details, and online demo links."
        actions={
          !isAdding &&
          editingIndex === null && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-dark text-text-primary rounded-xl text-xs uppercase tracking-wider font-bold shadow-xs transition-all duration-205 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
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
          <ProjectForm onSave={handleAdd} onCancel={() => setIsAdding(false)} level={level} jobTitle={jobTitle} />
        )}

        {/* Projects List */}
        <div className="space-y-4">
          {projectsList.map((proj, index) => {
            const isEditing = index === editingIndex;

            if (isEditing) {
              return (
                <ProjectForm
                  key={index}
                  initialData={proj}
                  onSave={handleUpdate}
                  onCancel={() => setEditingIndex(null)}
                  level={level}
                  jobTitle={jobTitle}
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
                    <Folder className="w-5 h-5 text-text-secondary" />
                  </div>
                  <div className="space-y-2.5">
                    <div>
                      <h3 className="text-base font-serif font-semibold text-text-primary">
                        {proj.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 mt-1.5">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary"
                          >
                            <Star className="w-3.5 h-3.5" />
                            <span>Source Code</span>
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-text-secondary leading-relaxed font-sans max-w-xl">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-1 rounded bg-brand-300/30 border border-brand-400/20 text-[10px] font-semibold tracking-wide uppercase text-text-secondary font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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

          {projectsList.length === 0 && !isAdding && (
            <EmptyStateCard
              title="No Highlighted Projects"
              description="Add web applications, open-source utilities, or academic research projects that prove your tech capabilities."
              onAdd={() => setIsAdding(true)}
              buttonLabel="Add Custom Project"
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
