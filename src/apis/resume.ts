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
export async function updateResumeAPI(resumeId:string,body:any) {
    const response = await fetch(`/api/resume/${resumeId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update resume");
    }
    return result;
    
}

export async function getResumeAPI(resumeId: string) {
    const response = await fetch(`/api/resume/${resumeId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch resume");
    }
    return result;
}