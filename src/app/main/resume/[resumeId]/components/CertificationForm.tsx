"use client";

import React, { useState } from "react";
import { Plus, X, Award } from "lucide-react";

interface CertificationFormProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function CertificationForm({
  value = [],
  onChange,
}: CertificationFormProps) {
  const [inputVal, setInputVal] = useState("");

  const handleAdd = () => {
    const trimmed = inputVal.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputVal("");
    }
  };

  const handleRemove = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="e.g. AWS Certified Solutions Architect"
          className="flex-1 px-4 py-3 rounded-xl border border-brand-400/50 bg-white/70 text-text-primary placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200 text-sm"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-3 bg-brand-500 hover:bg-brand-dark text-text-primary rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer font-semibold"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {value.length > 0 ? (
        <div className="space-y-2">
          {value.map((cert, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 bg-white border border-brand-400/30 rounded-xl shadow-xs hover:border-brand-400 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4 text-brand-500" />
                <span className="text-sm font-medium text-text-primary">
                  {cert}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="text-text-muted hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 border border-dashed border-brand-400/35 rounded-2xl text-center text-sm text-text-muted bg-brand-200/10">
          No certifications added yet. AWS, Scrum Master, or Salesforce certificates are great additions.
        </div>
      )}
    </div>
  );
}
