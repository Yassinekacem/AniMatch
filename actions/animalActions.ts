import {db} from "@/db/drizzle";
import { animals } from "@/db/schema";
import { asc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import {revalidatePath} from "next/cache";


export const getAnimalById = async (id: number) => {
  const result = await db.select().from(animals).where(eq(animals.id, id)).limit(1);
  if (result.length > 0) {
    return true
  } else {
    return false
  }
};


export const getById = async (id: number) => { 
  const data = await db.select().from(animals).where(eq(animals.id, id));
  return data;
 } 


export const getData = async () => {
  const data = await db.select().from(animals).orderBy(asc(animals.id));
  return data;
};

export const addAnimal = async (
  id : number,
  breed: string,
  species: "Dog" | "Cat",
  name: string,
  age: number,
  vaccinated: boolean,
  trained: boolean,
  friendly: boolean,
  available: boolean,
  description: string,
  image: string,
  ownerId: number
) => {
  await db.insert(animals).values({ 
    id: id,
    breed: breed,
    species: species,
    name: name,
    age: age,
    vaccinated: vaccinated,
    trained: trained,
    friendly: friendly,
    available: available,
    description: description,
    image: image ,
    ownerId: ownerId
  }); 
  revalidatePath("/");
};





export const editAnimal = async (id: number,
  breed: string,
  species: "Dog" | "Cat",
  name: string,
  age: number,
  vaccinated: boolean,
  trained: boolean,
  friendly: boolean,
  available: boolean,
  description: string,
  image: string ) => {
  await db
    .update(animals)
    .set({
      id: id,
      breed: breed,
      species: species,
      name: name,
      age: age,
      vaccinated: vaccinated,
      trained: trained,
      friendly: friendly,
      available: available,
      description: description,
      image: image
    })
    .where(eq(animals.id, id));
    revalidatePath("/");

};
 





export const deleteAnimal = async (id: number) => {
  await db.delete(animals).where(eq(animals.id, id));
  revalidatePath("/");
};






