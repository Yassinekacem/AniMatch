import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react';
import StarRating from './StarRating';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { getCurrentUserWithDetails } from '@/actions/userActions';
import axios from 'axios';
import Stars from './Stars';
import { commentType } from '@/types/commentType';
import toast from 'react-hot-toast';
import { dateConverter } from '@/lib/utils';

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

  const getAnimalComments = useCallback(async () => {
    try {
      const response = await axios.get(`https://api-withdrizzle-orm-9e8n-git-master-yassinekacems-projects.vercel.app/api/comments/${petId}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [petId]);

  useEffect(() => {
    getAnimalComments();
  }, [petId, getAnimalComments]); 
  

  const AddComment = async () => {
    try {
      const response = await axios.post("https://api-withdrizzle-orm-9e8n-git-master-yassinekacems-projects.vercel.app/api/comments", {
        userId: userDetails?.id,
        animalId: petId,
        userPhoto: userDetails?.photo,
        firstName: userDetails?.firstName,
        lastName: userDetails?.lastName,
        rate: userRating,
        content: content,
      }); 
      toast.success('Your Comment added successfully');
      console.log("Comment added successfully:", response.data);
      getAnimalComments();
    } catch (error) {
      console.error("Error adding comment:", error); 
      toast.error('Failed to add comment');
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
          {comments.length > 0 ? (comments.map((comment: commentType) => (
            <div key={comment.id} className='flex gap-2 p-5'>
              <Image src={comment.userPhoto} alt='imgg' width={50} height={50} className='w-10 h-10 rounded-full' />
              <div className='flex flex-col'>
                <div className='flex items-center gap-2'>
                  <span className='font-bold text-lg'>{comment.firstName} {comment.lastName}</span>
                  <span className='text-gray-400 text-sm'>{dateConverter(comment.created_at)}</span>
                </div>
                <div className='flex flex-col gap-2 bg-white rounded-xl p-2'>
                  <p className='w-full'>{comment.content}</p>
                  <Stars rating={comment.rate} />
                </div>
              </div>
            </div>
          ))):( <h1 className='text-lg text-gray-500 flex items-center  justify-center'>No comments yet</h1>)}
        </div>
      </div>

      <div className='w-[35%] flex flex-col items-center bg-gray-200 rounded-lg gap-5 p-4'>
        <h1 className='text-3xl font-bold text-customGreen'>Leave a comment</h1>
        <Textarea placeholder='Write your comment here...' className='w-full h-[220px]' value={content} onChange={(e) => setContent(e.target.value)} />
        <div className='flex items-center justify-between w-full'>
          <StarRating initialRating={userRating} onRatingChange={handleRatingChange} />
          <Button className='bg-customPink text-white hover:bg-customBlue' onClick={handleSubmit}>Add Comment</Button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
