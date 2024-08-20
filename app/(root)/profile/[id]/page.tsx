"use client"
import { getCurrentUserWithDetails } from '@/actions/userActions';
import Chart from '@/components/Chart';
import ProfileCard from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


const Profile = () => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [animals, setAnimals] = useState([]);

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
            setAnimals(response.data);
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
                     <div className='flex flex-col gap-3 items-center w-full h-[310px] bg-white border border-slate-200 shadow-md shadow-slate-300 rounded-2xl overflow-y-scroll p-1'>
                       <ProfileCard />
                       <ProfileCard />
                       <ProfileCard />
                       <ProfileCard />
                     </div>
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
                     <div className='flex flex-col gap-3 items-center w-full h-[310px] bg-white border border-slate-200 shadow-md shadow-slate-300 rounded-2xl overflow-y-scroll p-1'>
                       <ProfileCard />
                       <ProfileCard />
                       <ProfileCard />
                       <ProfileCard />
                     </div>
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