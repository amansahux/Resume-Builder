"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IWorkExperience } from "@/types/resume.types";

const experienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position/Title is required"),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
  description: z.string().min(1, "Job description is required"),
});

type ExperienceFormInput = z.infer<typeof experienceSchema>;

interface ExperienceFormProps {
  initialData?: IWorkExperience | null;
  onSave: (data: IWorkExperience) => void;
  onCancel: () => void;
}

export default function ExperienceForm({
  initialData,
  onSave,
  onCancel,
}: ExperienceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExperienceFormInput>({
    resolver: zodResolver(experienceSchema),
    defaultValues: initialData || {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      className="p-5 border border-brand-400 bg-white rounded-2xl space-y-4 shadow-sm animate-slide-up"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Company */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Company Name
          </label>
          <input
            type="text"
            placeholder="e.g. Google"
            {...register("company")}
            className={`w-full px-4 py-2.5 rounded-xl border ${
              errors.company ? "border-red-500" : "border-brand-400/50"
            } bg-brand-100/30 text-text-primary text-sm focus:outline-none`}
          />
          {errors.company && (
            <p className="text-xs text-red-500 font-medium">{errors.company.message}</p>
          )}
        </div>

        {/* Position */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Position / Job Title
          </label>
          <input
            type="text"
            placeholder="e.g. Senior Software Engineer"
            {...register("position")}
            className={`w-full px-4 py-2.5 rounded-xl border ${
              errors.position ? "border-red-500" : "border-brand-400/50"
            } bg-brand-100/30 text-text-primary text-sm focus:outline-none`}
          />
          {errors.position && (
            <p className="text-xs text-red-500 font-medium">{errors.position.message}</p>
          )}
        </div>

        {/* Start Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Start Date
          </label>
          <input
            type="text"
            placeholder="e.g. June 2021"
            {...register("startDate")}
            className={`w-full px-4 py-2.5 rounded-xl border ${
              errors.startDate ? "border-red-500" : "border-brand-400/50"
            } bg-brand-100/30 text-text-primary text-sm focus:outline-none`}
          />
          {errors.startDate && (
            <p className="text-xs text-red-500 font-medium">{errors.startDate.message}</p>
          )}
        </div>

        {/* End Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            End Date
          </label>
          <input
            type="text"
            placeholder="e.g. Present"
            {...register("endDate")}
            className={`w-full px-4 py-2.5 rounded-xl border ${
              errors.endDate ? "border-red-500" : "border-brand-400/50"
            } bg-brand-100/30 text-text-primary text-sm focus:outline-none`}
          />
          {errors.endDate && (
            <p className="text-xs text-red-500 font-medium">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Role Description / Key Achievements
        </label>
        <textarea
          rows={4}
          placeholder="- Led a team of 4 engineers to rebuild the analytics dashboard...&#10;- Optimized load times by 40% using Next.js routing..."
          {...register("description")}
          className={`w-full px-4 py-3 rounded-xl border ${
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
