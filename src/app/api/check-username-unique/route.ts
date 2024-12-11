import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import {z} from "zod"

import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchemas = z.object({
    username: usernameValidation,
})

export async function GET(request:Request) {

    await dbConnect()
    try{
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username: searchParams.get("username")
        }
        //validation with zod
        const result = UsernameQuerySchemas.safeParse(queryParam)
        console.log(result) //todo remove

        if(!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(',') : 'invalid query parameters',
            },{status: 400})
        }
        const {username} = result.data

        const existingVerifiedUser = await UserModel.findOne({username, isVerified: true})

        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: 'Username is already taken.',
            },{status: 400})   
        }
        return Response.json({
            success: true,
            message: 'Username is unique',
        },{status: 400})
    }
    catch(error) {
        console.log("Error check username", error)
        return Response.json(
            {
                success: false,
                message: "error checking username",
            },
            {
                status: 500
            }
    )
    }
}
