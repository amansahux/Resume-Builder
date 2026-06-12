import { connectToDatabase } from "@/lib/db";
import { generateToken } from "@/lib/jwt";
import userModal from "@/models/user.model";
import { IResponse } from "@/types/response.interface";
import { LoginBody } from "@/types/user.interface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase()
        const body: LoginBody = await req.json()
        const { email, password } = body
        if (!email || !password) {
            return NextResponse.json<IResponse>({
                success: false,
                message: "All fields are required",

            }, { status: 400 })
        }

        const isExisted = await userModal.findOne({ email });
        if (!isExisted) {
            return NextResponse.json<IResponse>({
                success: false,
                message: "Invalid credentials"
            }, { status: 401 })
        }
        const isMatchPass = await isExisted.comparePassword(password)
        if (!isMatchPass) {
            return NextResponse.json<IResponse>({
                success: false,
                message: "Invalid credentials"
            }, { status: 401 })
        }
        const token = generateToken({ userId: isExisted._id.toString() })

        const response = NextResponse.json<
            IResponse<{
                name: string;
                email: string;
                mobile: string;

            }>
        >({
            success: true,
            message: "user LoggesIn successfully",
            data: {
                name: isExisted.name,
                email: isExisted.email,
                mobile: isExisted.mobile
            }
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 
        })
        return response
    } catch (error) {
        console.error(error);

        return NextResponse.json<IResponse>({
            success: false,
            message: "Internal server error",
        }, {
            status: 500,
        });
    }
}