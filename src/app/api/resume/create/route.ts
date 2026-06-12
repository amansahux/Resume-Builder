import { connectToDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import resumeModel from "@/models/resume.model";
import { IResponse } from "@/types/response.interface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const userId = await getCurrentUser()
        const newResume = await resumeModel.create({
            user_id: userId,
            title: "",
            summary: "",
            personalInfo: {},
            workExperience: [],
            projects: [],
            education: [],
            certifications: [],
            skills: [],
        });

        return NextResponse.json<IResponse>(
            {
                success: true,
                message: "Resume created successfully",
                data: newResume,
            },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json<IResponse>({
            success: false,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : "Unknown error",
        }, { status: 500 })
    }
} 