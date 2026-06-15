import { GenerateResponse } from "@/lib/gemini";
import { GenerateProjectDescriptionBody } from "@/types/ai.types";
import { IResponse } from "@/types/response.interface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const body: GenerateProjectDescriptionBody = await req.json()

        const { jobTitle, projectTitle, techStack, level } = body
        if (!jobTitle || !techStack || !level || !projectTitle) return NextResponse.json<IResponse>({
            success: false,
            message: "All fields are required",
        })

        const prompt = `
You are an expert resume writer, ATS optimization specialist, and senior software engineer.

Generate a professional, ATS-friendly resume project description using the information below.

Project Title:
${projectTitle}

Target Job Role:
${jobTitle}

Experience Level:
${level}

Technology Stack:
${techStack}

Instructions:

1. Generate ONLY the project description.

2. Do NOT generate headings, titles, labels, bullet points, numbering, explanations, markdown, or additional text.

3. The description MUST be between 90 and 120 words.

4. The description MUST be directly related to the provided Project Title and Project Type.

5. Do NOT invent a completely different project.

6. Clearly describe:

   * Project purpose
   * Core functionality
   * Key features
   * Technical implementation
   * Business or user impact

7. Naturally incorporate the provided technologies throughout the description.

8. Use strong professional action verbs such as:
   Developed, Built, Designed, Implemented, Engineered, Integrated, Optimized, Architected, Automated, Enhanced.

9. Include ATS-friendly technical keywords relevant to the project and target job role.

10. Do NOT use first-person pronouns such as:
    I, Me, My, We, Our.

11. Make the project sound realistic, practical, and production-ready.

12. Adapt complexity based on experience level:

    * FRESHER:
      Portfolio-quality or academic-level project with practical functionality and clean implementation.

    * MID_LEVEL:
      Business-oriented application with advanced features, integrations, optimization, and scalability considerations.

    * EXPERIENCED:
      Enterprise-grade solution involving architecture decisions, performance optimization, maintainability, scalability, security, and best practices.

13. Mention measurable outcomes, performance improvements, usability enhancements, automation benefits, or user value whenever appropriate.

14. Avoid vague statements and generic buzzwords.

15. Do NOT mention AI, ChatGPT, language models, prompts, or content generation.

16. Return plain text only.

17. Output exactly one paragraph.

Output:
Return ONLY the final project description.
`;

        const response = await GenerateResponse(prompt);
        const summary = response;

        return NextResponse.json<IResponse>({
            success: true, message: "Summary created", data: {
                summary
            }
        }, {
            status: 201
        })
    } catch (error) {
        console.log("error in Generate Project Description api", error);
        return NextResponse.json<IResponse>(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}