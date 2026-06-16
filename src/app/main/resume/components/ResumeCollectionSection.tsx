import React, { useEffect, useState } from "react";
import { IResume } from "@/types/resume.types";
import { getUserResumesAPI, deleteResumeAPI } from "@/apis/resume";
import ResumeGrid from "./ResumeGrid";
import ResumeCard from "./ResumeCard";
import ResumeCardSkeleton from "./ResumeCardSkeleton";
import ResumeEmptyState from "./ResumeEmptyState";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useToast } from "@/context/toast-context";

interface ResumeCollectionSectionProps {
  onCreateClick: () => void;
}

export default function ResumeCollectionSection({ onCreateClick }: ResumeCollectionSectionProps) {
  const [resumes, setResumes] = useState<IResume[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Delete Modal state
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserResumesAPI();
      if (response.success && Array.isArray(response.data)) {
        setResumes(response.data);
      } else {
        setResumes([]);
      }
    } catch (err: any) {
      console.error("Error fetching resumes:", err);
      setError("Unable to load your resume collection. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (resumeId: string, title: string) => {
    setDeleteTarget({ id: resumeId, title });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteResumeAPI(deleteTarget.id);
      showToast("Resume deleted successfully.", "success");
      fetchResumes();
    } catch (err: any) {
      console.error("Error deleting resume:", err);
      showToast(err.message || "Failed to delete resume", "error");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <section id="collection" className="py-24 bg-brand-100 border-b border-brand-400/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center md:text-left max-w-3xl mb-16 md:mb-20 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary font-sans block">
            Portfolio Workspace
          </span>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-text-primary">
            Your Resume Collection
          </h2>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed font-sans font-light max-w-xl">
            Manage, edit, and export your professional resumes.
          </p>
        </div>

        {/* Dynamic States */}
        {loading ? (
          <ResumeGrid>
            {Array.from({ length: 3 }).map((_, index) => (
              <ResumeCardSkeleton key={index} />
            ))}
          </ResumeGrid>
        ) : error ? (
          <div className="max-w-xl mx-auto text-center py-12 px-6 rounded-xl border border-red-200 bg-red-50 text-red-800 text-sm">
            {error}
          </div>
        ) : resumes.length === 0 ? (
          <ResumeEmptyState onCreateClick={onCreateClick} />
        ) : (
          <ResumeGrid>
            {resumes.map((resume) => (
              <ResumeCard
                key={resume._id}
                resume={resume}
                onDelete={() => handleDeleteClick(resume._id!, resume.title || "Untitled Resume")}
              />
            ))}
          </ResumeGrid>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isSubmitting={isDeleting}
        resumeTitle={deleteTarget?.title}
      />
    </section>
  );
}
