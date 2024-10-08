"use client"; 
import { getCurrentUserWithDetails } from '@/actions/userActions';
import React, { useEffect, useState , useCallback } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import PetCard from '@/components/PetCard';
import { Button } from '@/components/ui/button';
import { animalType } from '@/types/animalType';
import Comments from '@/components/Comments';
import Stars from '@/components/Stars';
import Loader from '@/components/Loader';
import GetStarted from '@/components/getStarted';
const Detail = () => {
    const [pet, setPet] = useState<animalType | null>(null);
    const [currentImage, setCurrentImage] = useState<string>("");
    const { id } = useParams(); 
    const [userDetails, setUserDetails] = useState<any>(null);
    const [totalComments, setTotalComments] = useState<number>(0);
    const [avgRating, setAvgRating] = useState<number>(0);
    const [animals, setAnimals] = useState<animalType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const petsPerPage = 4;

    const getAnimal = useCallback(async () => {
        if (!id) return;
        try {
          const response = await axios.get(`api/animals/${id}`);
          setPet(response.data[0] || null);
          setTotalComments(response.data.totalComments);
          setAvgRating(response.data.avgRating);
        } catch (error) {
          console.error("Error fetching animals:", error);
        }
      }, [id]); 
      useEffect(() => {
        getAnimal();
      }, [getAnimal]);

      
    useEffect(() => {
        const fetchUserDetails = async () => {
          const userDetails = await getCurrentUserWithDetails();
          setUserDetails(userDetails);
        };
        fetchUserDetails();
      }, []);

  

    useEffect(() => {
        if (pet && pet.image && pet.image.length > 0) {
            setCurrentImage(pet.image[0]);
        }
    }, [pet]);

    const getAnimals = async () => {
        try {
            const response = await axios.get("api/animals");
            setAnimals(response.data);
        } catch (error) {
            console.error("Error fetching animals:", error);
        }
    };

    useEffect(() => {
        getAnimals();
    }, []);

    if (!pet) return <Loader />;

    const handleNext = () => {
        if (currentPage < Math.ceil(filteredAnimals.length / petsPerPage) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const filteredAnimals = animals.filter((item: animalType) => item.breed === pet.breed && item.id !== pet.id);
    const currentAnimals = filteredAnimals.slice(currentPage * petsPerPage, (currentPage + 1) * petsPerPage);

    const handleImageClick = (image: string) => {
        setCurrentImage(image);
    };

    const isImageGray = (image: string) => {
        return image !== currentImage;
    }; 


    const data = { 
        animalId : pet.id,  
        animalName : pet.name ,  
        receiverId : pet.ownerId , 
        animalGender : pet.gender , 
        animalSpecies : pet.species ,

    }

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
                        <Stars rating={avgRating} />
                        <span className='text-gray-500'>{totalComments} user {totalComments > 1 ? 'reviews' : 'review'}</span>
                    </div>
                </div>
            </div>

            <div className='flex gap-6 mt-3'>
                <div className='flex-2 flex flex-col gap-2'>
                    <Image src={currentImage || pet.image[0]} alt="" width={450} height={350} className='w-[808px] h-[414px] rounded-md' />
                    <div className='flex gap-4 p-2'>
                        {pet.image.slice(0, 4).map((image, index) => (
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

                        {pet.species == "Dog" ? <div className='flex gap-2 items-center'>
                            <Image src="/icons/trained.svg" alt="logo" width={150} height={80} className='w-[30px] h-[30px]' />
                            <span className='text-xl'>{pet.trained ? 'House-Trained' : 'Not House-Trained'}</span>
                        </div> : <div></div>}

                        <div className='w-[80%] bg-gray-100 rounded-lg p-2 flex flex-col gap-3'>
                            <h1 className='text-customGreen font-bold text-2xl'>Description</h1>
                            <p className='line-clamp-6'>
                                {pet.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <GetStarted  data = {data} />
            </div>

            <Comments petId={pet.id} />

            <div className='flex flex-col gap-5 items-center justify-center mt-4'>
                <h1 className='text-customGreen text-xl'>Similar Pets</h1>
                <div className='flex gap-5'>
                    {currentAnimals.map((item: animalType) => (
                        <PetCard key={item.id} item={item} />
                    ))}
                </div>
                <div className='flex justify-between w-full max-w-md mt-4'>
                    <Button onClick={handlePrev} disabled={currentPage === 0} className='bg-customPink text-white hover:bg-customPink'>
                        Previous
                    </Button>
                    <Button onClick={handleNext} disabled={currentPage >= Math.ceil(filteredAnimals.length / petsPerPage) - 1} className='bg-customPink text-white hover:bg-customPink'>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Detail;