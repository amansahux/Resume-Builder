import { connectToDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import resumeModel from "@/models/resume.model";
import { IResponse } from "@/types/response.interface";
import { IResume } from "@/types/resume.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const userId = await getCurrentUser();
        if (!userId) {
            return NextResponse.json<IResponse>({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        let title = "Untitled Resume";
        let jobTitle = "";
        let level: "FRESHER" | "MID_LEVEL" | "EXPERIENCED" = "FRESHER";
        try {
            const body = await req.json();
            if (body.jobTitle) jobTitle = body.jobTitle;
            if (body.experienceLevel) level = body.experienceLevel;
            if (body.title) title = body.title;
        } catch (e) {
            console.error("error in creating resume body parsing", e)
        }

        const newResume:IResume = await resumeModel.create({
            user_id: userId,
            title,
            jobTitle,
            level,
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