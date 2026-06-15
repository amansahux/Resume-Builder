"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { getResumeAPI, updateResumeAPI } from "@/apis/resume";
import { IResume } from "@/types/resume.types";

export interface Step {
  id: string;
  name: string;
  path: string;
  required: boolean;
}

export const STEPS: Step[] = [
  { id: "personalInfo", name: "Personal Info", path: "personalInfo", required: true },
  { id: "education", name: "Education", path: "education", required: true },
  { id: "workExperience", name: "Work Experience", path: "workExperience", required: false },
  { id: "projects", name: "Projects", path: "projects", required: false },
  { id: "skills", name: "Skills", path: "skills", required: true },
  { id: "certifications", name: "Certifications", path: "certifications", required: false },
  { id: "summary", name: "Summary", path: "summary", required: false },
  { id: "review", name: "Review", path: "review", required: false },
];

interface WorkspaceContextType {
  resume: IResume | null;
  loading: boolean;
  error: string | null;
  saveResume: (data: Partial<IResume>) => Promise<void>;
  currentStepIndex: number;
  steps: Step[];
  completionPercentage: number;
  isStepCompleted: (stepId: string) => boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const resumeId = params?.resumeId as string;

  const [resume, setResume] = useState<IResume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentStepIndex = STEPS.findIndex((step) => pathname?.includes(`/${step.path}`));

  const fetchResume = async () => {
    if (!resumeId) return;
    try {
      setLoading(true);
      const res = await getResumeAPI(resumeId);
      if (res.success && res.data) {
        setResume(res.data);
      } else {
        setError("Failed to load resume");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load resume");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, [resumeId]);

  const isStepCompleted = (stepId: string): boolean => {
    if (!resume) return false;
    switch (stepId) {
      case "personalInfo":
        return !!(resume.personalInfo?.fullname?.trim() && resume.personalInfo?.email?.trim());
      case "education":
        return !!(resume.education && resume.education.length > 0);
      case "workExperience":
        return !!(resume.workExperience && resume.workExperience.length > 0);
      case "projects":
        return !!(resume.projects && resume.projects.length > 0);
      case "skills":
        return !!(resume.skills && resume.skills.length > 0);
      case "certifications":
        return !!(resume.certifications && resume.certifications.length > 0);
      case "summary":
        return !!(resume.summary?.trim());
      case "review":
        return false;
      default:
        return false;
    }
  };

  const calculateCompletionPercentage = (): number => {
    if (!resume) return 0;
    let percentage = 0;
    
    // Personal Info: 20%
    if (resume.personalInfo?.fullname?.trim() && resume.personalInfo?.email?.trim()) {
      percentage += 20;
    }
    // Education: 20%
    if (resume.education && resume.education.length > 0) {
      percentage += 20;
    }
    // Work Experience: 15%
    if (resume.workExperience && resume.workExperience.length > 0) {
      percentage += 15;
    }
    // Projects: 15%
    if (resume.projects && resume.projects.length > 0) {
      percentage += 15;
    }
    // Skills: 15%
    if (resume.skills && resume.skills.length > 0) {
      percentage += 15;
    }
    // Certifications: 5%
    if (resume.certifications && resume.certifications.length > 0) {
      percentage += 5;
    }
    // Summary: 10%
    if (resume.summary?.trim()) {
      percentage += 10;
    }

    return percentage;
  };

  const completionPercentage = calculateCompletionPercentage();

  const saveResume = async (updatedFields: Partial<IResume>) => {
    if (!resumeId) return;
    try {
      // Optimistic update
      setResume((prev) => {
        if (!prev) return null;
        return { ...prev, ...updatedFields } as IResume;
      });

      // Calculate new percentage & status
      const updatedData = {
        ...updatedFields,
        completionPercentage: calculateCompletionPercentage(),
      };

      await updateResumeAPI(resumeId, updatedData);
    } catch (err: any) {
      // Revert/Fetch again on error
      fetchResume();
      throw new Error(err.message || "Failed to save progress");
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        resume,
        loading,
        error,
        saveResume,
        currentStepIndex,
        steps: STEPS,
        completionPercentage,
        isStepCompleted,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
