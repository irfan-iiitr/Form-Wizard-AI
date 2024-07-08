"use client";
import { Button } from '/components/ui/button'

import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

function Header() {
    const {user,isSignedIn}=useUser();
    const path=usePathname();
    useEffect(()=>{
      //console.log(path);
    },[])
  return !path.includes('aiform')&&  (
    <div className='p-3 border-b shadow-sm '>
         <div className='flex item-center  justify-between'>
          <div className='flex items-center justify-center'>
          <Image src={'/logo.svg'} width={50} height={50} alt='logo'></Image>
          <h1 className='text-3xl ml-3 '><strong><pre>Form Wizard</pre></strong></h1>
          </div>
            
            
            {
                isSignedIn?
                <div className='flex items-center gap-6' >
                    <Link href={'/dashboard'}><Button variant='outline' size='sm'>Dashboard</Button></Link>
                    <UserButton></UserButton>
                </div>:
                <SignInButton>
                    <Button>Get Started</Button>
                </SignInButton>
                
            }
         </div>
    </div>
  )
}

export default Header
