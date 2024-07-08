"use client";

import React, { useEffect, useState } from 'react'
import { db } from '/configs';
import { forms } from '/configs/schema';
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm';
import FormFields from '../../edit-form/[formId]/_components/FormFields';
import Image from 'next/image';
import Link from 'next/link';

function LiveAiForm({params}) {

    const [record,setRecord]=useState();
    const [jsonForm,setJsonForm]=useState([]);


    useEffect(()=>{
        console.log(params);
        params&&getFormData(); //when params get available
    },[params]);
         
    const getFormData = async()=>{
        const result = await db.select().from(forms)
        .where((eq(forms.id,Number(params?.formId))))

        setRecord(result[0]);
        setJsonForm(JSON.parse(result[0].jsonform));
      
       record && console.log(record);
     }
    
  return (

    <div className='p-10 flex justify-center items-center' style={{background:record?.background}}>
    {
        record &&
        <FormFields jsonForm={jsonForm} 
        onFieldUpdate={()=>console.log}
          deleteField={()=>console.log}
          selectedTheme={record?.theme}
         // selectedStyle={JSON.parse(record?.style)} 
         editable={false}
          formId={record?.id}
        ></FormFields>
    }
    <Link className='flex gap-2 items-center bg-black text-white px-2 py-1 rounded-full fixed bottom-5 left-5 cursor-pointer ' 
      href={process.env.NEXT_PUBLIC_BASE_URL}
    > 
        <Image src={'/logo.png'} width={26} height={26} />
        Build Your Own AI Form  
    </Link>
    </div>
  )
}

export default LiveAiForm
