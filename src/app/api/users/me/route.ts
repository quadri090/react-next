import { getDataFromToken } from "@/helpers/getDataFromToken";
import {NextRequest, NextResponse} from 'next/server';
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect()//mongoose

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password"); //mongoose Schema.finOne() function returns all the data of the user matching the search parameter()  .....  .select(-password -isAdmin) means we dont want the users password and isAdmin status returned
        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}