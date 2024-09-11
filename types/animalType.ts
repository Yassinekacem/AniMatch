// types/animalType.ts

export type animalType = {
  id: number;
  breed: string;
  gender: string;
  species: string;
  name: string;
  city: string;
  age: number;
  vaccinated: boolean;
  trained: boolean;
  friendly: boolean;
  available: boolean;
  description: string;
  image: string[];
  ownerId: number;
  totalComments?: number; 
  avgRating?: number; 
};


export type FetchedAnimalData = {
  animals: animalType;
  wishs: {
    id: number;
    userId: number;
    animalId: number;
  };
};
 


export type dataAnimal = { 
  animalName: string; 
  animalId: number;  
  receiverId: number; 
  animalGender: string;
  animalSpecies: string;
};
