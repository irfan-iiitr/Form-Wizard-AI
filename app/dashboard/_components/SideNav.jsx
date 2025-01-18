"use-client";

import { Button } from '/components/ui/button';
import { Progress } from '/components/ui/progress';


import { useUser } from '@clerk/nextjs'
import { LibraryBig, LineChart, MessageSquare, Shield } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { forms } from '../../../configs/schema';
import { desc, eq } from 'drizzle-orm';
import { db } from '../../../configs/index';

function SideNav() {

    const menuList =[
        {
            id:1,
            name:'My Forms',
            icon: LibraryBig,
            path:'/dashboard'
        },
        {
            id:1,
            name:'Responses',
            icon: MessageSquare,
            path:'/dashboard/responses'
        },
        {
            id:2,
            name:'Analytics',
            icon: LineChart,
            path:'/dashboard/analytics'
    
        },
        {
            id:3,
            name:'Upgrade',
            icon: Shield,
            path:'/dashboard/upgrade',
        },
    ]
    const {user} =useUser();
    const path=usePathname();
    useEffect(()=>{
        //console.log(path);
        user&&GetFormList();
    },[user]);

    const [formList,setFormList]=useState();
    const [noOfFileCreated,setNoOfFileCreated]=useState();
    
     

    const GetFormList=async ()=>{
        const result= await db.select().from(forms).where(
          eq(forms.createdBy,user?.primaryEmailAddress?.emailAddress)).
          orderBy(desc(forms.id))
        
          setFormList(result);
          console.log("forms list",result);

          const percentageFile=Math.round((result.length/3)*100);
          setNoOfFileCreated(percentageFile);
      }
    


    return (
        <div className='h-screen shadow-md border bg-gray-50 flex flex-col justify-between'>
            <div className='p-4'>
                {menuList.map((menu, index) => {
                    return (
                        <div key={index} className='mr-3'>
                            <Link href={menu.path} key={index} className={`flex mt-2 items-center gap-3 p-4 mb-3 hover:bg-primary hover:text-white rounded-lg
                            cursor-pointer  transition-colors duration-200
                            ${path == menu.path && 'bg-primary text-white'}
                            `}>
                                <menu.icon className='w-5 h-5' />
                                <span className='font-medium'>{menu.name}</span>
                            </Link>
                        </div>
                    )
                })}
            </div>

            {/* bottom part */}
            <div className='p-6 w-full'>
                <Button className='w-full bg-primary text-white hover:bg-primary-dark'>+ Create Form</Button>
                <div className='mt-5'>
                    <Progress value={noOfFileCreated} className='h-2 rounded-full' />
                    <p className='mt-2 text-center'><strong>{formList?.length}</strong> Out of <strong>5</strong> forms Created</p>
                    <p className='mt-2 w-full text-center text-sm text-gray-500'>Upgrade to unlock more features</p>
                </div>
            </div>
        </div>
    )
}

export default SideNav
