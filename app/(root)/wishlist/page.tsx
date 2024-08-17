import WishCard from '@/components/WishCard'
import React from 'react'

const WishList = () => {
  return (
    <div className='m-8 flex flex-col gap-9'>
       <div className='flex flex-col gap-2 items-center justify-center'>
          <h1 className='font-bold text-4xl text-customGreen'>WishList</h1>
          <p className='text-xl font-semibold'>Find here your wished animals</p>
       </div>

       <div className='flex flex-col gap-5'>
        <h1 className='text-2xl font-bold text-customGreen'>Wished Dogs</h1>
        <div className='flex gap-2 flex-wrap'>
           <WishCard/>
           <WishCard/>
           <WishCard/>
           <WishCard/>
        </div>
       </div>

       <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold text-customGreen'>Wished Cats</h1>
        <div className='flex gap-2 flex-wrap'>
           <WishCard/>
           <WishCard/>
           <WishCard/>
           <WishCard/>
        </div>
       </div>
    </div>
  )
}

export default WishList