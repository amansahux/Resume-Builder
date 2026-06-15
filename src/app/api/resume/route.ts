import { connectToDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import resumeModel from "@/models/resume.model";
import { IResponse } from "@/types/response.interface";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const userId = await getCurrentUser();
        if (!userId) {
            return NextResponse.json<IResponse>(
                {
                    success: false,
                    message: "User not authenticated",
                },
                { status: 401 }
            );
        }

        const resumes = await resumeModel.find({ user_id: userId }).sort({ updatedAt: -1 });

        return NextResponse.json<IResponse>(
            {
                success: true,
                message: "Resumes fetched successfully",
                data: resumes,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("error in GET user resumes api", error);
        return NextResponse.json<IResponse>(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}
