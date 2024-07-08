import React from 'react'
import { Button } from '../../../components/ui/button';
import { Edit, Share, Trash } from 'lucide-react';
import Link from 'next/link';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../../../components/ui/alert-dialog"
import { useUser } from '@clerk/nextjs';
import { db } from '../../../configs';
import { forms } from '../../../configs/schema';
import { toast } from 'sonner';
import { and, eq } from 'drizzle-orm';
import { RWebShare } from 'react-web-share';
  

function FormListCards({form,formRecord,refreshData}) {
    // console.log("form item",form);
    const {user}=useUser();
    const onDeleteForm=async()=>{
         const result= await db.delete(forms).where(
            and(eq (forms.id,formRecord.id),eq(forms.createdBy,user?.primaryEmailAddress?.emailAddress))
         );

         if(result){
            toast('Form Deleted');
            refreshData();
         }
    }




  return (
    <div className='border shadow-sm rounded-lg p-4 '>
       
        <div className='flex justify-between'>
            <h2>

            </h2>
           
            <AlertDialog asC>
                <AlertDialogTrigger> <Trash className='h-5 w-5 text-red-600 cursor-pointer hover:scale-110 transition-all'></Trash></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>onDeleteForm()}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>

            <div className='h-20 overflow-hidden'>
            <h2 className='text-lg'>  {form?.form_title}</h2>
            <h2 className='text-sm text-gray-500'> {form?.form_subheading} </h2>   
            </div>
      
      <hr className='my-4'></hr>
      <div className='flex justify-between'>
        {/* share button */}
        <RWebShare
        data={{
          text: form?.form_subheading + "Build Your forms in Seconds",
          url: process.env.NEXT_PUBLIC_BASE_URL+"/aiform/" +formRecord?.id,
          title: form.form_title,
        }} 
        sites={["facebook", "twitter", "linkedin", "whatsapp"]}
        onClick={() => console.log("shared successfully!")}
      >
                <Button className="flex gap-2" variant="outline" size="sm"> <Share className='h-5 w-5'></Share>Share </Button>
      </RWebShare>

        <Link href={'/edit-form/' +formRecord?.id}>
             <Button className="flex gap-2" size="sm" >  <Edit className='h-5 w-5'></Edit>Edit </Button>
        </Link>
        
      </div>
    
     
    </div>
  )
}

export default FormListCards
