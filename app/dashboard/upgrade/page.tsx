"use client";
import React from 'react'
import PricingPlan from '../../_data/PricingPlan';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

function page() {
    const {user} = useUser();
  return (
    <div className='p-10'>
      <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
    {
         PricingPlan?.map((item,index)=>(
              <div className='lg:w-24'>

<div key={index} className="rounded-lg border lg:w-36 border-red-600 p-6 shadow-sm ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:p-12">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900">
         {item.duration}
         
        </h2>

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> {item.price}$ </strong>

          <span className="text-sm font-medium text-gray-700">/{item.duration}</span>
        </p>
      </div>

      <ul className="mt-6 space-y-2 items-center justify-between">
        <li className="flex items-center gap-1">
         <div className='h-10 w-10'>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
           
            stroke="currentColor"
            className=" text-indigo-700 size-5" 
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
         </div>

          <span className="text-gray-700"> 10 users included </span>
        </li>

        <li className="flex items-center gap-1">
        <div className='h-10 w-10'>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
           
            stroke="currentColor"
            className=" text-indigo-700 size-5" 
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
         </div>

          <span className="text-gray-700"> 2GB of storage </span>
        </li>

        <li className="flex items-center gap-1">
        <div className='h-10 w-10'>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
           
            stroke="currentColor"
            className=" text-indigo-700 size-5" 
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
         </div>

          <span className="text-gray-700"> Email support </span>
        </li>

        <li className="flex items-center gap-1">
        <div className='h-10 w-10'>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
           
            stroke="currentColor"
            className=" text-indigo-700 size-5" 
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
         </div>

          <span className="text-gray-700"> Help center access </span>
        </li>
      </ul>

      <Link
        href={item?.link+'?prefilled_email='+user?.primaryEmailAddress.emailAddress}
        target='_blank'
        className="mt-8 block rounded-full border hover:bg-slate-600 border-indigo-600 w-14 bg-white px-6 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
      >
        Get Started
      </Link>
    </div>

                </div>

         
         ))
    }

    
  </div>
</div>
    </div>
  )
}

export default page
