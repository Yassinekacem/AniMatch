import db from "@/db/drizzle";
import {  user } from "@/db/schema";
import { asc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';




export const getUser = async (id: number) => {
  const data = await db.select().from(user).where(eq(user.id, id));
  return data;

}

export const getData = async () => {
  const data = await db.select().from(user).orderBy(asc(user.id));
  return data;
};

export const addUser = async (id: number,
    name: string,
    lastname: string,
    password: string,
    email: string,
    image: string) => {
  await db.insert(user).values({
    id: id,
    name: name,
    lastname: lastname,
    password: password,
    email: email,
    image: image,
  });
};





export const editUser = async (id: number,
    name: string,
    lastname: string,
    password: string,
    email: string,
    image: string,) => {
  await db
    .update(user)
    .set({
        id: id,
        name: name,
        lastname: lastname,
        password: password,
        email: email,
        image: image
    })
    .where(eq(user.id, id));
};
 





export const deleteUser = async (id: number) => {
  await db.delete(user).where(eq(user.id, id));
};

