"use client";

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "/components/ui/dialog"
  
import { Button } from '/components/ui/button'
import { Textarea } from '/components/ui/textarea'
import { aiModel } from '/configs/aiModal';
import { useUser } from '@clerk/nextjs';
import { db } from '/configs';
import { forms } from '/configs/schema';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

  
const prompt = `,generate a form in JSON format. The form should include a form_title and form_subheading. For each field,
 include the following properties: field_name, placeholder, label, field_type, and required. 
 Ensure the response excludes anything except the JSON object, starting with { and ending with }.`


function CreateFormDialog() {
    const [userInput,setUserInput]=useState();
    const [loading,setLoading]=useState(false);
    const {user}=useUser();
    const route=useRouter();

    const createForm = async() => {
        console.log("Create Form",userInput);
        setLoading(true);
       const result= await aiModel.sendMessage("Based on this user's description : "+userInput+prompt);
       const jsonResponse=JSON.parse((result.response.text()).replace('```json', '').replace('```', ''));
       if(result.response.text()){
        const resp=await db.insert(forms).values({
            jsonform:jsonResponse,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD/MM/yyyy')
        }).returning({id:forms.id});
        console.log("Form Created",resp[0].id);

        if(resp[0].id){
            route.push('/edit-form/' + resp[0].id);
        }
        setLoading(false);
       }
       setLoading(false);

    };
  return (
    <>
        <Dialog>
            <DialogTrigger asChild><Button>+Create Form</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create New Form</DialogTitle>
                <DialogDescription>
                   <Textarea className="my-2 text-black" placeholder="Write decription of Your form"  
                      onChange={(e)=>setUserInput(e.target.value)} >
                   </Textarea>
                   <div className='flex gap-2 my-3 justify-end'>
                       {/* <Button variant="destructive">Cancel</Button> */}
                       <Button disabled={loading} onClick={()=>createForm()}>
                          {loading? <Loader2 className='animate-spin'></Loader2>:'Create' }
                       </Button>
                   </div>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
       </Dialog>
    </>
  )
}

export default CreateFormDialog
