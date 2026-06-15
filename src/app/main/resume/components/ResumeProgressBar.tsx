import React, { useEffect, useState } from "react";

interface ResumeProgressBarProps {
  percentage: number;
}

export default function ResumeProgressBar({ percentage }: ResumeProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Subtle timeout to trigger smooth entrance animation
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs font-semibold text-text-secondary">
        <span className="uppercase tracking-widest font-mono text-[10px]">Progress</span>
        <span className="font-mono text-text-primary">{percentage}% Complete</span>
      </div>
      <div className="h-1.5 w-full bg-brand-400/30 rounded-full overflow-hidden border border-brand-400/20">
        <div
          className="h-full bg-brand-500 rounded-full transition-all duration-1000 ease-out shadow-sm"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
