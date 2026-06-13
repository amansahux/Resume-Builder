import { NextResponse } from "next/server";
import { IResponse } from "@/types/response.interface";

export async function POST() {
    try {
        const response = NextResponse.json<IResponse>({
            success: true,
            message: "Logged out successfully"
        });
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: "lax",
            path: "/"
        });
        return response;
    } catch (error) {
        return NextResponse.json<IResponse>({
            success: false,
            message: "Failed to logout"
        }, { status: 500 });
    }
}
