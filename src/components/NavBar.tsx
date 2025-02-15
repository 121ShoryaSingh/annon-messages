"use client"
import React from 'react'
import Link from 'next/link'
import {useSession, signOut} from 'next-auth/react'
import { User } from 'next-auth'
import { Span } from 'next/dist/trace'
import { Button } from './ui/button'

const NavBar = () => {

  const {data: session} = useSession()

  const user:User = session?.user

  return (
    <nav className='p-4 md:p-6 shadow-md'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <a href="#" className='text-xl font-bold mb-4 md:b+mb-0'>Mystry Message</a>
        {
            session ? (<>
            <span className='mr-4'>Welcome, {user.username || user.email}</span>
            <Button onClick={() => {signOut()}}>Logout</Button>
            </>
        ) : (
            <Link href='/sign-in'>
                <Button className='w-full md:w-auto'>Login</Button>
            </Link>
        )
        }
      </div>
    </nav>
  )
}

export default NavBar