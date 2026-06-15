"use client";

import React from "react";
import { WorkspaceProvider } from "./workspace-context";
import ResumeHeader from "./components/ResumeHeader";
import ResumeProgressSidebar from "./components/ResumeProgressSidebar";

export default function ResumeWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkspaceProvider>
      <div className="min-h-screen flex flex-col bg-brand-100 text-text-primary">
        <ResumeHeader />
        <div className="flex flex-1 relative">
          <ResumeProgressSidebar />
          <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-5xl mx-auto w-full overflow-y-auto">
            <div className="animate-fade-in pb-16">
              {children}
            </div>
          </main>
        </div>
      </div>
    </WorkspaceProvider>
  );
}
