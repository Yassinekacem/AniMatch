import Image from 'next/image';
import React, { useState } from 'react';
import StarRating from './StarRating';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const Comments = () => {
  const [userRating, setUserRating] = useState<number>(0);

  const handleRatingChange = (newRating: number) => {
    setUserRating(newRating);
    console.log('New rating:', newRating);
  };

  return (
    <div className='flex justify-between gap-3'>
      <div className='w-[60%] flex flex-col gap-2 bg-gray-200 rounded-lg p-2'>
        <h1 className='text-customGreen font-bold text-3xl'>Comments</h1>
        <div className='flex flex-col gap-2'>
          {/* Comment 1 */}
          <div className='flex gap-2 p-5'>
            <Image src="/images/doggg.jpg" alt='imgg' width={50} height={50} className='w-10 h-10 rounded-full' />
            <div className='flex flex-col'>
              <div className='flex items-center gap-2'>
                <span className='font-bold text-lg'>John Doe</span>
                <span className='text-gray-400 text-sm'>2 weeks ago</span>
              </div>
              <div className='flex flex-col gap-2 bg-white rounded-xl p-2'>
                <p className='w-full'>We have had Magie since she was able to leave her mum as a puppy so 8 weeks old. Magie currently lives with two children age 7 and 13 and has many visitors to the house which are</p>
                <StarRating initialRating={userRating} onRatingChange={handleRatingChange} />
              </div>
            </div>
          </div>
          {/* Comment 2 */}
          <div className='flex gap-2 p-5'>
            <Image src="/images/doggg.jpg" alt='imgg' width={50} height={50} className='w-10 h-10 rounded-full' />
            <div className='flex flex-col'>
              <div className='flex items-center gap-2'>
                <span className='font-bold text-lg'>Jane Doe</span>
                <span className='text-gray-400 text-sm'>3 weeks ago</span>
              </div>
              <div className='flex flex-col gap-2 bg-white rounded-xl p-2'>
                <p className='w-full'>Magie has been a wonderful addition to our family. She is great with kids and very friendly.</p>
                <StarRating initialRating={userRating} onRatingChange={handleRatingChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[35%] flex flex-col items-center bg-gray-200 rounded-lg gap-5 p-4'>
        <h1 className='text-3xl font-bold text-customGreen'>Leave a comment</h1>
        <Textarea placeholder='Write your comment here...' className='w-full h-[220px]' />
        <div className='flex items-center justify-between  w-full'>
            <StarRating initialRating={userRating} onRatingChange={handleRatingChange} />
            <Button className='bg-customPink text-white hover:bg-customBlue'>Submit</Button>
        </div>
         
      </div>
    </div>
  );
};

export default Comments;
