"use client"
import { getCurrentUserWithDetails } from '@/actions/userActions';
import Chart from '@/components/Chart';
import ProfileCard from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import { animalType } from '@/types/animalType';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import Loader from '@/components/Loader';
import InvitationSection from '@/components/InvitationSection';
import { invitationType } from '@/types/invitationType';






const Profile = () => {

  const [Invitations, setInvitations] = useState<invitationType[]>([]);
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

  const AnimalsByOwner = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api-withdrizzle-orm-9e8n-jq5l35l9g-yassinekacems-projects.vercel.app/api/users/${userDetails?.id}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      setAnimals(response.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
    } finally {
      setLoading(false);
    }
  }, [userDetails]); 

  useEffect(() => {
    if (userDetails) AnimalsByOwner();
  }, [userDetails, AnimalsByOwner]);


  const handleDeleteAnimal = (animalId: number) => {
    setAnimals((prevAnimals) => prevAnimals.filter(animal => animal.id !== animalId));
  };
  const removeInviFromList = (invitationId: number) => {
    setInvitations(prevList => prevList.filter(invitation => invitation.id !== invitationId));
  };
  const handleUpdateAnimal = () => {
    AnimalsByOwner(); // Refresh the list of animals after an update
  };



const invitationsByUser = useCallback(async () => {
  try {
    const response = await axios.get(`https://api-withdrizzle-orm-9e8n-jq5l35l9g-yassinekacems-projects.vercel.app/api/invitations/${userDetails?.id}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    setInvitations(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching invitations:", error);
  }
}, [userDetails]);
useEffect(() => {
  if (userDetails) invitationsByUser();
}, [userDetails, invitationsByUser]);



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
                          onUpdate={handleUpdateAnimal}  // Pass the update handler
                        />)) : (
<span className='flex items-center justify-center text-xl text-gray-500 w-full h-[310px] bg-white border border-slate-200 shadow-md shadow-slate-300 rounded-2xl'>You don&apos;t have any animals yet</span>
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

      <div>
        {Invitations.map((item: invitationType) => <InvitationSection item={item} key={item.id} removeInvitation={removeInviFromList} />)}
      </div>

    </div>
  )
}

export default Profile

