import Image from 'next/image'
import React from 'react'

const Detail = () => {
  return (
    <div className='m-10 '>
        <div className='flex items-center gap-2'>
            <div className='inline-block p-1 rounded-full border-2 border-dotted border-gray-300'>
                <Image 
                src="/images/doggg.jpg" 
                alt='dog' 
                width={70} 
                height={70}
                className='rounded-full w-16 h-16 m-1' 
                />
            </div>
            <div className='flex flex-col '>
                <h1 className='text-customGreen font-md text-2xl'>Magie</h1>
                <div>
                <span>Pet ID: </span> <span className='text-customGreen'>80638810</span>
                </div>    
            </div>
        </div>
        <div className='flex gap-6 mt-3'>
            <div className='flex-2 flex flex-col gap-2'>
                <Image src="/images/doggg.jpg" alt='imagee' width={450} height={350} className='w-[808px] h-[414px] rounded-md' />
                <div className='flex gap-4  p-2'>
                    <Image src="/images/doggg.jpg" alt='image' width={120} height={120} className='w-[184px] h-[122px] rounded-md' />
                    <Image src="/images/doggg.jpg" alt='imae' width={120} height={120} className='w-[184px] h-[122px] rounded-md' />
                    <Image src="/images/doggg.jpg" alt='ie' width={120} height={120} className='w-[184px] h-[122px] rounded-md' />
                    <Image src="/images/doggg.jpg" alt='imaee' width={120} height={120} className='w-[184px] h-[122px] rounded-md' />
                </div>
            </div>

            <div className='flex-1 flex flex-col  gap-8'>
                <div className='w-[80%] bg-gray-100 rounded-lg p-2 flex flex-col gap-3 '>
                    <h1 className='text-customGreen font-bold text-2xl'>Description</h1>
                    <p className='line-clamp-6'>
                    We have had Magie since she was able to leave her mum as a puppy so 8 weeks old.Magie currently lives with two children age 7 and 13 and has many visitors to the house which are children she is great with kids.There's lots of cats birds etc around the area and in the garden on most days as she's not fussed by these.
                    </p>
                </div>

                <div className='flex flex-col gap-7'>
                    <div className='flex gap-2 items-center'>
                        <Image src="/icons/child_care.png" alt="logo" width={150} height={40} className='w-8 h-8 ' />
                        <span className='text-xl'>Can live with other children of any age</span>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Image src="/icons/vaccines.png" alt="logo" width={150} height={80} className='w-[30px] h-[30px] ' />
                        <span className='text-xl'>Vaccinated</span>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Image src="/icons/warehouse.png" alt="logo" width={150} height={80} className='w-[30px] h-[30px] ' />
                        <span className='text-xl'>House-Trained</span>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Image src="/icons/Neutered.png" alt="logo" width={150} height={80} className='w-[30px] h-[30px] ' />
                        <span className='text-xl'>Neutrated</span>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Image src="/icons/photo_camera.png" alt="logo" width={150} height={80} className='w-[30px] h-[30px] ' />
                        <span className='text-xl'>Shots up to date</span>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Image src="/icons/wb_iridescent.png" alt="logo" width={150} height={80} className='w-[30px] h-[30px] ' />
                        <span className='text-xl'>Microchipped</span>
                    </div>

                </div>

            </div>
        </div>
        
    </div>
  )
}

export default Detail;
