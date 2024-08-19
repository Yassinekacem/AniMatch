"use client";
import WishCard from '@/components/WishCard'
import { animalType, FetchedAnimalData } from '@/types/animalType'
import React, { useEffect, useState } from 'react'
import { getCurrentUserWithDetails } from "@/actions/userActions";
import axios from 'axios';

const WishList = () => { 
const [wishList, setWishList] = useState<FetchedAnimalData[]>([])  
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
getWishList();
}, [userDetails]);

useEffect(() => {
   const fetchUserDetails = async () => {
     const userDetails = await getCurrentUserWithDetails();
     setUserDetails(userDetails);
   };
   fetchUserDetails();
 }, []);

  return (
    <div className='m-8 flex flex-col gap-9'>
       <div className='flex flex-col gap-2 items-center justify-center'>
          <h1 className='font-bold text-4xl text-customGreen'>WishList</h1>
          <p className='text-xl font-semibold'>Find here your wished animals</p>
       </div>

       <div className='flex flex-col gap-5'>
        <h1 className='text-2xl font-bold text-customGreen'>Wished Dogs</h1>
        <div className='flex gap-2 flex-wrap'>
           {/* <WishCard/> */}
{
wishList.filter((item: FetchedAnimalData) => item.animals.species === "Dog").map((item : FetchedAnimalData) => <WishCard key={item.animals.id} item={item} removeWish={removeWishFromList} />)
}
        </div>
       </div>

       <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold text-customGreen'>Wished Cats</h1>
        <div className='flex gap-2 flex-wrap'>
        {
wishList.filter((item: FetchedAnimalData) => item.animals.species === "Cat").map((item : FetchedAnimalData) => <WishCard key={item.animals.id} item={item} removeWish={removeWishFromList} />)
}
        </div>
       </div>
    </div>
  )
}

export default WishList