import { ICreateResumeBody } from "@/types/resume.types";

export async function createResumeAPI(body: ICreateResumeBody) {

    // TODO: CALL EXISTING BACKEND API THAT CREATES A BLANK RESUME
    // Sending: jobTitle, experienceLevel
    const response = await fetch("/api/resume/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create resume");
    }
    return result;

}