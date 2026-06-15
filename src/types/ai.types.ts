export interface GenerateSummaryBody {
  level: string;
  skills: string[];
  jobTitle: string;
}

export interface GenerateSkillsBody {
  level: string;
  jobTitle: string;
}

export interface GenerateProjectDescriptionBody {
  level: string;
  projectTitle: string,
  jobTitle: string;
  techStack: string[];
}

export interface GenerateExperienceDescriptionBody {
  level: string;
  techStack: string[];
  yearsOfExperience: number;
  jobRole: string;
}

export interface ImproveContentBody {
  content: string;
}
export interface ResumeTextBody {
  resumeText: string;
}