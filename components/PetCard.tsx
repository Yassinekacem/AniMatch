import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

const PetCard = () => {
  return (
    <div className='w-[290px] flex flex-col items-center justify-center gap-3'>
      <div className='flex flex-col'>
        <Image
          src="/images/doggg.jpg"
          alt='dog'
          width={140}
          height={70}
          className='rounded-full w-[90px] h-[90px] m-1 relative z-30'
        />
        <div className='w-[100px] h-[50px] bg-pink-400 relative bottom-[50px] rounded-b-full z-20' />
      </div>
      <div className='bg-slate-100 rounded-xl pt-[50px] pb-2 w-full flex flex-col items-center justify-center gap-3 relative bottom-[110px] z-10'>
        <span className='text-customPink'>Lisa</span>
        <span className='font-bold'>Female</span>
        <span>Berger</span>
        <Button className='text-customPink bg-white hover:bg-white border border-customPink w-[90%]'>
          More Info
        </Button>
      </div>
    </div>
  );
};

export default PetCard;
