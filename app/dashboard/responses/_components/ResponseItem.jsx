"use client";

import React, { useState } from 'react'
import { Button } from '../../../../components/ui/button'
import { db } from '../../../../configs'
import { userResponses } from '../../../../configs/schema'
import { Loader2 } from 'lucide-react';
import { eq } from 'drizzle-orm';
import * as XLSX from 'xlsx';


function ResponseItem({jsonForm,formRecord}) {
  const [loading,setLoading]=useState(false);

    const exportData=async ()=>{
      let jsonData=[];
      setLoading(true);
       const result = await db.select().from(userResponses).
       where(eq(userResponses.formRef,formRecord.id));

       console.log(result);
       if(result){
        result.forEach((item)=>{
             const jsonItem= JSON.parse(item.jsonResponse);
             jsonData.push(jsonItem)
        })
          setLoading(false);
         // console.log(jsonData);
         exportToExcel(jsonData);
       }
    }

    //export to excel

    const exportToExcel=(jsonData)=>{
      const ws = XLSX.utils.json_to_sheet(jsonData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, jsonForm?.form_title+ ".xlsx");
    }
  return (
    <div className='border shadow-sm rounded-lg p-4 my-5'>
       
      <div className='h-16'>
      <h2 className='text-lg'>  {jsonForm?.form_title}</h2>
      <h2 className='text-sm text-gray-500'> {jsonForm?.form_subheading} </h2> 
        </div>  
  <hr className='my-4'></hr>

  <div className='flex justify-between items-center'>
          <h2 className='text-sm'><strong>45</strong> Responses</h2>

          <Button disabled={loading} onClick={()=>exportData()} size="sm" className="">
            {loading?<Loader2 className='animate-spin'></Loader2>:'Export'}
            </Button>
  </div>

 
</div>
  )
}

export default ResponseItem
