"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IProjects } from "@/types/resume.types";
import TechStackInput from "./TechStackInput";

const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Project description is required"),
  githubUrl: z.string().optional().or(z.literal("")),
  liveUrl: z.string().optional().or(z.literal("")),
  techStack: z.array(z.string()).min(1, "At least one technology is required"),
});

type ProjectFormInput = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initialData?: IProjects | null;
  onSave: (data: IProjects) => void;
  onCancel: () => void;
}

export default function ProjectForm({
  initialData,
  onSave,
  onCancel,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectFormInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      githubUrl: "",
      liveUrl: "",
      techStack: [],
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      className="p-5 border border-brand-400 bg-white rounded-2xl space-y-4 shadow-sm animate-slide-up"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Project Title
          </label>
          <input
            type="text"
            placeholder="e.g. ApexResume - Luxury Resume Builder"
            {...register("title")}
            className={`w-full px-4 py-2.5 rounded-xl border ${
              errors.title ? "border-red-500" : "border-brand-400/50"
            } bg-brand-100/30 text-text-primary text-sm focus:outline-none`}
          />
          {errors.title && (
            <p className="text-xs text-red-500 font-medium">{errors.title.message}</p>
          )}
        </div>

        {/* GitHub URL */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            GitHub Link (Optional)
          </label>
          <input
            type="url"
            placeholder="https://github.com/username/project"
            {...register("githubUrl")}
            className="w-full px-4 py-2.5 rounded-xl border border-brand-400/50 bg-brand-100/30 text-text-primary text-sm focus:outline-none"
          />
        </div>

        {/* Live URL */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Live URL / Demo Link (Optional)
          </label>
          <input
            type="url"
            placeholder="https://project.com"
            {...register("liveUrl")}
            className="w-full px-4 py-2.5 rounded-xl border border-brand-400/50 bg-brand-100/30 text-text-primary text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Tech Stack Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Technologies Used
        </label>
        <Controller
          control={control}
          name="techStack"
          render={({ field }) => (
            <TechStackInput value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.techStack && (
          <p className="text-xs text-red-500 font-medium">{errors.techStack.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Project Description
        </label>
        <textarea
          rows={3}
          placeholder="Describe your project, key metrics, features and role..."
          {...register("description")}
          className={`w-full px-4 py-3 rounded-xl border scrollbar-hide scrrollbar-none  ${
            errors.description ? "border-red-500" : "border-brand-400/50"
          } bg-brand-100/30 text-text-primary text-sm focus:outline-none resize-y`}
        />
        {errors.description && (
          <p className="text-xs text-red-500 font-medium">{errors.description.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors border border-transparent hover:border-brand-400 rounded-lg cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-brand-500 hover:bg-brand-dark text-text-primary font-bold rounded-lg text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
        >
          Save Record
        </button>
      </div>
    </form>
  );
}
