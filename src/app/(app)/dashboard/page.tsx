'use client'
import { useToast } from '@/hooks/use-toast';
import { Message } from '@/model/user'
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';


const page = () => {
 
  const [messages, setmessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const {toast} = useToast()

  const handleDeleteMessage = (messageId: string) => {
    setmessages(messages.filter((message) => message._id !== messageId))
  }

  const {data: session} = useSession()

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema)
  })

  const {register, watch, setValue} = form;
  const acceptMessage = watch('acceptMessages');
  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get('/api/accept-messages')
      setValue('acceptMessages', response.data.isAccpetingMessage)
    }
    catch(error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: 'Error',
        description: axiosError.response?.data.message || 'failed to fetch message settings',
        variant: "destructive"
      })
    }
  
  },[setValue])
  

  return (
    <div>
      
    </div>
  )
}

export default page