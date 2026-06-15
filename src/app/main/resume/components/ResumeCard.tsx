import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IResume } from "@/types/resume.types";
import { getResumeAPI } from "@/apis/resume";
import ResumeStatusBadge from "./ResumeStatusBadge";
import ResumeProgressBar from "./ResumeProgressBar";
import ResumeActions from "./ResumeActions";
import { Calendar, Briefcase, Award } from "lucide-react";

interface ResumeCardProps {
  resume: IResume;
}

export default function ResumeCard({ resume }: ResumeCardProps) {
  const router = useRouter();
  const [exportState, setExportState] = useState<"idle" | "loading" | "success">("idle");

  const formattedCreatedAt = resume.createdAt
    ? new Date(resume.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  const formattedUpdatedAt = resume.updatedAt
    ? new Date(resume.updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  const handleEdit = () => {
    if (resume._id) {
      router.push(`/main/resume/${resume._id}/personalInfo`);
    }
  };

  const handleExport = async () => {
    if (!resume._id) return;

    try {
      setExportState("loading");

      // Fetch latest full resume details
      const response = await getResumeAPI(resume._id);
      const fullResume = response.data;

      // Construct print-optimized HTML string
      const printHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${fullResume.title || "Resume"}</title>
            <style>
              @page {
                size: A4;
                margin: 0mm !important;
              }
              body {
                font-family: 'Arial', sans-serif;
                color: #2D2D2D;
                background-color: #ffffff;
                line-height: 1.4;
                font-size: 12px;
                margin: 0;
                padding: 20mm 15mm;
              }
              header {
                border-bottom: 2px solid #D6CCC2;
                padding-bottom: 12px;
                margin-bottom: 16px;
              }
              h1 {
                font-family: 'Georgia', serif;
                font-size: 24px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                margin: 0 0 4px 0;
                color: #1A1A1A;
              }
              .job-title {
                font-size: 13px;
                font-weight: 600;
                color: #6A5D54;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                margin: 0 0 8px 0;
              }
              .contact-info {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
                font-size: 11px;
                color: #555555;
              }
              .contact-item {
                display: inline-flex;
                align-items: center;
              }
              section {
                margin-bottom: 16px;
              }
              .section-heading {
                font-family: 'Arial', sans-serif;
                font-size: 11px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 0.12em;
                color: #8A7D74;
                border-bottom: 1px solid rgba(214, 204, 194, 0.5);
                padding-bottom: 3px;
                margin: 0 0 8px 0;
              }
              .summary-text {
                font-size: 11.5px;
                color: #3A322D;
                text-align: justify;
              }
              .item-header {
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                margin-bottom: 3px;
              }
              .item-title {
                font-size: 12px;
                font-weight: bold;
                text-transform: uppercase;
                color: #1A1A1A;
              }
              .item-subtitle {
                font-family: 'Georgia', serif;
                font-size: 11.5px;
                font-style: italic;
                color: #4A4A4A;
              }
              .item-date {
                font-family: monospace;
                font-size: 10px;
                color: #666666;
                white-space: nowrap;
              }
              ul {
                margin: 4px 0 0 0;
                padding-left: 16px;
              }
              li {
                font-size: 11px;
                color: #333333;
                margin-bottom: 3px;
              }
              .skills-list {
                font-size: 11px;
                color: #333333;
                line-height: 1.6;
              }
              .project-tech {
                font-family: monospace;
                font-size: 9.5px;
                color: #666666;
              }
            </style>
          </head>
          <body>
            <header>
              <h1>${fullResume.personalInfo?.fullname || "Your Full Name"}</h1>
              ${fullResume.jobTitle ? `<div class="job-title">${fullResume.jobTitle}</div>` : ""}
              <div class="contact-info">
                ${fullResume.personalInfo?.email ? `<span class="contact-item">✉ ${fullResume.personalInfo.email}</span>` : ""}
                ${fullResume.personalInfo?.mobile ? `<span class="contact-item">☎ ${fullResume.personalInfo.mobile}</span>` : ""}
                ${fullResume.personalInfo?.location ? `<span class="contact-item">📍 ${fullResume.personalInfo.location}</span>` : ""}
                ${fullResume.personalInfo?.github ? `<span class="contact-item">❖ ${fullResume.personalInfo.github.replace(/^https?:\/\/(www\.)?/, "")}</span>` : ""}
                ${fullResume.personalInfo?.linkedIn ? `<span class="contact-item">🔗 ${fullResume.personalInfo.linkedIn.replace(/^https?:\/\/(www\.)?(in\.)?/, "")}</span>` : ""}
                ${fullResume.personalInfo?.portfolio ? `<span class="contact-item">🌐 ${fullResume.personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/, "")}</span>` : ""}
              </div>
            </header>

            ${fullResume.summary ? `
              <section>
                <div class="section-heading">Professional Summary</div>
                <div class="summary-text">${fullResume.summary}</div>
              </section>
            ` : ""}

            ${fullResume.workExperience && fullResume.workExperience.length > 0 ? `
              <section>
                <div class="section-heading">Professional Experience</div>
                ${fullResume.workExperience.map((exp: any) => `
                  <div style="margin-bottom: 10px;">
                    <div class="item-header">
                      <div>
                        <span class="item-title">${exp.position}</span>
                        <div class="item-subtitle">${exp.company}</div>
                      </div>
                      <span class="item-date">${exp.startDate} – ${exp.endDate || "Present"}</span>
                    </div>
                    ${exp.description ? `
                      <ul>
                        ${exp.description.split("\n").map((line: string) => line.trim()).filter(Boolean).map((line: string) => `
                          <li>${line.replace(/^[-•]\s*/, "")}</li>
                        `).join("")}
                      </ul>
                    ` : ""}
                  </div>
                `).join("")}
              </section>
            ` : ""}

            ${fullResume.projects && fullResume.projects.length > 0 ? `
              <section>
                <div class="section-heading">Projects</div>
                ${fullResume.projects.map((proj: any) => `
                  <div style="margin-bottom: 8px;">
                    <div class="item-header">
                      <span class="item-title">${proj.title}</span>
                      ${proj.techStack?.length > 0 ? `<span class="project-tech">${proj.techStack.join(" · ")}</span>` : ""}
                    </div>
                    <div style="font-size: 11px; color: #333333; margin-top: 2px;">${proj.description}</div>
                    ${proj.githubUrl || proj.liveUrl ? `
                      <div style="font-size: 9px; margin-top: 2px; color: #6A5D54;">
                        ${proj.githubUrl ? `GitHub: ${proj.githubUrl.replace(/^https?:\/\/(www\.)?/, "")} ` : ""}
                        ${proj.liveUrl ? `Live: ${proj.liveUrl.replace(/^https?:\/\/(www\.)?/, "")}` : ""}
                      </div>
                    ` : ""}
                  </div>
                `).join("")}
              </section>
            ` : ""}

            ${fullResume.education && fullResume.education.length > 0 ? `
              <section>
                <div class="section-heading">Education</div>
                ${fullResume.education.map((edu: any) => `
                  <div style="margin-bottom: 8px;">
                    <div class="item-header">
                      <div>
                        <span class="item-title">${edu.degree}</span>
                        <div style="font-size: 11px; color: #555555;">${edu.institute}</div>
                      </div>
                      <span class="item-date">${edu.startDate} – ${edu.endDate || "Present"}</span>
                    </div>
                  </div>
                `).join("")}
              </section>
            ` : ""}

            ${fullResume.skills && fullResume.skills.length > 0 ? `
              <section>
                <div class="section-heading">Technical Skills</div>
                <div class="skills-list">${fullResume.skills.join("   •   ")}</div>
              </section>
            ` : ""}

            ${fullResume.certifications && fullResume.certifications.length > 0 ? `
              <section>
                <div class="section-heading">Certifications</div>
                <ul>
                  ${fullResume.certifications.map((cert: string) => `<li>${cert}</li>`).join("")}
                </ul>
              </section>
            ` : ""}
          </body>
        </html>
      `;

      // Create iframe printing container
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";
      document.body.appendChild(iframe);

      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(printHTML);
        doc.close();
      }

      // Allow rendering time, trigger print dialog
      setTimeout(() => {
        if (iframe.contentWindow) {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
          document.body.removeChild(iframe);
          setExportState("success");
          setTimeout(() => setExportState("idle"), 3000);
        }
      }, 600);

    } catch (err) {
      console.error("PDF generation failed:", err);
      setExportState("idle");
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-brand-400/40 bg-brand-200/30 p-6 md:p-8 hover:bg-brand-100 hover:border-brand-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-5">
        {/* Title and Badge */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1 min-w-0">
            <h3 className="text-lg font-serif font-bold text-text-primary truncate">
              {resume.title || "Untitled Resume"}
            </h3>
            <p className="text-xs font-medium text-text-secondary truncate flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 shrink-0" />
              {resume.jobTitle || "No title specified"}
            </p>
          </div>
          <div className="shrink-0">
            <ResumeStatusBadge status={resume.status || "DRAFT"} />
          </div>
        </div>

        {/* Experience Level Badge */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-text-secondary bg-brand-400/20 px-2.5 py-1 rounded-md border border-brand-400/30">
            <Award className="w-3 h-3 text-brand-dark" />
            {resume.level}
          </span>
        </div>

        {/* Progress Fill */}
        <ResumeProgressBar percentage={resume.completionPercentage || 0} />
      </div>

      <div className="space-y-4 mt-6">
        {/* Timestamps */}
        <div className="pt-3 border-t border-brand-400/20 grid grid-cols-2 gap-2 text-[10px] text-text-secondary/70 font-mono">
          <div className="space-y-0.5">
            <span className="block uppercase tracking-wider text-[8px] text-text-muted">Created</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 shrink-0 text-brand-dark" />
              {formattedCreatedAt}
            </span>
          </div>
          <div className="space-y-0.5">
            <span className="block uppercase tracking-wider text-[8px] text-text-muted">Updated</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 shrink-0 text-brand-dark" />
              {formattedUpdatedAt}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <ResumeActions onEdit={handleEdit} onExport={handleExport} exportState={exportState} />
      </div>
    </div>
  );
}
