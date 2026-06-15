"use client";

import React, { useState, KeyboardEvent } from "react";
import { X, Plus, Sparkles } from "lucide-react";
import { generateSkillAPI } from "@/apis/ai";

interface SkillInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  level?: string;
  jobTitle?: string;
}

export default function SkillInput({
  value = [],
  onChange,
  placeholder = "Type a skill and press Enter...",
  level,
  jobTitle,
}: SkillInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSkills = async () => {
    if (!level || !jobTitle) {
      alert("Job title and experience level are missing. Please complete the previous steps.");
      return;
    }

    try {
      setIsGenerating(true);
      const res = await generateSkillAPI({ level, jobTitle });
      if (res.success && res.data) {
        // Extract array from response depending on structure
        let newSkills = res.data.skills || res.data;
        if (!Array.isArray(newSkills) && typeof newSkills === "string") {
          try { newSkills = JSON.parse(newSkills); } catch (e) {}
        }
        
        if (Array.isArray(newSkills)) {
          // Merge unique skills
          const combined = Array.from(new Set([...value, ...newSkills]));
          onChange(combined);
        }
      }
    } catch (err) {
      console.error("Failed to generate skills:", err);
      alert("Failed to generate skills.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const addSkill = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue("");
    }
  };

  const removeSkill = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Skills Inventory
        </label>
        <button
          type="button"
          onClick={handleGenerateSkills}
          disabled={isGenerating || !level || !jobTitle}
          className="flex items-center border border-[#9B8467] gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-200/50 hover:bg-brand-200 py-1 px-2 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Sparkles className="w-3 h-3" />
          {isGenerating ? "Generating..." : "Generate AI Skills"}
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 rounded-xl border border-brand-400/50 bg-white/70 text-text-primary placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200 text-sm"
        />
        <button
          type="button"
          onClick={addSkill}
          className="px-4 py-3 bg-brand-500 hover:bg-brand-dark text-text-primary rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {value.length > 0 ? (
        <div className="flex flex-wrap gap-2 p-4 bg-brand-200/20 border border-brand-400/25 rounded-2xl min-h-[60px]">
          {value.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-brand-400/35 text-xs text-text-primary shadow-sm animate-fade-in"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-text-muted hover:text-red-600 transition-colors p-0.5 rounded-full hover:bg-red-50 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="p-4 border border-dashed border-brand-400/35 rounded-2xl text-center text-xs text-text-muted">
          No skills added yet. Add some of your expertise above.
        </div>
      )}
    </div>
  );
}
