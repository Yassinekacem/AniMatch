"use client";
import WishCard from '@/components/WishCard';
import { animalType, FetchedAnimalData } from '@/types/animalType';
import React, { useEffect, useState } from 'react';
import { getCurrentUserWithDetails } from "@/actions/userActions";
import axios from 'axios';
import Link from 'next/link';

const WishList = () => { 
  const [wishList, setWishList] = useState<FetchedAnimalData[]>([]);
  const [userDetails, setUserDetails] = useState<any>(null);

  const getWishList = async () => { 
    try { 
      const response = await axios.get(`http://localhost:3000/api/wish/${userDetails?.id}`); 
      setWishList(response.data); 
      console.log(response.data);
    } catch (error) {  
      console.error("Error fetching wishList:", error); 
    }
  }

  const removeWishFromList = (wishId: number) => {
    setWishList(prevList => prevList.filter(item => item.wishs.id !== wishId));
  };

  useEffect(() => {
    if (userDetails) {
      getWishList();
    }
  }, [userDetails]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getCurrentUserWithDetails();
      setUserDetails(userDetails);
    };
    fetchUserDetails();
  }, []);

  const wishedDogs = wishList.filter((item: FetchedAnimalData) => item.animals.species === "Dog");
  const wishedCats = wishList.filter((item: FetchedAnimalData) => item.animals.species === "Cat");

  return (
    <div className='m-8 flex flex-col gap-9'>
      <div className='flex flex-col gap-2 items-center justify-center'>
        <h1 className='font-bold text-4xl text-customGreen'>WishList</h1>
        <p className='text-xl font-semibold'>Find here your wished animals</p>
      </div>

      <div className='flex flex-col gap-5'>
        <h1 className='text-2xl font-bold text-customGreen'>Wished Dogs</h1>
        <div className='flex gap-2 flex-wrap'>
          {
            wishedDogs.length > 0 ? (
              wishedDogs.map((item: FetchedAnimalData) => (
                <WishCard key={item.animals.id} item={item} removeWish={removeWishFromList} />
              ))
            ) : (
              <div className='w-full h-[250px] bg-gray-200 border border-slate-100 shadow-xl shadow-slate-400 rounded-2xl  flex flex-col gap-3 items-center justify-center'>
               <span className='text-2xl font-bold'>No wished dogs yet</span>
               <Link href='/dogs' className='text-blue-500 border-b border-blue-500'>Dogs URL</Link>
              </div>
            )
          }
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold text-customGreen'>Wished Cats</h1>
        <div className='flex gap-2 flex-wrap'>
          {
            wishedCats.length > 0 ? (
              wishedCats.map((item: FetchedAnimalData) => (
                <WishCard key={item.animals.id} item={item} removeWish={removeWishFromList} />
              ))
            ) : (
               <div className='w-full h-[250px] bg-gray-200 border border-slate-100 shadow-xl shadow-slate-400 rounded-2xl  flex flex-col gap-3 items-center justify-center'>
               <span className='text-2xl font-bold'>No wished cats yet</span>
               <Link href='/cats' className='text-blue-500 border-b border-blue-500'>Cats URL</Link>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default WishList;
