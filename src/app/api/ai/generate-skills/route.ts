import { GenerateResponse } from "@/lib/gemini";
import { GenerateSkillsBody, GenerateSummaryBody } from "@/types/ai.types";
import { IResponse } from "@/types/response.interface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const body: GenerateSkillsBody = await req.json()
        const { jobTitle, experienceLevel } = body
        if (!jobTitle || !experienceLevel) return NextResponse.json<IResponse>({
            success: false,
            message: "All fields are required",
        })

           const prompt = `
            You are an ATS optimization specialist.
            
            Generate technical skills for the following role.
            
            Job Title:
            ${jobTitle}
            
            Experience Level:
            ${experienceLevel}
            
            CRITICAL OUTPUT INSTRUCTIONS:
            
            - Return ONLY a valid JSON array.
            - Do NOT wrap the array in quotes.
            - Do NOT return an object.
            - Do NOT return markdown.
            - Do NOT use \`\`\`json code blocks.
            - Do NOT add explanations, notes, headings, or introductory text.
            - The response must start with "[" and end with "]".
            - Every item must be a string.
            - Include only technical skills.
            - Exclude all soft skills.
            - Generate 15-25 relevant technical skills.
            - Remove duplicates.
            
            Valid Example:
            
            [
              "JavaScript",
              "TypeScript",
              "React.js",
              "Node.js",
              "MongoDB"
            ]
            
            Invalid Example:
            
            {
              "skills": [
                "JavaScript",
                "React.js"
              ]
            }
            
            Invalid Example:
            
            "[
              \\"JavaScript\\",
              \\"React.js\\"
            ]"
            
            Output:
            Return ONLY the raw JSON array.
            `;

            
        let response = await GenerateResponse(prompt);
           if (typeof response === "string") {
            try {
                response = JSON.parse(response);
            } catch (err) {
                console.error("Failed to parse skills:", err);
            }
        }
        const skills = response;

        return NextResponse.json<IResponse>({
            success: true, message: "Summary created", data: {
                skills
            }
        }, {
            status: 201
        })
    } catch (error) {
        console.log("error in Generate skills api", error);
        return NextResponse.json<IResponse>(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}