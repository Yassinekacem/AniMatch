"use client"
import { getCurrentUserWithDetails } from '@/actions/userActions';
import Chart from '@/components/Chart';
import ProfileCard from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import { animalType } from '@/types/animalType';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


const Profile = () => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [dogs, setDogs] = useState([]);
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
          const userDetails = await getCurrentUserWithDetails();
          setUserDetails(userDetails);
        };
        fetchUserDetails();
      }, []);

    const AnimalByOwner = async () =>{
        try {
            const response = await axios.get(`http://localhost:3000/api/users/${userDetails?.id}`);
            console.log(response.data);
            console.log(response.data.data);
            console.log(response.data.data1);
            setDogs(response.data.data);
            setCats(response.data.data1);
          } catch (error) {
            console.error("Error fetching animals:", error);
          }
    };

    useEffect(() => {
        AnimalByOwner();
      }, [userDetails]);

  return (
    <div className='flex flex-col gap-7 w-[95%] h-[1400px] mx-auto my-6 bg-gray-50 border border-slate-100 rounded-xl shadow-xl shadow-slate-500'>
        <div className='flex gap-3 w-full h-[10%] bg-customBlue rounded-t-xl pl-[65px] items-center'>
           <Image src={userDetails?.photo} alt='profile image' width={200} height={200} className='rounded-full w-[70px] h-[70px]' />
           <div className='flex flex-col gap-2'>
              <h1 className='text-white text-4xl font-extrabold'>Welcome, {userDetails?.lastName} !</h1>
              <p className='text-gray-100 font-semibold text-xl'>Manage all your furry friends in one place.</p>
           </div>
        </div>

        <div className='flex flex-col gap-3 w-[90%] mx-auto '>
            <h1 className='text-3xl font-bold'>Your Dogs</h1>
            <div className='flex gap-4'>
                <div className='w-[40%]'>
                <Chart />
                </div>
                <div className='flex flex-col gap-2 h-full w-[60%] bg-white border shadow-md shadow-slate-400 rounded-xl p-4'>
                     <span className='text-3xl font-bold'>Your Dogs</span>
                     {
                            dogs.length > 0 ? (
                                <div className='flex flex-col gap-3 items-center w-full h-[310px] bg-white border border-slate-200 shadow-md shadow-slate-300 rounded-2xl overflow-y-scroll p-1'>
                                {
                                 dogs.map((dog :animalType) =>(
                                     <ProfileCard key={dog.id} animal={dog} />
                                 ))
                                }
                              </div>
                            ) :(
                                <span className='flex items-center justify-center text-xl text-gray-500 w-full h-[310px] bg-white border border-slate-200 shadow-md shadow-slate-300 rounded-2xl'>You don't have any dogs yet</span>
                            ) 
                     }
                     
                     <Link href="/addanimal">
                       <Button className='text-customPink bg-white border border-customPink hover:bg-white'>Add a dog</Button>
                     </Link>
                </div>
            </div>

        </div>

        <div className='flex flex-col gap-3 w-[90%] mx-auto '>
            <h1 className='text-3xl font-bold'>Your Cats</h1>
            <div className='flex gap-4'>
                <div className='w-[40%]'>
                <Chart />
                </div>
                <div className='flex flex-col gap-2 h-full w-[60%] bg-white border shadow-md shadow-slate-400 rounded-xl p-4'>
                     <span className='text-3xl font-bold'>Your Cats</span>
                     {
                            cats.length > 0 ? (
                                <div className='flex flex-col gap-3 items-center w-full h-[310px] bg-white border border-slate-200 shadow-md shadow-slate-300 rounded-2xl overflow-y-scroll p-1'>
                                {
                                 cats.map((cat :animalType) =>(
                                     <ProfileCard key={cat.id} animal={cat} />
                                 ))
                                }
                              </div>
                            ) :(
                                <span className='flex items-center justify-center text-xl text-gray-500 w-full h-[310px] bg-white border border-slate-200 shadow-md shadow-slate-300 rounded-2xl'>You don't have any cats yet</span>
                            ) 
                     }
                     <Link href="/addanimal">
                       <Button className='text-customPink bg-white border border-customPink hover:bg-white'>Add a cat</Button>
                     </Link>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Profile

