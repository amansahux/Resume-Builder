import { connectToDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import resumeModel from "@/models/resume.model";
import { IResponse } from "@/types/response.interface";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ resumeid: string }> }) {

    try {
        await connectToDatabase()

        const userId = await getCurrentUser()
        const { resumeid } = await params

        const resume = await resumeModel.findOne({ _id: resumeid, user_id: userId });
        if (!resume)
            return NextResponse.json<IResponse>(
                {
                    success: false,
                    message: "Resume not found",
                },
                { status: 404 }
            );

        return NextResponse.json<IResponse>(
            {
                success: true,
                message: "Resume fetched successfully",
                data: resume,
            },
            { status: 200 }
        );

    } catch (error) {
        console.log("error in GET Resume api", error);
        return NextResponse.json<IResponse>(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }


}
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ resumeid: string }> }) {
    try {
        await connectToDatabase()

        const userId = await getCurrentUser()
        const { resumeid } = await params
        const body = await req.json();
        const updatedResume = await resumeModel.findOneAndUpdate(
            {
                _id: resumeid,
                user_id: userId,
            },
            {
                $set: body,
            },
            {
                new: true,
                runValidators: true,
            }
        );
        if (!updatedResume)
            return NextResponse.json<IResponse>(
                {
                    success: false,
                    message: "Resume not found",
                },
                { status: 404 }
            );
        return NextResponse.json<IResponse>(
            {
                success: true,
                message: "Resume Updated successfully",
                data: updatedResume,
            },
            { status: 200 }
        );

    } catch (error) {
        console.log("error in UpdatingResume api", error);
        return NextResponse.json<IResponse>(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ resumeid: string }> }) {
    try {
        await connectToDatabase()

        const userId = await getCurrentUser()
        const { resumeid } = await params
        await resumeModel.deleteOne(
            {
                _id: resumeid,
                user_id: userId,
            }
        );
        return NextResponse.json<IResponse>(
            {
                success: true,
                message: "Resume Updated successfully",
            },
            { status: 200 }
        );
    } catch (error) {

    }

}