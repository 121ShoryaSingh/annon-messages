'use client'
import { useToast } from '@/hooks/use-toast'
import { verifySchema } from '@/schemas/verifySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z  from 'zod'
import axios, { AxiosError } from 'axios'
import { ApiResonse } from '@/types/ApiResponse'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const VerifyAccount = () => {
    const router = useRouter()
    const Param = useParams<{username: string}>()
    const {toast} = useToast()

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try{
            const response = await axios.post('/api/verifSSy-code',{
                username: Param.username,
                code: data.code
            })
            toast({
                title: 'Success',
                description: response.data.message
            })
            router.replace('/dashboard')
        }
        catch(error) {
            console.error("Error in Signup or user", error)
            const axiosError = error as AxiosError<ApiResonse>;
            toast({
                title: "failed",
                description: axiosError.response?.data.message,
                variant: "destructive"
            })
        }
    }
    return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
        <div className='text-center'>
            <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
                Verfiy Your Account
            </h1>
        </div>
        <p className='mb-4'>Enter the verifation code sent to your email</p>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                    <Input placeholder="Code" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit">Submit</Button>
        </form>
        </Form>
      </div>
    </div>
  )
}

export default VerifyAccount
