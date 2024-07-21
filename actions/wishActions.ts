import db from "@/db/drizzle";
import { wish, animal } from "@/db/schema";
import { asc } from 'drizzle-orm';
import { eq, and } from 'drizzle-orm';

export const getWishById = async (id: number) => {
    const result = await db.select().from(wish).where(eq(wish.id, id)).limit(1);
    if (result.length > 0) {
      return true
    } else {
      return false
    }
  };


export const checkWishExists = async (userId: number, animalId: number) => {
    const result = await db.select()
      .from(wish)
      .where(
        and(
          eq(wish.userId, userId),
          eq(wish.animalId, animalId)
        )
      );
    return result.length > 0;
  }; 



export const getData = async () => {
    const data = await db.select().from(wish).orderBy(asc(wish.id));
    return data;
  };



// get the animals wished by the user
export const getWishedAnimals = async (userId: number) => {
    const animals = await db.select().from(animal)
        .fullJoin(wish, eq(wish.animalId, animal.id))
        .where(eq(wish.userId, userId))
    return animals;
}  



export const addWish = async (id: number,
    userId : number,
    animalId : number) => {
  await db.insert(wish).values({
    id: id,
    userId: userId,
    animalId: animalId,
  });
}; 



export const deleteWish = async (id: number) => {
    await db.delete(wish).where(eq(wish.id, id));
  };



