import { connectToDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import userModal from "@/models/user.model";
import { IResponse } from "@/types/response.interface";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const userId = await getCurrentUser();
        const user = await userModal.findById(userId).select("-password");
        if (!user) {
            return NextResponse.json<IResponse>({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }
        return NextResponse.json<IResponse>({
            success: true,
            message: "User fetched successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile
            }
        });
    } catch (error) {
        return NextResponse.json<IResponse>({
            success: false,
            message: "Unauthorized"
        }, { status: 401 });
    }
}
