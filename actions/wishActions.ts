import {db} from "@/db/drizzle";
import { wishs, animals } from "@/db/schema";
import { asc } from 'drizzle-orm';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from "next/cache";

export const getWishById = async (id: number) => {
    const result = await db.select().from(wishs).where(eq(wishs.id, id)).limit(1);
    if (result.length > 0) {
      return true
    } else {
      return false
    }
  };


export const checkWishExists = async (userId: number, animalId: number) => {
    const result = await db.select()
      .from(wishs)
      .where(
        and(
          eq(wishs.userId, userId),
          eq(wishs.animalId, animalId)
        )
      );
    return result.length > 0;
  }; 



export const getData = async () => {
    const data = await db.select().from(wishs).orderBy(asc(wishs.id));
    return data;
  };



// get the animals wished by the user
export const getWishedAnimals = async (userId: number) => {
    const Animals = await db.select().from(animals)
        .fullJoin(wishs, eq(wishs.animalId, animals.id))
        .where(eq(wishs.userId, userId))
    return Animals;
}  



export const addWish = async (id: number,
    userId : number,
    animalId : number) => {
  await db.insert(wishs).values({
    id: id,
    userId: userId,
    animalId: animalId,
  }); 
  revalidatePath("/");

}; 



export const deleteWish = async (id: number) => {
    await db.delete(wishs).where(eq(wishs.id, id));
    revalidatePath("/");

  };



