"use client";

import { db } from '/configs';
import { forms } from '/configs/schema';
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm';
import { ArrowLeft, Share2, SquareArrowOutUpRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import FormFields from './_components/FormFields';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"
import Controller from './_components/Controller';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { RWebShare } from 'react-web-share';


function page({params}) {
  const router = useRouter();
    const {user}= useUser();
    const [jsonForm,setJsonForm]=useState([]);
    const [updateTrigger,setUpdateTrigger]=useState();
    const [record,setRecord]=useState([]);
    const [selectedTheme,setSelectedTheme]=useState('light');
    const [selectedBackground,setSelectedBackground]=useState();

    useEffect(()=>{
        user && getFormData();
    },[user]);

    const getFormData = async()=>{
        const result = await db.select().from(forms)
        .where(and(eq(forms.id,params?.formId),eq(forms.createdBy,user?.primaryEmailAddress?.emailAddress)))

        
        setJsonForm(JSON.parse(result[0].jsonform));
        //console.log(JSON.parse(result[0].jsonform));
        setRecord(result[0]);
        setSelectedBackground(result[0].background); 
            }

            useEffect(()=>{
              if(updateTrigger){
                setJsonForm(jsonForm);
                updateJsonFormInDb();
              }
            },[updateTrigger]);

            const updateJsonFormInDb=async()=>{
              const result=await db.update(forms).set({
                jsonform:JSON.stringify(jsonForm)
              }).where(and(eq(forms.id,record.id),eq(forms.createdBy,user?.primaryEmailAddress?.emailAddress)))

              toast('Form Updated ');
              console.log("Updated Form",result);
            }



      const onFieldUpdate=(value,index)=>{
               console.log("Field Update",value," ",index);
              jsonForm.fields[index].label=value.label;
              jsonForm.fields[index].placeholder=value.placeholder;
              setUpdateTrigger(Date.now());
          }

          const handleBack = () => {
            router.back();
          };

          const deleteField=(indexToDelete)=>{
            const result =jsonForm.fields.filter((item,index)=>index!=indexToDelete);
 
            jsonForm.fields=result;
            setUpdateTrigger(Date.now());
            console.log(jsonForm.fields);
          }

          const updateControllerFields= async (value,columnName)=>{
            const result =await db.update(forms).set({
              [columnName]:value
            }).where(and(eq(forms.id,record.id),eq(forms.createdBy,user?.primaryEmailAddress?.emailAddress))).returning({id:forms.id});
            toast(' Updated !!!! ');
            console.log("Updated",result);
          }

  return (
    <div className='p-10'>
    <div className='flex justify-between items-center'>
    <h2 className='flex gap-2 items-center my-5 cursor-pointer
        hover:font-bold    ' onClick={handleBack} >
        <ArrowLeft/> Back
      </h2>
       <div className='flex gap-3'>
        <Link href={'/aiform/'+record?.id} target='_blank'>
        <Button className="flex gap-2"><SquareArrowOutUpRight/> Live Preview</Button>
        </Link>
        <RWebShare
        data={{
          text: record?.form_subheading + "Build Your forms in Seconds",
          url: process.env.NEXT_PUBLIC_BASE_URL+"/aiform/" +record?.id,
          title: record.form_title,
        }} 
        sites={["facebook", "twitter", "linkedin", "whatsapp"]}
        onClick={() => console.log("shared successfully!")}
      >
                   <Button className="flex gap-2 bg-green-500 hover:bg-green-700"><Share2 className='h-5'></Share2>Share</Button>
      </RWebShare>


    
       </div>
    </div>
        <div className='grid grid-cols-1 md:grid-cols-3  gap-5 '>
              <div className='p-5 border rounded-lg shadow-md'>
                <Controller selectedTheme={(value)=>{updateControllerFields(value,'theme'); setSelectedTheme(value)}} 
                selectedBackground={(value)=>{updateControllerFields(value,'background');setSelectedBackground(value)}}>
                </Controller>
              </div> 

              <div className='md:col-span-2  p-5 rounded-lg border flex items-center justify-center  '  style={{background:selectedBackground}}>
                 <FormFields jsonForm={jsonForm} onFieldUpdate={onFieldUpdate}  
                 deleteField={(index)=>deleteField(index)} selectedTheme={selectedTheme} ></FormFields>
              </div>
        </div>
    </div>
  )
}

export default page
