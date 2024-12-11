import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs"

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

export async function POST(req: Request) {
    await dbConnect()

    try {
        const {username, email, password} = await req.json()
        
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        })

        if(existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, 
            {
                status: 400
            })
        }
        
        const existingUserByEmail = await UserModel.findOne({email})

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        
        if(existingUserByEmail) {
            if(existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User Already exist with this email"
                }, {status: 400})
            }
            else {
                const hasedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hasedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()
            }
        }
        else {
            const hasedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hasedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            
            })

            await newUser.save()
        }

        const emailResponse = await sendVerificationEmail({
            email,
            username,
            verifyCode
        })

        if(emailResponse.success) {
            return Response.json({
                success: true,
                message: emailResponse.message,
            }, {status: 200})
        }
        return Response.json({
            success: true,
            message: "user registered successfully. Please verify you email."
        }, {status: 201})
    }
    
    
    catch  (err) {
        console.error('Error Registering User', err)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )
    }

}