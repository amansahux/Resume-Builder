"use client";

import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-brand-400 bg-brand-200 p-8 hover:bg-brand-100 hover:border-brand-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Subtle top-right corner brand highlight */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="space-y-6">
        <div className="w-12 h-12 rounded-xl bg-brand-100 border border-brand-400 flex items-center justify-center text-text-primary shadow-sm group-hover:bg-brand-500 group-hover:text-text-primary group-hover:border-transparent transition-all duration-300">
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-serif text-text-primary group-hover:text-text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
            {description}
          </p>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-brand-400/30 flex items-center text-xs font-semibold uppercase tracking-wider text-text-muted/60 group-hover:text-text-primary transition-colors duration-300 space-x-1">
        <span>Discover Detail</span>
        <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      title: "AI Resume Generation",
      description: "Harness deep-learning language models specifically trained on executive placements to formulate high-impact descriptions of your professional triumphs.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "ATS Optimization",
      description: "Navigate corporate algorithmic gatekeepers with absolute assurance. Our precision scanning system guarantees high-scoring keyword distribution.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Modern Templates",
      description: "Select from a curated collection of layouts built in collaboration with leading design directors and typographic specialists.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
    },
    {
      title: "One-Click PDF Export",
      description: "Render and download your customized document instantly in a high-fidelity PDF format configured for perfect printing proportions.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Recruiter Friendly Design",
      description: "Structure information to follow natural cognitive reading patterns, ensuring hiring committees spot your core qualifications in under six seconds.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Career Growth Insights",
      description: "Receive targeted insights and vocabulary refinements to elevate your positioning from a functional performer to a strategic decision maker.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-24 bg-brand-300 border-t border-brand-400/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20 text-left">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-text-secondary font-sans mb-3">
            Sophisticated Capability
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif tracking-tight text-text-primary">
            Features Tailored for Distinctive Careers
          </h3>
          <p className="text-base text-text-secondary mt-4 leading-relaxed font-sans font-light">
            Every instrument we build is optimized for premium delivery, executive scrutiny, and modern candidate tracking protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
