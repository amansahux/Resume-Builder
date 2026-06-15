import { GenerateProjectDescriptionBody, GenerateSkillsBody } from "@/types/ai.types";

export async function generateSkillAPI(body: GenerateSkillsBody) {

    const response = await fetch("/api/ai/generate-skills", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to generate skills");
    }
    return result;

}
export async function generateProjectDescriptionAPI(body: GenerateProjectDescriptionBody) {

    const response = await fetch("/api/ai/generate-project-description", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to generate project description");
    }
    return result;

}
