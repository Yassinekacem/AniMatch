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


import Loader from '@/components/Loader';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"




const Profile = () => {
  
  const [userDetails, setUserDetails] = useState<any>(null);
  const [animals, setAnimals] = useState<animalType[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getCurrentUserWithDetails();
      setUserDetails(userDetails);
    };
    fetchUserDetails();
  }, []);

  const AnimalsByOwner = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${userDetails?.id}`, {
        headers: {
          'Cache-Control': 'no-cache',  // Forcer l'absence de cache
          'Pragma': 'no-cache'          // Compatibilité avec HTTP/1.0
        }
      });
      setAnimals(response.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    AnimalsByOwner();
  }, [userDetails]);

  const handleDeleteAnimal = (animalId: number) => {
    setAnimals((prevAnimals) => prevAnimals.filter(animal => animal.id !== animalId));
  };
  const handleUpdateAnimal = () => {
    AnimalsByOwner(); // Refresh the list of animals after an update
  };

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
        <div className='flex gap-4'>
          <div className='w-[40%]'>
            <Chart />
          </div>
          <div className='flex flex-col gap-2 h-full w-[60%] bg-white border shadow-md shadow-slate-400 rounded-xl p-4'>
            <span className='text-3xl font-bold'>Your Animals</span>
            {

              <div className='flex flex-col gap-3 items-center w-full h-[310px] bg-white border border-slate-200 shadow-md shadow-slate-300 rounded-2xl overflow-y-scroll p-1'>
                {
                  loading ? (
                    <Loader />
                  ) : (
                    animals.length > 0 ?
                      animals.map((animal: animalType) => (
                        <ProfileCard
                          key={animal.id}
                          animal={animal}
                          onDelete={handleDeleteAnimal}
                          onUpdate={handleUpdateAnimal} // Pass the update handler
                        />)) : (
                        <span className='flex items-center justify-center text-xl text-gray-500 w-full h-[310px] bg-white border border-slate-200 shadow-md shadow-slate-300 rounded-2xl'>You don't have any animals yet</span>
                      )
                  )
                }

              </div>

            }
            <div className='flex items-center justify-center gap-4'>
              <Link href="/addDog">
                <Button className='text-customPink bg-white border border-customPink hover:bg-white'>Add a dog</Button>
              </Link>
              <Link href="/addCat">
                <Button className='text-customPink bg-white border border-customPink hover:bg-white'>Add a cat</Button>
              </Link>
            </div>

          </div>
        </div>

      </div>

      <div className='flex flex-col gap-3 items-center justify-center p-3'>
        <h1 className='text-3xl font-bold text-customGreen'>Invitations</h1>

        <Table className=' rounded-xl'>
          <TableHeader className=''>
            <TableRow>
              <TableHead className='text-lg text-black font-medium' >Sender</TableHead>
              <TableHead className='text-lg text-black font-medium'>Animal To match</TableHead>
              <TableHead className='text-lg text-black font-medium'>Status</TableHead>
              <TableHead className='text-lg text-black font-medium' >Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className='border-b-2 border-b-gray-200'>
              <TableCell className="font-medium">
                <div className='flex gap-2 items-center'>
                  <Image src='/images/dog.png' alt='profile image' width={50} height={50} className='rounded-full w-[40px] h-[40px]' />
                  <span className='text-lg font-bold'>Raef Kacem</span>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex gap-2 items-center'>
                    <Image src='/images/dog.png' alt='profile image' width={50} height={50} className='rounded-full w-[40px] h-[40px]' />
                    <span className='text-lg font-bold'>Boboo</span>
                  </div>
              </TableCell>
              <TableCell>
                <h2 className='border border-orange-400 bg-orange-400 p-1 w-1/2 text-center text-slate-100 rounded-lg'>Pending ...</h2>
                </TableCell>
              <TableCell >
                <Button className='bg-customBlue '>View Details</Button>
              </TableCell>
            </TableRow>

            <TableRow className='border-b-2 border-b-gray-200'>
              <TableCell className="font-medium">
                <div className='flex gap-2 items-center'>
                  <Image src='/images/dog.png' alt='profile image' width={50} height={50} className='rounded-full w-[40px] h-[40px]' />
                  <span className='text-lg font-bold'>Raef Kacem</span>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex gap-2 items-center'>
                    <Image src='/images/dog.png' alt='profile image' width={50} height={50} className='rounded-full w-[40px] h-[40px]' />
                    <span className='text-lg font-bold'>Boboo</span>
                  </div>
              </TableCell>
              <TableCell>
                <h2 className='border border-green-600 bg-green-600 p-1 w-1/2 text-center text-slate-100 rounded-lg'>Accepted</h2>
                </TableCell>
              <TableCell >
                <Button className='bg-customBlue '>View Details</Button>
              </TableCell>
            </TableRow>

            <TableRow className='border-b-2 border-b-gray-200'>
              <TableCell className="font-medium">
                <div className='flex gap-2 items-center'>
                  <Image src='/images/dog.png' alt='profile image' width={50} height={50} className='rounded-full w-[40px] h-[40px]' />
                  <span className='text-lg font-bold'>Raef Kacem</span>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex gap-2 items-center'>
                    <Image src='/images/dog.png' alt='profile image' width={50} height={50} className='rounded-full w-[40px] h-[40px]' />
                    <span className='text-lg font-bold'>Boboo</span>
                  </div>
              </TableCell>
              <TableCell>
                <h2 className='border border-red-500 bg-red-500 p-1 w-1/2 text-center text-slate-100 rounded-lg'>Rejected</h2>
                </TableCell>
              <TableCell >
                <Button className='bg-customBlue '>View Details</Button>
              </TableCell>
            </TableRow>
          </TableBody>
      </Table>
      </div>

      
    </div>
  )
}

export default Profile

