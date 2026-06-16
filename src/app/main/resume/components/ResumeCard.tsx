"use client";

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
  onDelete: () => void;
}

// ── Inline SVG icons for the printed HTML (lucide can't be used there) ────────
const ICON = {
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:3px;position:relative;top:-1px"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:3px;position:relative;top:-1px"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.54 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  pin: `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:3px;position:relative;top:-1px"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block;vertical-align:middle;margin-right:3px;position:relative;top:-1px"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block;vertical-align:middle;margin-right:3px;position:relative;top:-1px"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
  globe: `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:3px;position:relative;top:-1px"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
};

export default function ResumeCard({ resume, onDelete }: ResumeCardProps) {
  const router = useRouter();
  const [exportState, setExportState] = useState<"idle" | "loading" | "success">("idle");

  const formattedCreatedAt = resume.createdAt
    ? new Date(resume.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "N/A";

  const formattedUpdatedAt = resume.updatedAt
    ? new Date(resume.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "N/A";

  const handleEdit = () => {
    if (resume._id) router.push(`/main/resume/${resume._id}/personalInfo`);
  };

  const handleExport = async () => {
    if (!resume._id) return;
    try {
      setExportState("loading");
      const response = await getResumeAPI(resume._id);
      const r = response.data; // shorthand

const printHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${r.title || "Resume"}</title>

  <script src="https://cdn.tailwindcss.com"></script>

  <style>
    @page {
      size: A4;
      margin: 0;
    }

    body {
      margin: 0;
      background: white;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 40px 48px;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
      color: #262626;
    }

    .section-heading {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: .15em;
      color: #7A6E67;
    }

    .brand-border {
      border-color: rgba(197,187,180,.45);
    }

    .brand-text {
      color: #6A5D54;
    }
  </style>
</head>

<body>
<div class="page">

  <!-- HEADER -->
  <header class="pb-4 border-b-2 border-[#C5BBB4]">

    <h1
      class="text-3xl font-bold uppercase text-neutral-900"
      style="letter-spacing:.08em;font-family:Georgia,serif;"
    >
      ${r.personalInfo?.fullname || "Your Full Name"}
    </h1>

    ${
      r.jobTitle
        ? `
      <p class="text-sm font-semibold uppercase tracking-[0.18em] mt-1 brand-text">
        ${r.jobTitle}
      </p>
    `
        : ""
    }

    <div class="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-neutral-600">

      ${
        r.personalInfo?.email
          ? `
        <span class="flex items-center gap-1">
          ${ICON.mail}
          ${r.personalInfo.email}
        </span>
      `
          : ""
      }

      ${
        r.personalInfo?.mobile
          ? `
        <span class="flex items-center gap-1">
          ${ICON.phone}
          ${r.personalInfo.mobile}
        </span>
      `
          : ""
      }

      ${
        r.personalInfo?.location
          ? `
        <span class="flex items-center gap-1">
          ${ICON.pin}
          ${r.personalInfo.location}
        </span>
      `
          : ""
      }

      ${
        r.personalInfo?.github
          ? `
        <span class="flex items-center gap-1">
          ${ICON.github}
          ${r.personalInfo?.github?.replace(/^https?:\/\/(www\.)?/, "")}
        </span>
      `
          : ""
      }

      ${
        r.personalInfo?.linkedIn
          ? `
        <span class="flex items-center gap-1">
          ${ICON.linkedin}
          ${r.personalInfo?.linkedIn?.replace(
            /^https?:\/\/(www\.)?(in\.)?/,
            ""
          )}
        </span>
      `
          : ""
      }

      ${
        r.personalInfo?.portfolio
          ? `
        <span class="flex items-center gap-1">
          ${ICON.globe}
          ${r.personalInfo?.portfolio?.replace(
            /^https?:\/\/(www\.)?/,
            ""
          )}
        </span>
      `
          : ""
      }

    </div>
  </header>

  ${
    r.summary
      ? `
    <section class="pt-5 pb-4 border-b brand-border">
      <div class="section-heading">Professional Summary</div>

      <p class="text-xs text-neutral-700 leading-relaxed mt-2">
        ${r.summary}
      </p>
    </section>
  `
      : ""
  }

  ${
    r.workExperience?.length
      ? `
    <section class="pt-5 pb-4 border-b brand-border">

      <div class="section-heading">
        Professional Experience
      </div>

      <div class="mt-2 space-y-4">

      ${r.workExperience
        .map(
          (exp: any) => `
        <div>

          <div class="flex justify-between items-baseline gap-2">

            <div>
              <h3
                class="text-sm font-bold uppercase text-neutral-900"
                style="letter-spacing:.02em;"
              >
                ${exp.position}
              </h3>

              <p
                class="text-xs italic font-semibold text-neutral-600"
                style="font-family:Georgia,serif;"
              >
                ${exp.company}
              </p>
            </div>

            <span class="text-[10px] text-neutral-500 font-mono whitespace-nowrap">
              ${exp.startDate} – ${exp.endDate || "Present"}
            </span>

          </div>

          ${
            exp.description
              ? `
            <ul class="mt-2 ml-4 list-disc text-xs text-neutral-700 leading-relaxed">
              ${exp.description
                .split("\n")
                .map((line: string) => line.trim())
                .filter(Boolean)
                .map(
                  (line: string) =>
                    `<li>${line.replace(/^[-•]\\s*/, "")}</li>`
                )
                .join("")}
            </ul>
          `
              : ""
          }

        </div>
      `
        )
        .join("")}

      </div>

    </section>
  `
      : ""
  }

  ${
    r.projects?.length
      ? `
    <section class="pt-5 pb-4 border-b brand-border">

      <div class="section-heading">Projects</div>

      <div class="mt-2 space-y-4">

        ${r.projects
          .map(
            (proj: any) => `
          <div>

            <div class="flex justify-between items-baseline gap-2">

              <h3
                class="text-xs font-bold uppercase text-neutral-900"
                style="letter-spacing:.02em;"
              >
                ${proj.title}
              </h3>

              ${
                proj.techStack?.length
                  ? `
                <span class="text-[10px] text-neutral-500 font-mono">
                  ${proj.techStack.join(" · ")}
                </span>
              `
                  : ""
              }

            </div>

            <p class="text-xs text-neutral-700 leading-relaxed mt-1">
              ${proj.description}
            </p>

            ${
              proj.githubUrl || proj.liveUrl
                ? `
              <div class="flex gap-4 mt-1 text-[10px] font-mono brand-text">

                ${
                  proj.githubUrl
                    ? `<span>GitHub ↗</span>`
                    : ""
                }

                ${
                  proj.liveUrl
                    ? `<span>Live Demo ↗</span>`
                    : ""
                }

              </div>
            `
                : ""
            }

          </div>
        `
          )
          .join("")}

      </div>

    </section>
  `
      : ""
  }

  ${
    r.education?.length
      ? `
    <section class="pt-5 pb-4 border-b brand-border">

      <div class="section-heading">
        Education
      </div>

      <div class="mt-2 space-y-3">

      ${r.education
        .map(
          (edu: any) => `
        <div class="flex justify-between items-baseline gap-2">

          <div>

            <h3
              class="text-xs font-bold uppercase text-neutral-900"
              style="letter-spacing:.02em;"
            >
              ${edu.degree}
            </h3>

            <p class="text-xs text-neutral-600">
              ${edu.institute}
            </p>

          </div>

          <span class="text-[10px] text-neutral-500 font-mono whitespace-nowrap">
            ${edu.startDate} – ${edu.endDate || "Present"}
          </span>

        </div>
      `
        )
        .join("")}

      </div>

    </section>
  `
      : ""
  }

  ${
    r.skills?.length
      ? `
    <section class="pt-5 pb-4 border-b brand-border">

      <div class="section-heading">
        Technical Skills
      </div>

      <p class="text-xs text-neutral-700 mt-2 leading-relaxed">
        ${r.skills.join("   •   ")}
      </p>

    </section>
  `
      : ""
  }

  ${
    r.certifications?.length
      ? `
    <section class="pt-5">

      <div class="section-heading">
        Certifications
      </div>

      <ul class="mt-2 ml-4 list-disc text-xs text-neutral-700">

        ${r.certifications
          .map((cert: string) => `<li>${cert}</li>`)
          .join("")}

      </ul>

    </section>
  `
      : ""
  }

</div>
</body>
</html>
`;

      // ── Print via hidden iframe ──
      const iframe = document.createElement("iframe");
      iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:none;visibility:hidden;";
      document.body.appendChild(iframe);

      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) { doc.open(); doc.write(printHTML); doc.close(); }

      setTimeout(() => {
        if (iframe.contentWindow) {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
          document.body.removeChild(iframe);
          setExportState("success");
          setTimeout(() => setExportState("idle"), 3000);
        }
      }, 700);

    } catch (err) {
      console.error("PDF export failed:", err);
      setExportState("idle");
    }
  };

  // ── Card UI (unchanged) ────────────────────────────────────────────────────
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-brand-400/40 bg-brand-200/30 p-6 md:p-8 hover:bg-brand-100 hover:border-brand-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-5">
        {/* Title + Badge */}
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

        {/* Level Badge */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-text-secondary bg-brand-400/20 px-2.5 py-1 rounded-md border border-brand-400/30">
            <Award className="w-3 h-3 text-brand-dark" />
            {resume.level}
          </span>
        </div>

        {/* Progress */}
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

        {/* Actions */}
        <ResumeActions
          onEdit={handleEdit}
          onExport={handleExport}
          onDelete={onDelete}
          exportState={exportState}
        />
      </div>
    </div>
  );
}
