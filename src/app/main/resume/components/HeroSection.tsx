"use client";

import React from "react";

interface HeroSectionProps {
  onCreateClick: () => void;
}

export default function HeroSection({ onCreateClick }: HeroSectionProps) {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-36 bg-brand-100">
      {/* Background elegant abstract shapes */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-brand-300/40 to-transparent blur-3xl" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-brand-400/30 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left column: Text Content */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-brand-400/40 bg-brand-200/40 backdrop-blur-sm shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary font-sans">
              The Sovereign Standard
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-text-primary leading-[1.1]">
              Build Resumes <br />
              <span className="italic font-light text-brand-500">That Open Doors</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-sans max-w-2xl font-light">
              Crafted for executives and elite professionals. Our AI-augmented platform translates your career history into an architectural masterpiece that commands attention.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={onCreateClick}
              className="px-8 py-4 cursor-pointer bg-brand-500 text-text-primary hover:bg-brand-dark rounded-xl text-sm font-medium tracking-wide uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Create Resume
            </button>
            <button
              onClick={scrollToFeatures}
              className="px-8 py-4 cursor-pointer bg-transparent text-text-primary border border-brand-400/60 rounded-xl text-sm font-medium tracking-wide uppercase hover:bg-brand-300/20 transition-all duration-300"
            >
              Explore Features
            </button>
          </div>
        </div>

        {/* Right column: Luxury Visual Composition */}
        <div className="lg:col-span-5 relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center">
          <div className="relative w-full h-full max-w-[420px] lg:max-w-none flex items-center justify-center">
            
            {/* Background luxury card 1: Elegant minimal shape */}
            <div className="absolute top-[10%] left-[5%] w-[80%] h-[75%] rounded-2xl bg-brand-300/30 border border-brand-400/30 backdrop-blur-[2px] -rotate-6 transform scale-95 shadow-lg transition-transform duration-700 hover:rotate-0 hover:scale-100" />

            {/* Background luxury card 2: Detailed Document preview */}
            <div className="absolute top-[18%] left-[12%] w-[80%] h-[75%] rounded-2xl bg-brand-200 border border-brand-400/40 p-6 shadow-xl rotate-3 transform transition-all duration-700 hover:rotate-0 hover:scale-[1.02] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-brand-300/60 pb-4">
                  <div>
                    <div className="h-5 w-32 bg-brand-400/50 rounded" />
                    <div className="h-3 w-20 bg-brand-300/40 rounded mt-2" />
                  </div>
                  <div className="h-3 w-24 bg-brand-300/30 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-brand-300/40 rounded" />
                  <div className="h-2 w-[90%] bg-brand-300/40 rounded" />
                  <div className="h-2 w-[95%] bg-brand-300/40 rounded" />
                </div>
                <div className="pt-2 space-y-3">
                  <div className="h-4 w-28 bg-brand-400/40 rounded" />
                  <div className="space-y-1.5">
                    <div className="h-2 w-[85%] bg-brand-300/30 rounded" />
                    <div className="h-2 w-[70%] bg-brand-300/30 rounded" />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-4 border-t border-brand-300/60">
                <div className="w-5 h-5 rounded-full bg-brand-400/30" />
                <div className="h-2 w-16 bg-brand-400/30 rounded" />
              </div>
            </div>

            {/* Floating Glassmorphism UI panel: Career Growth */}
            <div className="absolute bottom-[8%] -left-[10%] w-[62%] rounded-xl bg-brand-200/90 border border-brand-400/40 backdrop-blur-xl p-4 shadow-2xl transform -translate-y-4 hover:translate-y-0 transition-transform duration-500">
              <div className="flex items-center space-x-3 mb-2.5">
                <div className="p-1.5 rounded-lg bg-brand-500/10 text-brand-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-text-primary">Ats score</h4>
                  <p className="text-[9px] text-text-secondary">Optimized for Leadership Roles</p>
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-serif text-text-primary font-semibold">98%</span>
                <span className="text-[9px] text-brand-500 font-medium">+14% Growth</span>
              </div>
              <div className="w-full bg-brand-300/40 h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-brand-500 h-full w-[98%] rounded-full" />
              </div>
            </div>

            {/* Floating Card: Modern Executive template style */}
            <div className="absolute top-[8%] -right-[8%] w-[58%] rounded-xl bg-brand-300 border border-brand-400/50 text-text-primary p-4 shadow-2xl transform translate-x-2 translate-y-2 hover:-translate-y-1 transition-all duration-500">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] uppercase tracking-widest text-text-secondary font-medium">Executive Profile</div>
                <div className="w-2 h-2 rounded-full bg-brand-500" />
              </div>
              <div className="space-y-1">
                <div className="h-3 w-28 bg-brand-400/80 rounded" />
                <div className="h-2 w-20 bg-brand-400/40 rounded" />
              </div>
              <div className="mt-4 pt-3 border-t border-brand-400/60 flex justify-between text-[9px] text-text-secondary">
                <span>Resume ID: APEX-9</span>
                <span className="font-semibold text-brand-500">READY TO EXPORT</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
