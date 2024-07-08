"use client";

import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { forms } from '../../../configs/schema';
import { desc, eq } from 'drizzle-orm';
import { db } from '../../../configs/index';
import FormListCards from './FormListCards';

function FormList() {
    const {user} =useUser();
    const [formList,setFormList]=useState([]);
    useEffect(()=>{
        user&&GetFormList();
    },[user]);

    const GetFormList=async ()=>{
      const result= await db.select().from(forms).where(
        eq(forms.createdBy,user?.primaryEmailAddress?.emailAddress)).
        orderBy(desc(forms.id))
      
        setFormList(result);
        console.log("forms list",result);

    }
  return (
    <div className='mt-5 grid grid-cols-2 md:grid-cols-3 gap-5'>
          {
             formList.map((item,index)=>(
                <div>
                     <FormListCards form={JSON.parse(item.jsonform)} 
                     formRecord={item}  refreshData={GetFormList}
                     ></FormListCards>     
                </div>
             ))
          }
    </div>
  )
}

export default FormList
