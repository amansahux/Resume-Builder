import React from "react";

interface ResumeGridProps {
  children: React.ReactNode;
}

export default function ResumeGrid({ children }: ResumeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl mx-auto">
      {children}
    </div>
  );
}
