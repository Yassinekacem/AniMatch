import db from "@/db/drizzle";
import {  users } from "@/db/schema";
import { asc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { revalidatePath } from "next/cache";

export const getUserlById = async (id: number) => {
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  if (result.length > 0) {
    return true
  } else {
    return false
  }
};


export const getUser = async (id: number) => {
  const data = await db.select().from(users).where(eq(users.id, id));
  return data;

}

export const getData = async () => {
  const data = await db.select().from(users).orderBy(asc(users.id));
  return data;
};

export const addUser = async (user : any) => {
  await db.insert(users).values({ 
    clerkId : user?.clerkId,
    email : user?.email,
    name : user?.name!,  
    firstName : user?.firstName,  
    lastName : user?.lastName,
    photo : user?.photo
  })
  .returning({clerkClientId : users?.clerkId})
  // revalidatePath("/");
};





export const editUser = async (user : any , id : number) => {
  await db
    .update(users)
    .set({
      clerkId : user?.clerkId,
      email : user?.email,
      name : user?.name!,  
      firstName : user?.firstName,  
      lastName : user?.lastName,
      photo : user?.photo
    })
    .where(eq(user.id, id));
    revalidatePath("/");

};
 





export const deleteUser = async (id: number) => {
  await db.delete(users).where(eq(users.id, id));
  revalidatePath("/");

};

