import { JWTPayload } from "@/types/user.interface";
import jwt from "jsonwebtoken"

export const generateToken = (payload: JWTPayload): string => {
    return jwt.sign(payload, process.env.JWT_TOKEN!, {
        expiresIn: "1h"
    })
}

export const verifyToken = (token: string): unknown => {
    return jwt.verify(token, process.env.JWT_TOKEN!)
}
