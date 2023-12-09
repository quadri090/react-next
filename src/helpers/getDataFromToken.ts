import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const encodedToken = request.cookies.get("token")?.value || ""; //gets current user token
        const decodedToken: any = jwt.verify(encodedToken, process.env.TOKEN_SECRET!); //verifies token, decodes token using TOKEN_SECRET and extracts token data as a response of the function
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message)
    }
}