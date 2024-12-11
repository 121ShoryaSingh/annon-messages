import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentails",
            name: "Credentails",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "" },
                password: { label: "Password", type: "password", placeholder: "" }
              },
              async authorize(credentails: any): Promise<any> {
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            {email: credentails.identifier},
                            {username: credentails.identifier}
                        ]
                    })
                    if(!user?.isVerified) {
                        throw new Error('No user found with this email')

                    }
                    const isPasswordCorrect = await bcrypt.compare(credentails.passwowrd, user.password) 
                    if(isPasswordCorrect) {
                        return user
                    }
                    else
                    {
                        throw new Error('Incorrect Password')
                    }
                }
                catch (error) {
                    console.error("Authorization error:", error);
                    throw new Error("Unable to authorize user.");
                }
              }
        })
    ],

    callbacks: {
        async session({ session, token }) {
            if(token) {
                session.user._id = token._id
                session.user.isVerified = token.isVerfied
                session.user.isAcceptingMessage = token.isAcceptingMessages
                session.user.username = token.username
            }
            return session
          },
        async jwt({ token, user }) {
            if(user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerfied;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            return token
          }
    },

    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,

}