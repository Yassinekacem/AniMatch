import Image from 'next/image';
import React from 'react';
import { Trash2, FilePenLine } from 'lucide-react';
import { Button } from './ui/button';
import { animalType } from '@/types/animalType';

const ProfileCard = ({animal}:{animal:animalType}) => {
  return (
    <div className='flex items-center justify-between w-full h-[110px] bg-white rounded-lg border border-gray-200 shadow-md p-4'>
        <div className='flex gap-4 items-center'>
            <Image src={animal.image[0]} alt="Image" width={150} height={150} className='rounded-full w-20 h-20 object-cover' />
            <div className='flex flex-col'>
                <span className='font-semibold text-lg text-gray-800'>{animal.name}</span>
                <span className='text-gray-500 text-sm'>Age: {animal.age} , Gender: {animal.gender}</span>
            </div>
        </div>
        <div className='flex gap-3'>
            <Button className='p-2 bg-blue-50 border border-blue-200 hover:bg-blue-100'>
              <FilePenLine className='w-5 h-5 text-blue-500' />
            </Button>
            <Button className='p-2 bg-red-50 border border-red-200 hover:bg-red-100'>
              <Trash2 className='w-5 h-5 text-red-500' />
            </Button>
        </div>
    </div>
  );
};

export default ProfileCard;
