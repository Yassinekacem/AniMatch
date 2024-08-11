import React from 'react'
import { Button } from './ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Image from 'next/image'
import { Checkbox } from "@/components/ui/checkbox"

  

const Filter = () => {
  return (
    <div className=' h-screen   w-[350px] mr-4 '>
         <div className='flex items-center justify-between'>
             <Button className='text-pink-400 bg-white hover:bg-white'>
                  Fillters
             </Button>
             <Button className='text-gray-400 bg-white hover:bg-white'>
                 Reset Fillters
             </Button>
         </div>
         <hr  className='border-1 border-gray-400 w-[90%] mx-auto'/>
         <div className='my-2 flex items-center  justify-center gap-9'>
            <Image src="/images/cat filter.png" alt='logo' width={150} height={20} className='w-[90px] h-[90px]' />
            <Image src="/images/dog filter.png" alt='logo'  width={150} height={20} className='w-[90px] h-[90px]' />
         </div>
         <div className='flex flex-col gap-4 w-full mt-4'>
            <Select >
                <SelectTrigger className="w-[90%] mx-auto ">
                    <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                        <SelectItem value="nabeul">nabeul</SelectItem>
                        <SelectItem value="tunis">tunis</SelectItem>
                        <SelectItem value="sousse">sousse</SelectItem>
                        <SelectItem value="gabes">gabes</SelectItem>
                </SelectContent>
            </Select>

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
        <div className='w-[85%] mx-auto my-3'>
            <span className='font-light text-md text-gray-400'>Select the items you want to display in your Fillter :</span>
            <div className='flex flex-col items-start mt-2 gap-3 '>
                    <div className="flex items-center justify-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Vaccinated
                    </label>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Trained
                    </label>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Friendly
                    </label>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Joyful
                    </label>
                    </div>
            </div>
            
        </div>
        
        <Button className='text-pink-400 w-[50%] mx-auto bg-white border border-pink-400 hover:bg-white '>Apply Your fillter</Button>
        </div>
        

    </div>
  )
}

export default Filter



