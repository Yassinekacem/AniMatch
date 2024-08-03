import Image from 'next/image'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const home = () => {
  return (
    <div className='h-[92vh] flex items-center justify-between w-[80%]  mx-auto'>
      <div className='flex flex-col absolute h-full '>
           <Image src="/images/pas.png" alt="pas" width={50}  height={20} className='w-[150px] z-1 relative top-[75px] right-[80px]' />
          <div className='w-[50%] flex flex-col gap-[40px] h-[70%] z-10'>
              <h1 className='bold-52 font-sansss '>Connect your pet with his Ideal partner</h1>
              <p className='font-light'>Use our quick search below to find a companion for your pet</p>
              <div className="flex gap-2">
                  <Select >
                    <SelectTrigger className="w-[180px]  border border-black">
                        <SelectValue placeholder="Species" />
                    </SelectTrigger>
                    <SelectContent className='mb-5'>
                            <SelectItem value="cat">Cat</SelectItem>
                            <SelectItem value="dog">Dog</SelectItem>
                    </SelectContent>
                </Select>

                <Select >
                    <SelectTrigger className="w-[180px]  border border-black">
                        <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent className='mb-5'>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <Button className="w-1/3 mx-[70px] bg-customBlue rounded-full  text-md">
                Find Partner
              </Button>
              <div className='absolute'>
                 <Image src="/images/Group.png" alt='img' width={60} height={20} className='w-[60px] relative top-[435px] left-[120px]' />
                 <span className='text-customPink relative top-[420px] left-[190px] font-bold text-md'>Click here !</span>
              </div>
          </div>
      </div>
       
       <div className='flex absolute'>
            <Image src="/images/fondhome.png" alt='img' width={350} height={350} className='w-[650px] h-[650px] z-1 relative left-[650px] top-[20px]' />
            <Image src="/images/dog.png" alt='img' width={350} height={350} className='w-[650px] h-[650px] z-10 relative left-[50px]  bottom-[10px] ' />
       </div>
    </div>
  )
}

export default home