"use client";

import React from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export default function SectionCard({
  title,
  description,
  children,
  actions,
}: SectionCardProps) {
  return (
    <section className="w-full bg-brand-200/40 border border-brand-400/30 rounded-2xl p-6 md:p-8 shadow-sm transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-400/20 pb-5 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-serif text-text-primary">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-text-secondary mt-1 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      <div className="space-y-6">{children}</div>
    </section>
  );
}
