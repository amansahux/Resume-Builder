"use client";

import React, { useState, KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";

interface TechStackInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export default function TechStackInput({
  value = [],
  onChange,
  placeholder = "Add technology (e.g. Next.js) and press Enter...",
}: TechStackInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTech();
    }
  };

  const addTech = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue("");
    }
  };

  const removeTech = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-2.5">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 rounded-xl border border-brand-400/50 bg-white/70 text-text-primary placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200 text-sm"
        />
        <button
          type="button"
          onClick={addTech}
          className="px-3.5 py-2.5 bg-brand-500 hover:bg-brand-dark text-text-primary rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 min-h-[36px]">
        {value.map((tech, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-brand-400/30 text-xs text-text-primary shadow-xs"
          >
            <span>{tech}</span>
            <button
              type="button"
              onClick={() => removeTech(index)}
              className="text-text-muted hover:text-red-600 transition-colors p-0.5 rounded-full hover:bg-red-50 cursor-pointer"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
