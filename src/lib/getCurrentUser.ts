import { cookies } from "next/headers"
import { verifyToken } from "./jwt"
import { Types } from "mongoose"

export const getCurrentUser = async ():Promise<Types.ObjectId | null> => {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if (!token) return null;
    const decode = verifyToken(token)
    if (!decode) return null;
     return decode.userId
}