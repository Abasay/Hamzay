import jwt from "jsonwebtoken";
import { Response } from "express";
import dotenv from "dotenv";
import { IAdmin, IRider } from "../models";

dotenv.config();

/**Token expiration in seconds */
const expiresIn = Number(process.env.JWT_EXPIRES_IN) * 3600;
const secretKey = process.env.JWT_SECRET as string;

/** Generate and sign a token for the user on successful login */
export function signToken<T extends IAdmin | IRider>(user: T) {
    const jwtPayload: any = { id: user.id, role: user.role };
    return jwt.sign(jwtPayload, secretKey, { expiresIn });
}

/** Verify the token sent by the user and returns the decoded token */
export function verifyToken(token: string) {
    return jwt.verify(token, secretKey) as jwt.JwtPayload;
}

/** Attach the token to the authorization headers and save in cookies*/
export function attachToken(token: string, res: Response) {
    res.setHeader("Authorization", `Bearer ${token}`);
    res.cookie("token", token, { maxAge: expiresIn * 1000, httpOnly: true });
}

/** Remove the token from the authorization headers and cookies */
export function removeToken(res: Response) {
    res.setHeader("Authorization", "");
    res.clearCookie("token");
}
