
"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenusMars } from '@fortawesome/free-solid-svg-icons';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import PetCard from '@/components/PetCard';
import { Button } from '@/components/ui/button';
import { animalType } from '@/types/animalType';

const Detail = () => {
    const [pet, setPet] = useState<animalType | null>(null);
    const [currentImage, setCurrentImage] = useState<string>(""); // State to manage the current image
    const { id } = useParams();

    const getAnimal = async () => {
        if (!id) return;
        try {
            const response = await axios.get(`http://localhost:3000/api/animals/${id}`);
            setPet(response.data[0] || null);
        } catch (error) {
            console.error("Error fetching animals:", error);
        }
    };

    useEffect(() => {
        getAnimal();
    }, [id]);

    useEffect(() => {
        if (pet && pet.image && pet.image.length > 0) {
            setCurrentImage(pet.image[0]); // Set the initial main image
        }
    }, [pet]);

    const [animals, setAnimals] = useState([]); 
  const getAnimals = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/animals");
      setAnimals(response.data); 
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };
  useEffect(() => {
    getAnimals();
  }, []);  

  

    if (!pet) return <div className='flex justify-center items-center text-xl font-bold h-screen'>Loading...</div>;

    // Handler to change the current image
    const handleImageClick = (image: string) => {
        setCurrentImage(image);
    };

    // Function to determine if an image should be grayed out
    const isImageGray = (image: string) => {
        return image !== currentImage;
    };

    return (
        <div className='m-10'>
            <div className='flex items-center gap-2'>
                <div className='inline-block p-1 rounded-full border-2 border-dotted border-gray-300'>
                    <Image
                        src={pet.image[0]}
                        alt='dog'
                        width={70}
                        height={70}
                        className='rounded-full w-16 h-16 m-1'
                    />
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-customGreen font-md text-2xl'>{pet.name}</h1>
                    <div>
                        <span>Pet ID: </span> <span className='text-customGreen'>{pet.id}</span>
                    </div>
                </div>
            </div>

            <div className='flex gap-6 mt-3'>
                <div className='flex-2 flex flex-col gap-2'>
                    <Image src={currentImage ||  pet.image[0]} alt="" width={450} height={350} className='w-[808px] h-[414px] rounded-md' />
                    <div className='flex gap-4 p-2'>
                    {[
                            pet.image[0],
                            pet.image[1],
                            pet.image[2],
                            pet.image[3],
                         
                        ].map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt='thumbnail'
                                width={120}
                                height={120}
                                className={`w-[184px] h-[122px] rounded-md cursor-pointer ${isImageGray(image) ? 'grayscale' : ''}`}
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                    </div>
                </div>

                <div className='flex-1 flex flex-col gap-8 '>


                {/* <div className='flex flex-col gap-1 items-center justify-center'>
                    <Image src="/icons/female.png" alt='gender' width={50} height={50} className='w-9 h-9 relative top-[20px]' />
                    <Image src="/icons/Semicircular.png" alt='cir' width={50} height={50} className='w-[50px] h-9' />
                    <span className='text-md text-gray-400'>Gender</span>
                    <span className='text-customPink font-semibold'>{pet.gender}</span>
                </div>

                <div className='flex flex-col gap-1 items-center justify-center'>
                    <Image src="/icons/breed.png" alt='gender' width={50} height={50} className='w-9 h-9 relative top-[20px]' />
                    <Image src="/icons/Semicircular.png" alt='cir' width={50} height={50} className='w-[50px] h-9' />
                    <span className='text-md text-gray-400'>Breed</span>
                    <span className='text-customPink font-semibold'>{pet.breed}</span>
                </div>

                <div className='flex flex-col gap-1 items-center justify-center'>
                    <Image src="/icons/watch_later.png" alt='gender' width={50} height={50} className='w-9 h-9 relative top-[20px]' />
                    <Image src="/icons/Semicircular.png" alt='cir' width={50} height={50} className='w-[50px] h-9' />
                    <span className='text-md text-gray-400'>Age</span>
                    <span className='text-customPink font-semibold'>14 month</span>
                </div> */}

               
                    

                    <div className='flex flex-col gap-7'>  
                    <div className='flex gap-2 items-center '>
                        <Image src="/icons/position.svg" alt="logo" width={150} height={40} className='w-8 h-8' />
                        <span className='text-xl'>this {pet.species} is living on {pet.city}</span>
                        </div>

                    <div className='flex gap-2 items-center'>
                        <Image src="/icons/genderIcon.svg" alt="logo" width={150} height={40} className='w-8 h-8' />
                        <span className='text-xl'> Gender :{pet.gender}</span>
                        </div>


                        <div className='flex gap-2 items-center'>
                        <Image src="/icons/pawIcon.svg" alt="logo" width={150} height={40} className='w-8 h-8' />
                        <span className='text-xl'>Breed : {pet.breed}</span>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <Image src="/icons/friendlyIcon.svg" alt="logo" width={150} height={40} className='w-8 h-8' />
                            <span className='text-xl'>Can live with other children of any age</span>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <Image src="/icons/vaccinIcon.svg" alt="logo" width={150} height={80} className='w-[30px] h-[30px]' />
                            <span className='text-xl'>{pet.vaccinated ? 'Vaccinated' : 'Not vaccinated'}</span>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <Image src="/icons/trained.svg" alt="logo" width={150} height={80} className='w-[30px] h-[30px]' />
                            <span className='text-xl'>{pet.trained ? 'House-Trained' : 'Not House-Trained'}</span>
                        </div>

                        

            <div className='w-[80%] bg-gray-100 rounded-lg p-2 flex flex-col gap-3'>
                        <h1 className='text-customGreen font-bold text-2xl'>Description</h1>
                        <p className='line-clamp-6'>
                            We have had Magie since she was able to leave her mum as a puppy so 8 weeks old. Magie currently lives with two children age 7 and 13 and has many visitors to the house which are children she is great with kids. There are lots of cats, birds, etc., around the area and in the garden on most days as she's not fussed by these.
                        </p>
                    </div>

                        
                       
                    </div>
                </div>
            </div>

           

            <div className='mt-2 flex items-center justify-center'>
                <div className='w-1/4 border border-slate-400 flex flex-col items-center p-2 rounded-lg gap-2'>
                    <span className='font-bold'>If you are interested to match</span>
                    <Button className='bg-customPink text-white hover:bg-customPink'>Get started</Button>
                </div>
            </div>

            <div className='flex flex-col gap-5 items-center justify-center mt-4'>
                <h1 className='text-customGreen text-xl'>Similar Pets</h1>
                <div className='flex gap-5 flex-wrap'> 
                    
                           {animals
                            .filter((item : animalType ) => item.breed === pet.breed) // Filtrage des animaux dont la race est "Dog"
                            .slice(0, 4) 
                            .map((item: animalType) => (
                                <PetCard key={item.id} item={item} />
                            ))
                    }
                
                </div>
            </div>
        </div>
    );
};

export default Detail;
