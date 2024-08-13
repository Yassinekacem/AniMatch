import { db } from "@/db/drizzle";
import { animals } from "@/db/schema";
import { asc, eq, ilike } from 'drizzle-orm';
import { revalidatePath } from "next/cache";

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

export const addAnimal = async (
  id: number,
  breed: string,
  species: "Dog" | "Cat",
  name: string,
  age: number,
  city: string,
  gender: string,
  vaccinated: boolean,
  trained: boolean,
  friendly: boolean,
  available: boolean,
  description: string,
  image: [string],
  ownerId: number
) => {
  await db.insert(animals).values({
    id,
    breed,
    species,
    name,
    age,
    gender,
    city,
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
  breed: string,
  species: "Dog" | "Cat",
  name: string,
  age: number,
  city: string,
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
