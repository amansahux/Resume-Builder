"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useWorkspace } from "../workspace-context";
import SectionCard from "../components/SectionCard";
import PageNavigation from "../components/PageNavigation";
import LoadingSkeleton from "../components/LoadingSkeleton";

const personalInfoSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(1, "Mobile number is required"),
  location: z.string().min(1, "Location is required"),
  github: z.string().url("Must be a valid URL").or(z.literal("")),
  portfolio: z.string().url("Must be a valid URL").or(z.literal("")),
});

type PersonalInfoInput = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoPage() {
  const { resume, loading, saveResume } = useWorkspace();
  const router = useRouter();
  const params = useParams();
  const resumeId = params?.resumeId as string;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PersonalInfoInput>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullname: "",
      email: "",
      mobile: "",
      location: "",
      github: "",
      portfolio: "",
    },
  });

  useEffect(() => {
    if (resume?.personalInfo) {
      reset({
        fullname: resume.personalInfo.fullname || "",
        email: resume.personalInfo.email || "",
        mobile: resume.personalInfo.mobile || "",
        location: resume.personalInfo.location || "",
        github: resume.personalInfo.github || "",
        portfolio: resume.personalInfo.portfolio || "",
      });
    }
  }, [resume, reset]);

  const onSubmit = async (data: PersonalInfoInput) => {
    try {
      await saveResume({ personalInfo: data });
      router.push(`/main/resume/${resumeId}/education`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <LoadingSkeleton type="form" />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <SectionCard
        title="Personal Information"
        description="Enter your contact details and links. This information will be displayed at the very top of your luxury resume layout."
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullname" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                placeholder="e.g. Alexander Mercer"
                {...register("fullname")}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.fullname ? "border-red-500" : "border-brand-400/50"
                } bg-white/70 text-text-primary placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200 text-sm`}
              />
              {errors.fullname && (
                <p className="text-xs text-red-500 font-medium">{errors.fullname.message}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="e.g. alexander@mercer.com"
                {...register("email")}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.email ? "border-red-500" : "border-brand-400/50"
                } bg-white/70 text-text-primary placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200 text-sm`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="space-y-2">
              <label htmlFor="mobile" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                placeholder="e.g. +1 (555) 019-2834"
                {...register("mobile")}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.mobile ? "border-red-500" : "border-brand-400/50"
                } bg-white/70 text-text-primary placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200 text-sm`}
              />
              {errors.mobile && (
                <p className="text-xs text-red-500 font-medium">{errors.mobile.message}</p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label htmlFor="location" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="e.g. New York, NY"
                {...register("location")}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.location ? "border-red-500" : "border-brand-400/50"
                } bg-white/70 text-text-primary placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200 text-sm`}
              />
              {errors.location && (
                <p className="text-xs text-red-500 font-medium">{errors.location.message}</p>
              )}
            </div>

            {/* GitHub URL */}
            <div className="space-y-2">
              <label htmlFor="github" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                GitHub Profile Link
              </label>
              <input
                id="github"
                type="url"
                placeholder="https://github.com/alexandermercer"
                {...register("github")}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.github ? "border-red-500" : "border-brand-400/50"
                } bg-white/70 text-text-primary placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200 text-sm`}
              />
              {errors.github && (
                <p className="text-xs text-red-500 font-medium">{errors.github.message}</p>
              )}
            </div>

            {/* Portfolio Link */}
            <div className="space-y-2">
              <label htmlFor="portfolio" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Portfolio / Website
              </label>
              <input
                id="portfolio"
                type="url"
                placeholder="https://mercer.design"
                {...register("portfolio")}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.portfolio ? "border-red-500" : "border-brand-400/50"
                } bg-white/70 text-text-primary placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200 text-sm`}
              />
              {errors.portfolio && (
                <p className="text-xs text-red-500 font-medium">{errors.portfolio.message}</p>
              )}
            </div>
          </div>

          <PageNavigation isSubmitting={isSubmitting} />
        </form>
      </SectionCard>
    </div>
  );
}
