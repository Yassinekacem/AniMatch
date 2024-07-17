import db from "@/db/drizzle";
import { animal } from "@/db/schema";
import { asc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';



export const getById = async (id: number) => { 
  const data = await db.select().from(animal).where(eq(animal.id, id));
  return data;
 } 


export const getData = async () => {
  const data = await db.select().from(animal).orderBy(asc(animal.id));
  return data;
};

export const addAnimal = async (
  id: number,
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
  await db.insert(animal).values({
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
    .update(animal)
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
    .where(eq(animal.id, id));
};
 





export const deleteAnimal = async (id: number) => {
  await db.delete(animal).where(eq(animal.id, id));
};
