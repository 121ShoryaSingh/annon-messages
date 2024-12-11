import {z} from 'zod'
// Validation for username
export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");


export const signUpSchema = z.object({
    username: z
    .string()
    .min(2, "Username must be atleast 2 characters")
    .max(20, " Username must not contain special character")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character"),

    email: z
    .string()
    .email({message: 'Invaild email address'}),
    
    password: z
    .string()
    .min(6, {message: "password must be at least 6 characters"})
})