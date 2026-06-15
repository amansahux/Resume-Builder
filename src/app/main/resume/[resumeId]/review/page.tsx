"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useWorkspace } from "../workspace-context";
import PageNavigation from "../components/PageNavigation";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

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
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* ── TOOLBAR (unchanged) ── */}
      <div className="bg-white border border-brand-400/30 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-widest text-text-muted font-mono font-semibold">
            Final Review
          </p>
          <h2 className="text-lg font-serif text-text-primary font-bold leading-snug">
            {resume?.title || "Untitled Resume"}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center px-4 py-2 bg-brand-100 border border-brand-300/30 rounded-lg">
            <p className="text-[10px] uppercase tracking-wider text-text-muted">
              Completion
            </p>
            <p className="text-base font-bold font-mono text-text-primary">
              {completionPercentage}%
            </p>
          </div>
          <div className="text-center px-4 py-2 bg-brand-100 border border-brand-300/30 rounded-lg">
            <p className="text-[10px] uppercase tracking-wider text-text-muted">
              Status
            </p>
            <p className="text-xs font-bold uppercase tracking-wide text-brand-dark">
              {resume?.status || "DRAFT"}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 text-xs text-red-800 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      {/* ── ATS RESUME DOCUMENT ── */}
      <div
        id="resume-document"
        className="bg-white shadow-2xl border border-neutral-200 rounded-sm overflow-hidden"
        style={{ fontFamily: "'Arial', sans-serif" }}
      >
        <div className="px-12 py-10 space-y-0" style={{ minHeight: "1056px" }}>
          {/* ── HEADER ── */}
          <header className="pb-4 border-b-2 border-brand-400">
            <h1
              className="text-2xl font-bold tracking-tight text-neutral-900 uppercase"
              style={{ letterSpacing: "0.08em", fontFamily: "Georgia, serif" }}
            >
              {resume?.personalInfo?.fullname || "Your Full Name"}
            </h1>

            {resume?.jobTitle && (
              <p className="text-sm font-semibold text-brand-dark mt-0.5 uppercase tracking-widest">
                {resume.jobTitle}
              </p>
            )}

            {/* Contact Row */}
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2.5 text-xs text-neutral-600">
              {resume?.personalInfo?.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 shrink-0" />
                  {resume.personalInfo.email}
                </span>
              )}
              {resume?.personalInfo?.mobile && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 shrink-0" />
                  {resume.personalInfo.mobile}
                </span>
              )}
              {resume?.personalInfo?.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  {resume.personalInfo.location}
                </span>
              )}
              {resume?.personalInfo?.github && (
                <a
                  href={resume.personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:underline text-neutral-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="14"
                    height="14"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.082-.729.082-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.42-1.305.763-1.605-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.304-.536-1.527.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.8c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.649.243 2.872.119 3.176.77.84 1.234 1.911 1.234 3.221 0 4.61-2.806 5.624-5.479 5.921.431.372.815 1.102.815 2.222 0 1.606-.014 2.898-.014 3.293 0 .321.216.694.825.576C20.565 21.796 24 17.297 24 12 24 5.37 18.627 0 12 0z" />
                  </svg>
                  {resume.personalInfo.github.replace(
                    /^https?:\/\/(www\.)?/,
                    "",
                  )}
                </a>
              )}
              {resume?.personalInfo?.linkedIn && (
                <a
                  href={resume.personalInfo.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:underline text-neutral-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="14"
                    height="14"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  {resume.personalInfo.linkedIn.replace(
                    /^https?:\/\/(www\.)?(in\.)?/,
                    "",
                  )}
                </a>
              )}
              {resume?.personalInfo?.portfolio && (
                <a
                  href={resume.personalInfo.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:underline text-neutral-700"
                >
                  <Globe className="w-3 h-3 shrink-0" />
                  {resume.personalInfo.portfolio.replace(
                    /^https?:\/\/(www\.)?/,
                    "",
                  )}
                </a>
              )}
            </div>
          </header>

          {/* ── PROFESSIONAL SUMMARY ── */}
          {resume?.summary && (
            <section className="pt-5 pb-4 border-b border-brand-400/30">
              <SectionHeading>Professional Summary</SectionHeading>
              <p className="text-xs text-neutral-700 leading-relaxed mt-1.5">
                {resume.summary}
              </p>
            </section>
          )}

          {/* ── WORK EXPERIENCE ── */}
          {resume?.workExperience && resume.workExperience.length > 0 && (
            <section className="pt-5 pb-4 border-b border-brand-400/30">
              <SectionHeading>Professional Experience</SectionHeading>
              <div className="mt-2 space-y-4">
                {resume.workExperience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline gap-2">
                      <div>
                        <h3
                          className="text-sm font-bold text-neutral-900 uppercase"
                          style={{ letterSpacing: "0.02em" }}
                        >
                          {exp.position}
                        </h3>
                        <p
                          className="text-xs font-semibold text-neutral-600 italic"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-[10px] text-neutral-500 shrink-0 font-mono whitespace-nowrap">
                        {exp.startDate} – {exp.endDate || "Present"}
                      </span>
                    </div>
                    {exp.description && (
                      <ul className="mt-1.5 space-y-0.5 text-xs text-neutral-700 leading-relaxed list-disc list-outside ml-4">
                        {exp.description
                          .split("\n")
                          .map((line: string) => line.trim())
                          .filter(Boolean)
                          .map((line: string, i: number) => (
                            <li key={i}>{line.replace(/^[-•]\s*/, "")}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── PROJECTS ── */}
          {resume?.projects && resume.projects.length > 0 && (
            <section className="pt-5 pb-4 border-b border-brand-400/30">
              <SectionHeading>Projects</SectionHeading>
              <div className="mt-2 space-y-3.5">
                {resume.projects.map((proj, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline gap-2">
                      <h3
                        className="text-xs font-bold text-neutral-900 uppercase"
                        style={{ letterSpacing: "0.02em" }}
                      >
                        {proj.title}
                      </h3>
                      {proj.techStack?.length > 0 && (
                        <span className="text-[10px] text-neutral-500 font-mono shrink-0">
                          {proj.techStack.join(" · ")}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-700 leading-relaxed mt-0.5">
                      {proj.description}
                    </p>
                    {(proj.githubUrl || proj.liveUrl) && (
                      <div className="flex gap-4 mt-0.5">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-brand-dark hover:underline font-mono"
                          >
                            GitHub ↗
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-brand-dark hover:underline font-mono"
                          >
                            Live Demo ↗
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── EDUCATION ── */}
          {resume?.education && resume.education.length > 0 && (
            <section className="pt-5 pb-4 border-b border-brand-400/30">
              <SectionHeading>Education</SectionHeading>
              <div className="mt-2 space-y-2.5">
                {resume.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-baseline gap-2"
                  >
                    <div>
                      <h3
                        className="text-xs font-bold text-neutral-900 uppercase"
                        style={{ letterSpacing: "0.02em" }}
                      >
                        {edu.degree}
                      </h3>
                      <p
                        className="text-xs text-neutral-600"

                      >
                        {edu.institute}
                      </p>
                    </div>
                    <span className="text-[10px] text-neutral-500 font-mono shrink-0 whitespace-nowrap">
                      {edu.startDate} – {edu.endDate || "Present"}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── SKILLS ── */}
          {resume?.skills && resume.skills.length > 0 && (
            <section className="pt-5 pb-4 border-b border-brand-400/30">
              <SectionHeading>Technical Skills</SectionHeading>
              <p className="text-xs text-neutral-700 mt-1.5  leading-relaxed">
                {resume.skills.join("   •   ")}
              </p>
            </section>
          )}

          {/* ── CERTIFICATIONS ── */}
          {resume?.certifications && resume.certifications.length > 0 && (
            <section className="pt-5">
              <SectionHeading>Certifications</SectionHeading>
              <ul className="mt-1.5 space-y-1 text-xs text-neutral-700 list-disc list-outside ml-4">
                {resume.certifications.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <PageNavigation onSave={handleFinish} isSubmitting={saving} />
    </div>
  );
}

// ── Reusable section heading — brand color + brand border ────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[11px] font-bold uppercase tracking-widest text-brand-dark border-b border-brand-400/40 pb-1 mb-0"
      style={{ letterSpacing: "0.12em", fontFamily: "'Arial', sans-serif" }}
    >
      {children}
    </h2>
  );
}
