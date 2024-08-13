import Image from 'next/image';
import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { animalType } from '@/types/animalType';
import Link from 'next/link';

const ageType = (age: number) => {
  if (age < 12) return 'Puppy';
  if (age < 24) return 'Young';
  if (age < 60) return 'Adult'; 
  return 'Senior';
}

const Card = ({ item }: { item: animalType }) => {
  return (
    <div className='w-[300px] h-[450px]  border-2 border-slate-300 rounded-xl relative'>
      <div className='relative'>
        <Image
          src={item.image}
          alt='dog'
          width={150}
          height={10}
          className='w-[300px] h-[200px] rounded-t-xl bg-cover'
        />
        <div
          className={`absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-white ${item.available ? 'bg-green-500' : 'bg-red-500'
            }`}
        ></div>
      </div>
      <div className='flex items-center justify-between mx-2 mt-2'>
        <span className='text-customPurple text-xl font-bold'>{item.name}</span>
        <Heart className='text-gray-400' />
      </div>
      <div className='flex items-center ml-2 gap-2 mt-3'>
        <MapPin className='w-5 h-5 text-customGreen' />
        <span className='text-customGreen font-semibold'>{item.city}</span>
      </div>
      <div className='flex gap-5 mx-5 mt-2  items-center justify-start'>
        <div className='flex gap-2'>
          <span className='font-medium text-bold'>Gender:</span>
          <span className='border border-purple-200 bg-purple-200 rounded-md text-customPurple line-clamp-1'>{item.gender}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-medium text-bold'>Breed:</span>
          <span className='border border-purple-200 bg-purple-200 rounded-md text-customPurple line-clamp-1'>{item.breed}</span>
        </div>
      </div>
      <div className='flex gap-5 mx-5 mt-2 items-center'>
        <div className='flex gap-2'>
          <span className='font-medium text-bold'>Age:</span>
          <span className='border border-purple-200 bg-purple-200 rounded-md text-customPurple line-clamp-1'>
            {ageType(item.age) === 'Puppy' ? `${item.age} Months` : `${Math.floor((item.age / 12))} Years`}
          </span>
        </div>
        <div className='flex gap-2'>
          <span className='font-medium text-bold'>City:</span>
          <span className='border border-purple-200 bg-purple-200 rounded-md text-customPurple line-clamp-1'>{item.city}</span>
        </div>
      </div>
      <p className='line-clamp-2 m-4'>{item.description}</p>
      <Link href={`/detail/${item.id}`}>
        <Button className='text-pink-400 bg-white border border-pink-400 font-medium w-[90%] mx-4 hover:bg-white'>
          More Info
        </Button>
      </Link>
    </div>
  );
};

export default Card;
