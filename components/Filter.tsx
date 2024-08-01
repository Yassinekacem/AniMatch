import React from 'react'
import { Button } from './ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

const Filter = () => {
  return (
    <div className='h-screen shadow-xl shadow-slate-400 w-[350px] mr-4'>
         <div className='flex items-center justify-between'>
             <Button className='text-pink-400 bg-white hover:bg-white'>
                  Fillters
             </Button>
             <Button className='text-gray-400 bg-white hover:bg-white'>
                 Reset Fillters
             </Button>
         </div>
         <hr  className='border-1 border-gray-400 w-[90%] mx-auto'/>
         <div className='flex flex-col gap-4 w-full mt-4'>
         <Select >
            <SelectTrigger className="w-[90%] mx-auto ">
                <SelectValue placeholder="Breed" />
            </SelectTrigger>
            <SelectContent className='mb-5'>
                    <SelectItem value="germanShepherd">German Shepherd</SelectItem>
                    <SelectItem value="bulldog">Bulldog</SelectItem>
                    <SelectItem value="labradorRetriever">Labrador Retriever</SelectItem>
                    <SelectItem value="germanShepherd">German Shepherd</SelectItem>
                    <SelectItem value="bulldog">Bulldog</SelectItem>
                    <SelectItem value="labradorRetriever">Labrador Retriever</SelectItem>
                    <SelectItem value="germanShepherd">German Shepherd</SelectItem>
                    <SelectItem value="bulldog">Bulldog</SelectItem>
                    <SelectItem value="labradorRetriever">Labrador Retriever</SelectItem>
            </SelectContent>
        </Select>

        <Select >
            <SelectTrigger className="w-[90%] mx-auto ">
                <SelectValue placeholder="Color" />
            </SelectTrigger>
            <SelectContent>
                    <SelectItem value="golden">Golden</SelectItem>
                    <SelectItem value="brown">Brown</SelectItem>
                    <SelectItem value="gray">Gray</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
            </SelectContent>
        </Select>

        <Select >
            <SelectTrigger className="w-[90%] mx-auto ">
                <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
            </SelectContent>
        </Select>

        <Select >
            <SelectTrigger className="w-[90%] mx-auto ">
                <SelectValue placeholder="age" />
            </SelectTrigger>
            <SelectContent>
                    <SelectItem value="puppy">Puppy</SelectItem>
                    <SelectItem value="adult">Adult</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
            </SelectContent>
        </Select>
        <Button className='text-pink-400 w-[50%] mx-auto bg-white border border-pink-400 hover:bg-white '>Apply Your fillter</Button>
        </div>
        

    </div>
  )
}

export default Filter