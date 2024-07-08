
import React from 'react'
import CreateFormDialog from './CreateFormDialog'
import FormList from './_components/FormList'

function page() {
  return (
    <div className='p-10'>
         <h2 className='font-bold text-3xl flex items-center justify-between'>
            Dashboard
            <CreateFormDialog></CreateFormDialog>
         </h2>

         {/* List of Forms */}

         <FormList></FormList>
    </div>
  )
}

export default page
