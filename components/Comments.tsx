import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import StarRating from './StarRating';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { getCurrentUserWithDetails } from '@/actions/userActions';
import axios from 'axios';
import Stars from './Stars';
import { commentType } from '@/types/commentType';

interface CommentsProps {
  petId: number; // Assuming the ID is a string, change this if it's another type
}

const Comments = ({ petId }: CommentsProps) => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const handleRatingChange = (newRating: number) => {
    setUserRating(newRating);
    console.log('New rating:', newRating);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getCurrentUserWithDetails();
      setUserDetails(userDetails);
    };
    fetchUserDetails();
  }, []);

  const getAnimalComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/comments/${petId}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getAnimalComments();
  }, [petId]);

  const AddComment = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/comments", {
        userId: userDetails?.id,
        animalId: petId,
        userPhoto: userDetails?.photo,
        firstName: userDetails?.firstName,
        lastName: userDetails?.lastName,
        rate: userRating,
        content: content,
      });
      // Handle response or state updates if needed
      console.log("Comment added successfully:", response.data);
      // Optionally, fetch the updated comments after adding the new one
      getAnimalComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleSubmit = async () => {
    if (content.trim() !== "") {
      await AddComment();
      setContent(""); // Clear the textarea after submitting the comment
    } else {
      console.error("Comment content is empty");
    }
  };

  return (
    <div className='flex justify-between gap-3'>
      <div className='w-[60%] flex flex-col gap-2 bg-gray-200 rounded-lg p-2'>
        <h1 className='text-customGreen font-bold text-3xl'>Comments</h1>
        <div className='flex flex-col gap-2'>
          {comments.map((comment: commentType) => (
            <div key={comment.id} className='flex gap-2 p-5'>
              <Image src={comment.userPhoto} alt='imgg' width={50} height={50} className='w-10 h-10 rounded-full' />
              <div className='flex flex-col'>
                <div className='flex items-center gap-2'>
                  <span className='font-bold text-lg'>{comment.firstName} {comment.lastName}</span>
                  <span className='text-gray-400 text-sm'>2 weeks ago</span>
                </div>
                <div className='flex flex-col gap-2 bg-white rounded-xl p-2'>
                  <p className='w-full'>{comment.content}</p>
                  <Stars rating={comment.rate} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='w-[35%] flex flex-col items-center bg-gray-200 rounded-lg gap-5 p-4'>
        <h1 className='text-3xl font-bold text-customGreen'>Leave a comment</h1>
        <Textarea placeholder='Write your comment here...' className='w-full h-[220px]' value={content} onChange={(e) => setContent(e.target.value)} />
        <div className='flex items-center justify-between w-full'>
          <StarRating initialRating={userRating} onRatingChange={handleRatingChange} />
          <Button className='bg-customPink text-white hover:bg-customBlue' onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
