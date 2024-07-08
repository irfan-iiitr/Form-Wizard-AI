"use client";

import React, { useRef, useState } from 'react'
import {Input} from '../../../../components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../../../components/ui/select"

import { Label } from "../../../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group"
import { Checkbox } from '../../../../components/ui/checkbox';
import FieldEdit from './FieldEdit'
import { Button } from '../../../../components/ui/button';
import { db } from '/configs';
import { userResponses } from '../../../../configs/schema';
import { toast } from 'sonner';
import moment from 'moment';
  

function FormFields({jsonForm,onFieldUpdate,deleteField,selectedTheme,editable=true,formId=0}) {
    // console.log("i",jsonForm);
    let formRef=useRef();

    const [formData,setFormData] =useState();

    const handleInputChange=(event)=>{
        const {name,value}=event.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const handleSelectChange=(name,value)=>{
        setFormData({
            ...formData,
            [name]:value
        })
      }

    const onFormSubmit =async (event)=>{
        event.preventDefault();
        console.log("formData on submit",formData);

        const result =await db.insert(userResponses).values({
          jsonResponse:formData,
          createdAt:moment().format('DD/MM/YYYy'),
          formRef:formId
        })
        console.log("resut",result);
        if(result){
          formRef.reset();
          toast('success','Form Submitted Successfully')  
        }
        else{
          toast('Internal Server Error');
        }
    }

    const handleCheckboxChange = (fieldName,itemName,value)=>
    {
       const list =formData?.[fieldName]?formData?.[fieldName]:[];
       if(value){
        list.push({
          label:itemName , value:value
        })
        setFormData({
          ...formData, [fieldName]:list
        })
       }
       else{
        const result =list.filter((item)=>item.label==itemName);
        setFormData({
          ...formData,[fieldName]:result
        })
       }
    }

  return (
    <form ref={(e)=>formRef=e} className='border p-5 md:w-[600px]' data-theme={selectedTheme} onSubmit={onFormSubmit}>
      
      <h2 className='font-bold text-center text-2xl'>
        {jsonForm?.form_title}
      </h2>

      <h2 className='text-sm text-gray-400'>
        {jsonForm?.form_subheading}
      </h2>
        

        {
            jsonForm?.fields?.map((field,index)=>{
                return (
                    <div key={index} className='flex items-center gap-2'>
                        {
                            field.field_type=='select' ? 
                           <div className='w-full my-3'>
                                  <Select required={field.required} onValueChange={(v)=>handleSelectChange(field.field_name,v)}>
                                  <label className='text-xs text-gray-500'>{field.label}</label>
                                    <SelectTrigger>
                                    <SelectValue>
                                        {field.label}
                                    </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                    {
                                        field.options.map((option,index)=>{
                                            return (
                                                <SelectItem value={option} key={index}>
                                                    {option}
                                                </SelectItem>
                                            )
                                        })
                                    }
                                    </SelectContent>
                                </Select>
                           </div>: field.field_type=='radio'?<div className='w-full my-3'>
                                            <RadioGroup defaultValue="option-one"  required={field.required}>
                                                      <label className='text-xs text-gray-500'>{field.label}</label>
                                                      {
                                                        field.options.map((option,index)=>{
                                                            return (
                                                                <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value={option.label} key={index} onClick={()=>handleSelectChange(field.field_name,item.label)} />
                                                                <Label htmlFor={option.label}>{option.label}  </Label>
                                                            </div>
                                                            )
                                                        })
                                                    }
                                                    
                                            </RadioGroup>

                             </div>
                           : field.field_type=='checkbox'?<div className='w-full   my-3'>
                                           <label>{field?.label}</label>
                                           {
                                           field?.options? field?.options?.map((item,index)=>{
                                               <div className='flex gap-2 items-center'>
                                                <Checkbox onCheckedChange={(v)=>handleCheckboxChange(field.label,item.label,v)} name={item.label} key={index} />
                                                  <h2>{item.label}</h2>

                                                </div>
                                            }):<div className='flex gap-2 items-center'>
                                                <Checkbox name={field.label} />
                                                <h2>{field.label}</h2>
                                            </div>
                                           }
                                </div>
                                :
                        
                              <div className='my-3 w-full '>

                                <label className='text-xs text-gray-500'>{field.label}</label>

                              <Input   required={field.required} type={field.field_type} placeholder={field.placeholder}  name={field.field_name} className="bg-transparent" onChange={(e)=>handleInputChange(e)} >
                              </Input>

                              </div>
                                     }

                                {
                                  editable && <div>
                                  <FieldEdit defaultValue={field} onUpdate={(value)=>onFieldUpdate(value,index)} deleteField={()=>deleteField(index)}></FieldEdit>
                                           </div>
                                }
                       
                          
                    </div>
                )
            })
        }

       
        <Button type="submit" className="btn btn-primary">Submit</Button>

    </form>
  )
}

export default FormFields
