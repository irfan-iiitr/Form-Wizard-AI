"use client";

import { SignedIn } from '@clerk/nextjs';
import React  from 'react'
import SideNav from './_components/SideNav';

function DashboardLayout({children}) {
  return (
  
        <SignedIn>

            <div className=' flex '> 
                {/* sidenav bar fixed with  a sidenav */}
                <div className='md:w-64 bg-white'>
                    <SideNav></SideNav>
                </div>

                <div className='flex-1  bg-white'>
                    {children}
                </div>


            </div>
       
        </SignedIn>
   
  )
}

export default DashboardLayout
