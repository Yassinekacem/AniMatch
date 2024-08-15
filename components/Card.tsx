import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Heart, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { animalType } from '@/types/animalType';
import Link from 'next/link';
import axios from 'axios';
import { getCurrentUserWithDetails } from '@/actions/userActions';

const ageType = (age: number) => {
  if (age < 12) return 'Puppy';
  if (age < 24) return 'Young';
  if (age < 60) return 'Adult'; 
  return 'Senior';
}

const Card = ({ item }: { item: animalType }) => {  
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getCurrentUserWithDetails();
      setUserDetails(userDetails);
    };
    
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const checkIfWished = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/wish/${userDetails?.id}`);
        const wishedAnimals = response.data;
        const isWished = wishedAnimals.find((animal: any) => animal.animals.id === item.id);
        setIsInWishlist(isWished);
      } catch (error) {
        console.log('Error fetching animals wished by user:', error);
      }
    };

    if (userDetails?.id) {
      checkIfWished();
    }
  }, [userDetails, item.id]);

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      const response = await axios.post("http://localhost:3000/api/wish", {
        userId: userDetails?.id,
        animalId: item.id,
      });
      console.log("Wish added successfully:", response.data);
      setIsInWishlist(true);
    } catch (error) {
      console.error("Error adding Wish:", error);
    }
  };

  return (
    <div className='w-[300px] h-[450px] border-2 border-slate-300 rounded-xl relative'>
      <div className='relative'>
        <Image
          src={item.image[0]}
          alt='dog'
          width={150}
          height={10}
          className='w-[300px] h-[180px] rounded-t-xl bg-cover'
        />
        <div
          className={`absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-white ${item.available ? 'bg-green-500' : 'bg-red-500'}`}
        ></div>
      </div>
      <div className='flex items-center justify-between mx-2 mt-2'>
        <span className='text-customPurple text-xl font-bold'>{item.name}</span>
        <button onClick={onSubmit}>
          <Heart
            className={`w-6 h-6 ${isInWishlist ? 'fill-current text-red-500' : 'text-slate-500'}`}
            strokeWidth="2"
            stroke="currentColor"
          />
        </button>
      </div>
      <div className='flex items-center ml-2 gap-2 mt-3'>
        <MapPin className='w-5 h-5 text-customGreen' />
        <span className='text-customGreen font-semibold'>{item.city}</span>
      </div>
      <div className='flex gap-5 mx-5 mt-2 items-center justify-start'>
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
