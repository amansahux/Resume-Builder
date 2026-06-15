"use client";

import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import ShowcaseSection from "./components/ShowcaseSection";
import CreateResumeModal from "./components/CreateResumeModal";

export default function ResumeLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-brand-100 text-text-primary selection:bg-brand-500 selection:text-text-primary">
      {/* Luxury Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-brand-100/90 backdrop-blur-md border-b border-brand-400/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-xl font-bold tracking-widest text-text-primary">
              APEX<span className="italic font-light text-brand-500">RESUME</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider">
            <a href="#features" className="text-text-secondary hover:text-text-primary transition-colors duration-200">
              Features
            </a>
            <a href="#process" className="text-text-secondary hover:text-text-primary transition-colors duration-200">
              Process
            </a>
            <a href="#showcase" className="text-text-secondary hover:text-text-primary transition-colors duration-200">
              Showcase
            </a>
          </nav>

          <div>
            <button
              onClick={openModal}
              className="px-6 py-2.5 cursor-pointer bg-brand-500 hover:bg-brand-dark text-text-primary rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* 1. HERO SECTION (#EDEDE9 background handled inside HeroSection component) */}
        <HeroSection onCreateClick={openModal} />

        {/* 2. TRUST SECTION (#F5EBE0 background) */}
        <section className="py-16 bg-brand-200 border-t border-b border-brand-400/30 relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
              
              <div className="space-y-1">
                <p className="text-4xl md:text-5xl font-serif text-text-primary font-semibold">50K+</p>
                <p className="text-xs uppercase tracking-widest text-text-secondary font-medium">Resumes Created</p>
              </div>

              <div className="space-y-1 border-l border-brand-400/30 pl-2 lg:pl-0">
                <p className="text-4xl md:text-5xl font-serif text-text-primary font-semibold">95%</p>
                <p className="text-xs uppercase tracking-widest text-text-secondary font-medium">ATS Compatibility</p>
              </div>

              <div className="space-y-1 lg:border-l border-brand-400/30 pl-2 lg:pl-0">
                <p className="text-4xl md:text-5xl font-serif text-text-primary font-semibold">120+</p>
                <p className="text-xs uppercase tracking-widest text-text-secondary font-medium">Countries</p>
              </div>

              <div className="space-y-1 border-l border-brand-400/30 pl-2 lg:pl-0">
                <p className="text-4xl md:text-5xl font-serif text-text-primary font-semibold">4.9/5</p>
                <p className="text-xs uppercase tracking-widest text-text-secondary font-medium">User Rating</p>
              </div>

            </div>
          </div>
        </section>

        {/* 3. FEATURES SECTION (#E3D5CA background handled inside FeaturesSection component) */}
        <FeaturesSection />

        {/* 4. PROCESS SECTION (#EDEDE9 background) */}
        <section id="process" className="py-24 bg-brand-100 border-t border-b border-brand-400/30">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl mb-20">
              <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary font-sans block mb-3">
                Proven Methodology
              </span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-text-primary">
                The Path to Distinction
              </h2>
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-brand-400/40 z-0" />

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-200 border border-brand-400/60 flex items-center justify-center font-serif text-lg text-text-primary font-bold shadow-md">
                  I
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-serif text-text-primary">Create Resume</h4>
                  <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
                    Initiate your workspace by specifying your target job title and experience level.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-200 border border-brand-400/60 flex items-center justify-center font-serif text-lg text-text-primary font-bold shadow-md">
                  II
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-serif text-text-primary">Add Information</h4>
                  <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
                    Document your career trajectory, academic achievements, and core skills via our refined panels.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-200 border border-brand-400/60 flex items-center justify-center font-serif text-lg text-text-primary font-bold shadow-md">
                  III
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-serif text-text-primary">Optimize with AI</h4>
                  <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
                    Refine text structures and inject recruiter-friendly terms using our deep NLP algorithms.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-500 border border-brand-500 flex items-center justify-center font-serif text-lg text-text-primary font-bold shadow-lg">
                  IV
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-serif text-text-primary">Export & Apply</h4>
                  <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
                    Download print-ready vector PDFs built to render perfectly on recruiter databases.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. PREMIUM SHOWCASE SECTION (#F5EBE0 background handled inside ShowcaseSection component) */}
        <div id="showcase">
          <ShowcaseSection />
        </div>

        {/* 6. FINAL CTA SECTION (Gradient using #E3D5CA to #D5BDAF) */}
        <section className="py-28 bg-gradient-to-r from-brand-300 to-brand-500 text-text-primary relative overflow-hidden">
          {/* Subtle design patterns */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-brand-text-primary" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-brand-text-primary" />
          </div>

          <div className="max-w-4xl mx-auto text-center px-6 relative z-10 space-y-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary font-sans block">
              Immediate Executive Placement
            </span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-text-primary leading-tight">
              Your Next Opportunity <br /> Starts Here
            </h2>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed font-sans font-light max-w-xl mx-auto">
              Join elite operators globally. Build an ATS-optimized, design-first resume that commands attention in minutes.
            </p>
            <div className="pt-4">
              <button
                onClick={openModal}
                className="px-10 py-5 bg-brand-500 cursor-pointer hover:bg-brand-dark text-text-primary rounded-xl text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Create Resume
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-brand-100 border-t border-brand-400/30 text-xs text-text-secondary font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-serif text-sm font-bold tracking-widest text-text-primary">
            APEX<span className="italic font-light text-brand-500">RESUME</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} ApexResume. Manufactured for Excellence. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Create Resume Modal */}
      <CreateResumeModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
