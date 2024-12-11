import { string, z } from "zod";

export const messageSchame = z.object({
    content: z
    .string()
    .min(10, {message: 'Content must be at least of 10 character'})
    .max(300, {message: 'content must be no longer than 300 character'})

})
