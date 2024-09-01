import { db } from "@/db/drizzle";
import { animals } from "@/db/schema";
import { and, asc, desc, eq, ilike } from 'drizzle-orm';
import { revalidatePath  } from "next/cache";


export const getDogsByowner = async (id: number) => {
  const data = await db.select().from(animals).where(and(eq(animals.species, "Dog"),eq(animals.ownerId, id)));
  return data;
};

export const getCatsByowner = async (id: number) => {
  const data = await db.select().from(animals).where(and(eq(animals.species, "Cat"),eq(animals.ownerId, id))).orderBy(desc(animals.id));
  return data;
};



export const getAnimalById = async (id: number) => {
  const result = await db.select().from(animals).where(eq(animals.id, id)).limit(1);
  return result.length > 0;
};

export const getById = async (id: number) => {
  const data = await db.select().from(animals).where(eq(animals.id, id));
  return data;
};



export const getData = async () => {
  const data = await db.select().from(animals).orderBy(asc(animals.id));
  return data;
};


// Enum Types 
type Species = "Dog" | "Cat";
type Breed = "Labrador" | "Rottweiler" | "Berger Allemand" | "Berger noir" | 
  "Malinois" | "Husky" | "Caniche" | "Chihuahuah" | "Dobermann" | "Pitbull" | 
  "Bichon" | "Others" | "Siamois" | "Persan" | "Bengal" | "Scottish Fold" | 
  "Ragdoll" | "sphynx" | "snowshoe" | "himalayan";
type City = "Tunis" | "Ariana" | "Ben Arous" | "Manouba" | "Nabeul" | "Zaghouan" |
  "Bizerte" | "Beja" | "Jendouba" | "Kef" | "Siliana" | "Kairouan" | "Sousse" |
  "Mahdia" | "Monastir" | "Sfax" | "Gabes" | "Mednine" | "Tozeur" | "Gafsa" | 
  "Kasserine" | "Sidi Bouzid" | "Tataouine" | "Gbelli";

export const addAnimal = async (
  id: number,
  breed: Breed,
  species: Species,
  name: string,
  age: number,
  city: City,
  gender: string,
  vaccinated: boolean,
  trained: boolean,
  friendly: boolean,
  available: boolean,
  description: string,
  image: string[],
  ownerId: number
) => {
  console.log({
    id,
    breed,
    species,
    name,
    age,
    city,
    gender,
    vaccinated,
    trained,
    friendly,
    available,
    description,
    image,
    ownerId
  });

  await db.insert(animals).values({
    id,
    breed,
    species,
    name,
    age,
    city,
    gender,
    vaccinated,
    trained,
    friendly,
    available,
    description,
    image,
    ownerId
  });
  revalidatePath("/");
};

export const editAnimal = async (
  id: number,
  breed: Breed,
  species: Species,
  name: string,
  age: number,
  city: City,
  vaccinated: boolean, 
  gender : string,   
  trained: boolean,
  friendly: boolean,
  available: boolean,
  description: string,
  image: [string]
) => {
  await db
    .update(animals)
    .set({
      id,
      breed,
      species,
      name, 
      gender , 
      age,
      city,
      vaccinated,
      trained,
      friendly,
      available,
      description,
      image
    })
    .where(eq(animals.id, id));
  revalidatePath("/");
};

export const deleteAnimal = async (id: number) => {
  await db.delete(animals).where(eq(animals.id, id));
  revalidatePath("/");
};
