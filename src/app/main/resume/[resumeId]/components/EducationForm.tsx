"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IEducation } from "@/types/resume.types";

const educationSchema = z.object({
  institute: z.string().min(1, "Institute name is required"),
  degree: z.string().min(1, "Degree/Program is required"),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
});

type EducationFormInput = z.infer<typeof educationSchema>;

interface EducationFormProps {
  initialData?: IEducation | null;
  onSave: (data: IEducation) => void;
  onCancel: () => void;
}

export default function EducationForm({
  initialData,
  onSave,
  onCancel,
}: EducationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationFormInput>({
    resolver: zodResolver(educationSchema),
    defaultValues: initialData || {
      institute: "",
      degree: "",
      startDate: "",
      endDate: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      className="p-5 border border-brand-400 bg-white rounded-2xl space-y-4 shadow-sm animate-slide-up"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Institute */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Institute / School Name
          </label>
          <input
            type="text"
            placeholder="e.g. Stanford University"
            {...register("institute")}
            className={`w-full px-4 py-2.5 rounded-xl border ${
              errors.institute ? "border-red-500" : "border-brand-400/50"
            } bg-brand-100/30 text-text-primary text-sm focus:outline-none`}
          />
          {errors.institute && (
            <p className="text-xs text-red-500 font-medium">{errors.institute.message}</p>
          )}
        </div>

        {/* Degree */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Degree / Certificate
          </label>
          <input
            type="text"
            placeholder="e.g. B.S. Computer Science"
            {...register("degree")}
            className={`w-full px-4 py-2.5 rounded-xl border ${
              errors.degree ? "border-red-500" : "border-brand-400/50"
            } bg-brand-100/30 text-text-primary text-sm focus:outline-none`}
          />
          {errors.degree && (
            <p className="text-xs text-red-500 font-medium">{errors.degree.message}</p>
          )}
        </div>

        {/* Start Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Start Date
          </label>
          <input
            type="text"
            placeholder="e.g. September 2022"
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
            placeholder="e.g. May 2026 or Present"
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
