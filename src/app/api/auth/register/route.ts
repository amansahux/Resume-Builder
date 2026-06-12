import { connectToDatabase } from "@/lib/db";
import { generateToken } from "@/lib/jwt";
import userModal from "@/models/user.model";
import { IResponse } from "@/types/response.interface";
import { RegisterBody } from "@/types/user.interface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase()
        const body: RegisterBody = await req.json()
        const { name, email, password, mobile } = body
        if (!name || !email || !password || !mobile) {
            return NextResponse.json<IResponse>({
                success: false,
                message: "All fields are required",

            }, { status: 400 })
        }

        const isExisted = await userModal.findOne({
            $or: [
                { email },
                { mobile }
            ]
        });
        if (isExisted) {
            return NextResponse.json<IResponse>({
                success: false,
                message: "email or moblie already exist"
            }, { status: 409 })
        }

        const registeredUser = await userModal.create({
            name,
            email,
            password,
            mobile
        })
        const token = generateToken({ userId: registeredUser._id.toString(), email: registeredUser.email })

        const response = NextResponse.json<
            IResponse<{
                name: string;
                email: string;
                phone: string;
            }>
        >({
            success: true,
            message: "user registered successfully",
            data: {
                name: registeredUser.name,
                email: registeredUser.email,
                phone: registeredUser.mobile,
            },
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