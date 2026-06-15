"use client";

import React, { useState } from "react";

export default function ShowcaseSection() {
  const [activeHighlight, setActiveHighlight] = useState<string | null>("typography");

  const highlights = [
    {
      id: "typography",
      label: "Editorial Typography",
      description: "Carefully calibrated font hierarchy utilizing premium serif headers and clean, readable sans-serif body copy.",
    },
    {
      id: "ai-summary",
      label: "AI Executive Summary",
      description: "Synthesized dynamic introduction optimized with industry-relevant action-oriented vocabulary.",
    },
    {
      id: "timeline",
      label: "Chronological Integrity",
      description: "A balanced structure designed to emphasize achievements rather than listing basic responsibilities.",
    },
  ];

  return (
    <section className="py-24 bg-brand-200 border-t border-brand-300/40 relative overflow-hidden">
      {/* Background shape */}
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-300/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Information & Controls */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-500 font-sans block">
                Premium Showcase
              </span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-black leading-tight">
                Designed to Capture Distinction
              </h2>
              <p className="text-base text-brand-500/80 leading-relaxed font-sans font-light">
                Inspect the components of a layout configured for premier executive search. Click on the features below to inspect the design tokens.
              </p>
            </div>

            {/* Interactive Toggle List */}
            <div className="space-y-3">
              {highlights.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveHighlight(item.id)}
                  className={`w-full text-left p-4.5 rounded-xl border transition-all duration-300 focus:outline-none ${
                    activeHighlight === item.id
                      ? "bg-white border-brand-500/30 shadow-md text-black"
                      : "bg-transparent border-brand-300/30 text-brand-500/80 hover:bg-white/40"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-serif text-base font-medium">{item.label}</span>
                    {activeHighlight === item.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    )}
                  </div>
                  <p className="text-xs text-brand-500/70 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Layout & Document Mockup */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="relative w-full max-w-2xl bg-white border border-brand-300/40 rounded-2xl shadow-2xl p-8 md:p-12 transition-all duration-500 transform hover:scale-[1.01]">
              
              {/* Floating Pill: ATS Badge */}
              <div className="absolute -top-4 -right-4 bg-brand-500 text-white text-[10px] font-semibold tracking-wider uppercase px-4 py-2 rounded-full shadow-lg border border-brand-400/20">
                Optimized Layout
              </div>

              {/* Floating Glass Box */}
              <div className="absolute -bottom-6 -left-6 bg-white/80 border border-brand-300/40 backdrop-blur-md px-5 py-4 rounded-xl shadow-xl flex items-center space-x-3 hidden sm:flex max-w-xs">
                <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-serif text-sm">
                  A
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-black uppercase tracking-wider">Apex Premium</h4>
                  <p className="text-[9px] text-brand-500">120+ Countries Compatible</p>
                </div>
              </div>

              {/* Document Header Mock */}
              <div className={`space-y-4 pb-6 border-b border-brand-200 transition-all duration-500 ${
                activeHighlight === "typography" ? "ring-2 ring-brand-500/10 bg-brand-100/10 p-2 rounded" : ""
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-serif text-black font-semibold tracking-tight">Victoria Sterling</h3>
                    <p className="text-xs uppercase tracking-widest text-brand-500 mt-1">VP of Global Technology Operations</p>
                  </div>
                  <div className="text-right text-[10px] text-brand-500/80 font-sans space-y-0.5">
                    <p>london, uk</p>
                    <p>victoria@sterling.com</p>
                    <p>+44 20 7946 0958</p>
                  </div>
                </div>
              </div>

              {/* Document Profile Summary */}
              <div className={`py-6 border-b border-brand-200 transition-all duration-500 ${
                activeHighlight === "ai-summary" ? "ring-2 ring-brand-500/10 bg-brand-100/10 p-2 rounded" : ""
              }`}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-black mb-3">Executive Summary</h4>
                <p className="text-xs text-brand-500 leading-relaxed font-sans font-light">
                  Accomplished executive with over 12 years of leadership directing global cloud architecture and data platform strategies. Recognized for orchestrating large-scale cloud migrations that improved operational efficiency by 35% while lowering annual technology expenditures by $4.2M. Expert in driving alignment between cross-functional business groups and technical engineering teams.
                </p>
              </div>

              {/* Document Experience */}
              <div className={`pt-6 space-y-6 transition-all duration-500 ${
                activeHighlight === "timeline" ? "ring-2 ring-brand-500/10 bg-brand-100/10 p-2 rounded" : ""
              }`}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-black">Professional Experience</h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <div>
                      <span className="font-semibold text-black">Head of Infrastructure</span>
                      <span className="text-brand-500/80 font-light"> &mdash; Vanguard Systems</span>
                    </div>
                    <span className="text-brand-500">2021 &ndash; Present</span>
                  </div>
                  <p className="text-[11px] text-brand-500/95 leading-relaxed font-sans font-light">
                    Direct cloud-native architecture transformation for an international portfolio. Managed a budget of $18M and directed a team of 40 distributed software engineers and system administrators.
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-[10px] text-brand-500/80 font-sans font-light">
                    <li>Led the migration of 14 legacy systems to modern AWS serverless platforms.</li>
                    <li>Designed robust multi-region disaster recovery systems yielding a 99.999% uptime benchmark.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
