import React from "react";

interface ResumeStatusBadgeProps {
  status: "DRAFT" | "COMPLETED";
}

export default function ResumeStatusBadge({ status }: ResumeStatusBadgeProps) {
  const isDraft = status === "DRAFT";
  
  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono shadow-sm border border-black/5 transition-all duration-300`}
      style={{
        backgroundColor: isDraft ? "#E3D5CA" : "#D5BDAF",
        color: "#3A322D",
      }}
    >
      {status}
    </span>
  );
}
