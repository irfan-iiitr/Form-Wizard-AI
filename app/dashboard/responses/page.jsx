"use client";

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { db } from '/configs';
import { forms } from '/configs/schema';
import { eq } from 'drizzle-orm';
import ResponseItem from '../responses/_components/ResponseItem';


function Responses() {
    const {user}=useUser();
    const [formList,setFormList]=useState();

    useEffect(()=>{
        user&&getFormData();
    
    },[user]);

    const getFormData = async()=>{
        const result = await db.select().from(forms)
        .where((eq(forms.createdBy,user?.primaryEmailAddress?.emailAddress)))

        console.log(result);
        setFormList(result);
     }

  return (
    <div className='p-10'>
         <h2 className='font-bold text-3xl flex items-center justify-between'>
            Responses
         </h2>

         <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
         {
            formList?.map((item,index)=>(
              
               <ResponseItem formRecord={item} jsonForm={JSON.parse(item.jsonform)}></ResponseItem>
            ))
         }
         </div>
    </div>
  )
}

export default Responses
