import { db } from "@/db/drizzle";
import { comments } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export const getData = async () => {
  const data = await db.select().from(comments).orderBy(asc(comments.id));
  return data;
};

export const getCommentsByAnimal = async (animalId: number) => {
  const result = await db.select().from(comments).where(eq(comments.animalId, animalId));
  return result;
};

export const addComment = async (
  userId: number,
  content: string, 
  rate: number,
  animalId: number,
  userPhoto: string,
  firstName: string,
  lastName: string  
) => {
  await db.insert(comments).values({
    userId, 
    content,
    rate,
    animalId,
    userPhoto,
    firstName,
    lastName
  });
};
