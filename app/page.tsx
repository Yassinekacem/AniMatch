"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import gsap from 'gsap'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useUser } from "@clerk/nextjs";

const Home = () => {
  const [species, setSpecies] = useState('');
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    gsap.fromTo(
      '.background-image',
      { scale: 1.1, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.dog-image',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.clickable',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out' }
    );
  }, []);

  const handleButtonClick = () => {  
    if (!isSignedIn) {
      toast.error('You need to sign in to continue');
    }
    if (!species) 
    {
      toast.error('Please select a species to continue');
    }
    if (species === 'dog') {
      router.push('/addDog');
    } else if (species === 'cat') {
      router.push('/addCat');
    } else {
      router.push('/'); // Default path if no species is selected
    }
  };

  return (
    <div className='h-[92vh] flex items-center justify-between w-[80%] mx-auto bg-white-a'>
      <div className='flex flex-col absolute h-full'>
        <Image src="/images/pas.png" alt="pas" width={50} height={20} className='w-[150px] z-1 relative top-[75px] right-[80px]' />
        <div className='w-[50%] flex flex-col gap-[40px] h-[70%] z-10'>
          <h1 className='bold-52 font-sansss'>Connect your pet with his Ideal partner</h1>
          <p className='font-light'>Choose your pet&apos;s species to start finding their perfect match.</p>
          <div>
            <Select onValueChange={(value) => setSpecies(value)}>
              <SelectTrigger className="w-[440px] border border-black">
              <SelectValue placeholder="Select your pet&apos;s species" />
                            </SelectTrigger>
              <SelectContent className='mb-5'>
                <SelectItem value="cat">Cat</SelectItem>
                <SelectItem value="dog">Dog</SelectItem>
              </SelectContent>
            </Select>
           
          </div> 
          <div className='mx-auto '> 
          <Button className="w-1/ mx-[70px] bg-customBlue rounded-full text-md" onClick={handleButtonClick}>
            {species === 'dog' ? 'Match Your Dog' : species === 'cat' ? 'Match Your Cat' : 'Match Your Pet'}
          </Button>
          </div>
         
          <div className='clickable absolute'>
            <Image src="/images/Group.png" alt='img' width={60} height={20} className='w-[60px] relative top-[435px] left-[210px]' />
            <span className='text-customPink relative top-[425px] left-[275px] font-bold text-md'>Click here !</span>
          </div>
        </div>
      </div>
      <div className='flex absolute'>
        <Image src="/images/fondhome.png" alt='img' width={350} height={350} className='background-image w-[650px] h-[650px] z-1 relative left-[650px] top-[20px]' />
        <Image src="/images/dog.png" alt='img' width={350} height={350} className='dog-image w-[650px] h-[650px] z-10 relative left-[50px]' />
      </div>
    </div>
  )
}

export default Home