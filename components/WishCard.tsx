import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { CircleX, ReceiptText } from 'lucide-react';
import { animalType, FetchedAnimalData } from '@/types/animalType';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

const WishCard = ({ item, removeWish }: { item: FetchedAnimalData, removeWish: (wishId: number) => void }) => {  
   const deleteWish = async () => { 
      try { 
         const response = await axios.delete(`api/wish/${item.wishs.id}`); 
         removeWish(item.wishs.id)
         toast.success('Wish deleted successfully'); // Show success toast
      } catch (error) {  
         console.error("Error deleting wish:", error);  
         toast.error('Failed to delete wish.'); // Show error toast

      }

   }
   return (
      <div className='w-[350px] h-[450px] bg-white flex flex-col gap-2 border border-gray-100 shadow-xl shadow-slate-300 rounded-lg'>
         <Image src={item.animals.image[0]} alt='imgg' width={350} height={200} className='h-[230px] rounded-t-lg' />
         <div className=' p-2 flex flex-col gap-3'>
            <h1 className='font-sanss text-xl text-customGreen'>{item.animals.name}</h1>
            <div className='flex items-center gap-2'>
            <Image src="/icons/position.svg" alt='imgg' width={20} height={20} className='w-5 h-5 ' />
               <span className='text-lg font-semibold'>{item.animals.city}</span>
            </div>
            <div className='h-[45px]'>
            <p className='line-clamp-2 '>{item.animals.description}</p>
            </div>
            <div className='flex items-center justify-between'>
               <Button className='flex gap-2 bg-red-500 text-white hover:bg-red-500 items-center' onClick={deleteWish}>
                  <CircleX className='w-5 h-5 text-white' />
                  Remove
               </Button>
               <Link href={`detail/${item.animals.id}`}>
                  <Button className='flex gap-3 items-center bg-white text-customPink border border-customPink hover:bg-white'>
                     <ReceiptText className='w-5 h-5 text-customPink' />
                     View Details</Button>
               </Link>

            </div>
         </div>
      </div>
   )
}

export default WishCard