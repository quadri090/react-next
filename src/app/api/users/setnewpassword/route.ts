import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token, password} = reqBody;
        console.log(`${token} \n ${password}`)

        const user = await User.findOne({forgotPasswordToken: token});

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user)

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        user.password = hashedPassword
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({message: "Password reset successful", success: true})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}