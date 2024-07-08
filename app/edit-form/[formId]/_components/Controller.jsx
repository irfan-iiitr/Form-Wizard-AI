"use client";
import React, { useState }  from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../../../components/ui/select"
  import Themes from '../../../_data/Themes'
  import GradiantBg from '../../../_data/GradiantBg'
import { Button } from '../../../../components/ui/button';
import { Checkbox } from '../../../../components/ui/checkbox';
  

function Controller({selectedTheme,selectedBackground}) {
  // console.log(GradiantBg);
  const [showMore,setShowMore] = useState(6);

  return (
    <div >
        <h2 className='my-1'>Select Themes</h2>

        <Select onValueChange={(value)=>selectedTheme(value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>

              {
                Themes.map((item,index) =>{
                  return(
                    <SelectItem key={index} value={item.theme}>
                      <div className='flex gap-3'>
                       <div className='flex'>
                       <div className='h-5 w-5 rounded-l-md' style={{background:item.primary}}> </div>
                        <div className='h-5 w-5' style={{background:item.secondary}}> </div>
                        <div className='h-5 w-5' style={{background:item.accent}}> </div>
                        <div className='h-5 w-5 rounded-r-md' style={{background:item.neutral}}> </div>
                       </div>
                       {item.theme}
                      </div>
                    </SelectItem>
                  )
                })
              }
                
            </SelectContent>
        </Select>

          

          {/* Background Selection collector */}

          <h2 className='mt-8 my-1'>Background</h2>
          <div className='grid grid-cols-3 gap-5'>
            {
              GradiantBg.map((bg,index)=>( index<showMore )&& (
        
                
                <div className='w-full h-[50px] rounded-lg hover:border-black hover:border-2 cursor-pointer flex items-center justify-center '
                 key={index} style={{background:bg.gradient}} onClick={()=>selectedBackground(bg.gradient)} >
                    {index==0 && 'None'}
                </div>
               
              ))
            }
          
          </div>
          <Button onClick={()=>setShowMore(showMore>6?6:20)} variant="ghost" size="sm"  className="w-full my-1 cursor-pointer"  >
            {showMore>6?'Show Less':'Show More'}
            </Button>
{/* 
            <div className='flex gap-2 my-4 mt-10 items-center'>

              <Checkbox></Checkbox>
              <h2>Enable Social Authentication Before Submission </h2>
            </div> */}
    </div>
  )
}

export default Controller
