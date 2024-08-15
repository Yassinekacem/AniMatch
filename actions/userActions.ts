"use server";
import {asc, eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {db} from "@/db/drizzle";
import {users , animals} from "@/db/schema"; 
import { clerkClient } from "@clerk/nextjs/server";



import { currentUser } from "@clerk/nextjs/server";

export async function getCurrentUserWithDetails() {
  const user = await currentUser();
  if (!user) return null;
  const userDetails = await getUser(user.id);
  return userDetails ? userDetails[0] : null;
}


export const getData = async () => {
  const data = await db.select().from(users).orderBy(asc(users.id));
  return data;
};



export const getUser = async (userId: any) => {
const user = await db.query.users.findMany(
  {
    where : (users , {eq}) => eq(users.clerkId , userId) , 
    with  : {
      animals: true,
    }
  }
)
return user

}

export const getAllUsers = async () => {
  const data = await db.select().from(users);
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