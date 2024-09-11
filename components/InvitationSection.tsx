import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from 'next/image';
import { Button } from './ui/button';
import { invitationType } from '@/types/invitationType';
import axios from 'axios';
import { animalType } from '@/types/animalType';

function InvitationSection({ item }: { item: invitationType }) {
  const [animal, setAnimal] = useState<animalType | null>(null);

  const animalInvited = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/animals/${item.animalId}`);
      setAnimal(response.data[0] || null);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  useEffect(() => {
    animalInvited();
  }, [item.animalId]);

  return (
    <div>
      <div className='flex flex-col gap-3 items-center justify-center p-3'>
        <h1 className='text-3xl font-bold text-customGreen'>Invitations</h1>

        <Table className='rounded-xl'>
          <TableHeader>
            <TableRow>
              <TableHead className='text-lg text-black font-medium text-center'>Sender</TableHead>
              <TableHead className='text-lg text-black font-medium text-center'>Animal To Match</TableHead>
              <TableHead className='text-lg text-black font-medium text-center'>Status</TableHead>
              <TableHead className='text-lg text-black font-medium text-center'>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className='border-b-2 border-b-gray-200'>
              <TableCell className="font-medium text-center">
                <div className='flex gap-0 items-center'>
                  <Image src={item.senderPhoto} alt='profile image' width={50} height={50} className='rounded-full w-[40px] h-[40px]' />
                  <span className='text-lg font-bold'>{item.senderName}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex gap-1 items-center'>
                  {animal?.image[0] && (
                    <Image src={animal.image[0]} alt='animal image' width={50} height={50} className='rounded-full w-[40px] h-[40px]' />
                  )}
                  <span className='text-lg font-bold'>{item.animalName}</span>
                </div>
              </TableCell>
              <TableCell>
                <h2 className='border border-orange-400 bg-orange-400 p-1 text-center text-slate-100 rounded-lg'>Pending ...</h2>
              </TableCell>
              <TableCell>
                <Button className='bg-customBlue'>View Details</Button>
              </TableCell>
              <TableCell>
                <div className='flex gap-6'>
                  <Button className='bg-green-500'>Accept</Button>
                  <Button className='bg-red-500'>Refuse</Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default InvitationSection;