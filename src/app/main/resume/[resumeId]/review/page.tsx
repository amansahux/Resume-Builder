"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useWorkspace } from "../workspace-context";
import SectionCard from "../components/SectionCard";
import PageNavigation from "../components/PageNavigation";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { Award, Briefcase, Calendar, Folder, GraduationCap, Mail, MapPin, Phone, Globe, Star } from "lucide-react";

export default function ReviewPage() {
  const { resume, loading, saveResume, completionPercentage } = useWorkspace();
  const router = useRouter();
  const params = useParams();
  const resumeId = params?.resumeId as string;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFinish = async () => {
    try {
      setSaving(true);
      setError(null);
      await saveResume({ status: "COMPLETED" });
      router.push("/main/resume");
    } catch (err: any) {
      setError(err.message || "Failed to complete resume");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton type="review" />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Overview Metadata Card */}
      <div className="bg-brand-200 border border-brand-400/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest text-text-muted font-mono font-bold">
            Document Overview
          </span>
          <h2 className="text-2xl font-serif text-text-primary">
            Review Your Masterpiece
          </h2>
          <p className="text-sm text-text-secondary">
            Take a moment to inspect your career document before completion.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 shrink-0">
          <div className="bg-white border border-brand-400/20 px-4 py-3.5 rounded-xl">
            <span className="block text-[10px] uppercase tracking-wider text-text-muted">
              Completion
            </span>
            <span className="text-lg font-serif font-bold text-text-primary">
              {completionPercentage}%
            </span>
          </div>

          <div className="bg-white border border-brand-400/20 px-4 py-3.5 rounded-xl">
            <span className="block text-[10px] uppercase tracking-wider text-text-muted">
              Status
            </span>
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-wide text-brand-dark">
              {resume?.status || "DRAFT"}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3.5 text-xs text-red-800 bg-red-100 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      {/* Luxury Resume Preview Panel */}
      <div className="bg-white border border-brand-400 rounded-2xl shadow-xl overflow-hidden p-8 md:p-12 space-y-8 min-h-[842px] text-text-primary select-none hover:shadow-2xl transition-all duration-300">
        
        {/* Editorial Heading */}
        <div className="border-b-2 border-brand-500/30 pb-6 text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary font-bold">
            {resume?.personalInfo?.fullname || "Alexander Mercer"}
          </h1>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-dark">
            {resume?.jobTitle || "Frontend Architect"}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-secondary pt-2">
            {resume?.personalInfo?.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-text-muted" />
                <span>{resume.personalInfo.email}</span>
              </span>
            )}
            {resume?.personalInfo?.mobile && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-text-muted" />
                <span>{resume.personalInfo.mobile}</span>
              </span>
            )}
            {resume?.personalInfo?.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-text-muted" />
                <span>{resume.personalInfo.location}</span>
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-brand-dark pt-1">
            {resume?.personalInfo?.github && (
              <a href={resume.personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-text-primary transition-colors">
                <Star className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {resume?.personalInfo?.portfolio && (
              <a href={resume.personalInfo.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-text-primary transition-colors">
                <Globe className="w-3.5 h-3.5" />
                <span>Portfolio</span>
              </a>
            )}
          </div>
        </div>

        {/* Executive Summary */}
        {resume?.summary && (
          <div className="space-y-2.5">
            <h2 className="text-xs uppercase tracking-widest font-bold text-brand-dark border-b border-brand-400/20 pb-1.5">
              Executive Profile
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line font-sans">
              {resume.summary}
            </p>
          </div>
        )}

        {/* Experience List */}
        {resume?.workExperience && resume.workExperience.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest font-bold text-brand-dark border-b border-brand-400/20 pb-1.5">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {resume.workExperience.map((exp, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-text-primary font-serif">
                        {exp.position}
                      </h3>
                      <p className="text-xs text-text-secondary font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs text-text-muted font-mono shrink-0">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-text-secondary whitespace-pre-line font-sans pt-1 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects List */}
        {resume?.projects && resume.projects.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest font-bold text-brand-dark border-b border-brand-400/20 pb-1.5">
              Key Projects
            </h2>
            <div className="space-y-4">
              {resume.projects.map((proj, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-text-primary font-serif">
                      {proj.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] text-text-muted font-mono">
                      {proj.techStack.join(" • ")}
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education List */}
          {resume?.education && resume.education.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest font-bold text-brand-dark border-b border-brand-400/20 pb-1.5">
                Education
              </h2>
              <div className="space-y-3">
                {resume.education.map((edu, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <h3 className="text-xs font-bold text-text-primary">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {edu.institute}
                    </p>
                    <p className="text-[10px] text-text-muted font-mono">
                      {edu.startDate} — {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right column of review layout - Skills and Certifications */}
          <div className="space-y-6">
            {/* Skills */}
            {resume?.skills && resume.skills.length > 0 && (
              <div className="space-y-2.5">
                <h2 className="text-xs uppercase tracking-widest font-bold text-brand-dark border-b border-brand-400/20 pb-1.5">
                  Expertise
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {resume.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-brand-200/50 border border-brand-400/25 rounded text-[10px] text-text-secondary font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {resume?.certifications && resume.certifications.length > 0 && (
              <div className="space-y-2.5">
                <h2 className="text-xs uppercase tracking-widest font-bold text-brand-dark border-b border-brand-400/20 pb-1.5">
                  Certifications
                </h2>
                <ul className="space-y-1.5">
                  {resume.certifications.map((cert, idx) => (
                    <li key={idx} className="text-xs text-text-secondary list-disc list-inside">
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <PageNavigation onSave={handleFinish} isSubmitting={saving} />
    </div>
  );
}
