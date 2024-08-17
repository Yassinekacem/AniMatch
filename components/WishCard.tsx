import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { CircleX ,ReceiptText} from 'lucide-react';


const WishCard = () => {
  return (
    <div className='w-[350px] h-[450px] flex flex-col gap-2 border border-gray-100 shadow-xl shadow-slate-300 rounded-lg'>
     <Image src="/images/doggg.jpg" alt='imgg' width={350} height={200} className='h-[230px] rounded-t-lg' />
     <div className=' p-2 flex flex-col gap-3'>
        <h1 className='font-sanss text-xl text-customGreen'>Black</h1>
        <div className='flex items-center gap-2'>
            <Image src="/icons/position.svg" alt='imgg' width={20} height={20} className='w-5 h-5 ' />
            <span className='text-lg font-semibold'>nabeul</span>
        </div>
        <p className='line-clamp-2 '>Dogs are loyal and affectionate animals, often referred to as humans' best friends. They come in a wide variety of breeds, each with distinct characteristics and appearances. Known for their keen senses, especially smell, dogs excel in various roles</p>
        <div className='flex items-center justify-between'>
             <Button className='flex gap-2 bg-red-500 text-white hover:bg-red-500 items-center'>
                <CircleX className='w-5 h-5 text-white'/>
                Remove
             </Button>
             <Button className='flex gap-3 items-center bg-white text-customPink border border-customPink hover:bg-white'>
                <ReceiptText className='w-5 h-5 text-customPink'/>
                View Details</Button>
        </div>
     </div>
    </div>
  )
}

export default WishCard