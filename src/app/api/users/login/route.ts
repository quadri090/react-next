import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"


connect()

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        //check if user exists on mongoDB database using the email as search parameter
        const user = await User.findOne({email}); //mongoose findOne() function is checking the Mongoose User Schema for a user that matches the provided email

        console.log(user);

        if(!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 404});
        };
        
        //check if the password is correct using bcryptjs to compare hashed password and user provided password
        const validPassword = await bcryptjs.compare(password, user.password);

        console.log(validPassword);

        //if password is incorrect
        if(!validPassword) {
            return NextResponse.json({error: "Invalid Password"}, {status : 400})
        };
        
        console.log(!validPassword)

        //create token data
        const tokenData = {
            id: user._id, 
            username: user.username,
            email: user.email
        }
        console.log(tokenData)

        //create token using jsonwebtoken. parameters include thee tokenData, the TOKEN_SECRET
        const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "2 days" });
        console.log(token)

        const response = NextResponse.json({
            message: "Login succesfull",
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}