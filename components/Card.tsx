import Image from 'next/image'
import React from 'react'
import { Heart } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Button } from './ui/button';


const Card = () => {
  return (
    <div className='w-[300px] h-[450px] shadow-md shadow-slate-100 border-2 border-slate-300 rounded-xl'>
      <Image src="/images/dog.jpeg" alt='dog'  width={150} height={10} className='w-[300px] h-[35%] rounded-t-xl bg-cover' />
      <div className='flex items-center justify-between mx-2 mt-2'>
        <span className='text-customPurple text-xl font-bold'>Balto</span>
        <Heart className='text-gray-400'/>
      </div>
      <div className='flex items-center ml-2 gap-2 mt-3'>
        <MapPin className='w-5 h-5 text-customGreen' />
        <span className='text-customGreen font-semibold'>michigan,USA</span>
      </div>
      <div className='flex gap-5 mx-5 mt-2  items-center'>
        <div className='flex gap-2'>
           <span className='font-medium text-bold'>Gender:</span>
           <span className='border border-purple-200 bg-purple-200 rounded-md text-customPurple line-clamp-1 '>Male</span>
        </div>
        <div className='flex gap-2'>
           <span className='font-medium text-bold'>Breed:</span>
           <span className='border border-purple-200 bg-purple-200 rounded-md text-customPurple line-clamp-1'>Golden R</span>
        </div>
      </div>

      <div className='flex gap-5 mx-5 mt-2  items-center'>
        <div className='flex gap-2'>
           <span className='font-medium text-bold'>Age:</span>
           <span className='border border-purple-200 bg-purple-200 rounded-md text-customPurple line-clamp-1 '>3 years</span>
        </div>
        <div className='flex gap-2'>
           <span className='font-medium text-bold'>Size:</span>
           <span className='border border-purple-200 bg-purple-200 rounded-md text-customPurple line-clamp-1'>Large</span>
        </div>
      </div>
      <p className='line-clamp-2 m-4'>Balto is a friendly, playful, smart male dog. Only adopted to a house with fenced yard. He loves running around</p>
      <Button className='text-pink-400 bg-white border border-pink-400 font-medium w-[90%] mx-4 hover:bg-white'>
          More Info
      </Button>
    </div>
  )
}

export default Card