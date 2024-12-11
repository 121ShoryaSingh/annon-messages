import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResonse } from "@/types/ApiResponse";

interface props {
    email: string,
    username: string,
    verifyCode: string,
}

export async function sendVerificationEmail({email, username, verifyCode }: props): Promise<ApiResonse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification code',
            react: VerificationEmail( {username, otp: verifyCode}),
          });
        return {success: true, message: 'Verification Email send successfully'}
    }
    catch (emailError) {
        console.error("Error sending verification Email", emailError)
        return {success: false, message: 'Failed to send verifation email'}
    }
}
