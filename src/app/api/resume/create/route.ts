import { connectToDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import resumeModel from "@/models/resume.model";
import { IResponse } from "@/types/response.interface";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        let title = "Untitled Resume";
        let jobTitle = "";
        let level = "FRESHER";
        let userId: Types.ObjectId | null = null;
        try {
            userId = await getCurrentUser();
            if (!userId) {
                return NextResponse.json<IResponse>({
                    success: false,
                    message: "User not found",
                }, { status: 404 });
            }

            const body = await req.json();
            if (body.jobTitle) jobTitle = body.jobTitle;
            if (body.experienceLevel) level = body.experienceLevel;
            if (body.title) title = body.title;
        } catch (e) {
            console.error("error in creating resume", e)
        }

        const newResume = await resumeModel.create({
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