import PetCard from '@/components/PetCard';
import { Button } from '@/components/ui/button';
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
                    We have had Magie since she was able to leave her mum as a puppy so 8 weeks old.Magie currently lives with two children age 7 and 13 and has many visitors to the house which are children she is great with kids.There lots of cats birds etc around the area and in the garden on most days as shes not fussed by these.
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


        <div className='ml-3 flex  gap-9 '>
                <div className='flex flex-col gap-1 items-center justify-center'>
                        <Image src="/icons/female.png" alt='gender' width={50} height={50} className='w-9 h-9 relative top-[20px] ' />
                        <Image src="/icons/Semicircular.png" alt='cir' width={50} height={50} className='w-[50px] h-9' />
                        <span className='text-md text-gray-400'>Gender</span>
                        <span className='text-customPink font-semibold'>Female</span>
                </div>

                <div className='flex flex-col gap-1 items-center justify-center'>
                        <Image src="/icons/breed.png" alt='gender' width={50} height={50} className='w-9 h-9 relative top-[20px] ' />
                        <Image src="/icons/Semicircular.png" alt='cir' width={50} height={50} className='w-[50px] h-9' />
                        <span className='text-md text-gray-400'>Breed</span>
                        <span className='text-customPink font-semibold'>Shiba Inu</span>
                </div>

                <div className='flex flex-col gap-1 items-center justify-center'>
                        <Image src="/icons/watch_later.png" alt='gender' width={50} height={50} className='w-9 h-9 relative top-[20px] ' />
                        <Image src="/icons/Semicircular.png" alt='cir' width={50} height={50} className='w-[50px] h-9' />
                        <span className='text-md text-gray-400'>Age</span>
                        <span className='text-customPink font-semibold'>14 month</span>
                </div>

                <div className='flex flex-col gap-1 items-center justify-center'>
                        <Image src="/icons/palette.png" alt='gender' width={50} height={50} className='w-9 h-9 relative top-[20px] ' />
                        <Image src="/icons/Semicircular.png" alt='cir' width={50} height={50} className='w-[50px] h-9' />
                        <span className='text-md text-gray-400'>Color</span>
                        <span className='text-customPink font-semibold'>Red</span>
                </div>

                <div className='flex flex-col gap-1 items-center justify-center'>
                        <Image src="/icons/scale.png" alt='gender' width={50} height={50} className='w-9 h-9 relative top-[20px] ' />
                        <Image src="/icons/Semicircular.png" alt='cir' width={50} height={50} className='w-[50px] h-9' />
                        <span className='text-md text-gray-400'>Weight</span>
                        <span className='text-customPink font-semibold'>12 Kg</span>
                </div>

                <div className='flex flex-col gap-1 items-center justify-center'>
                        <Image src="/icons/Height.png" alt='gender' width={50} height={50} className='w-9 h-9 relative top-[20px] ' />
                        <Image src="/icons/Semicircular.png" alt='cir' width={50} height={50} className='w-[50px] h-9' />
                        <span className='text-md text-gray-400'>Height</span>
                        <span className='text-customPink font-semibold'>91 Cm</span>
                </div>
        </div>

        <div className=' mt-2 flex items-center justify-center'>
           <div className='w-1/4 border border-slate-400 flex flex-col items-center p-2 rounded-lg gap-2'>
              <span className='font-bold'>If you are interested to match</span>
              <Button className='bg-customPink text-white hover:bg-customPink'>Get started</Button>
           </div>
        </div>

        <div className='flex flex-col gap-5 items-center justify-center mt-4'>
            <h1 className='text-customGreen text-xl '>Similar Pets</h1>
            <div className='flex gap-5 flex-wrap'>
                <PetCard />
                <PetCard />
                <PetCard />
                <PetCard />
            </div>
        </div>

    </div>
  )
}

export default Detail;
