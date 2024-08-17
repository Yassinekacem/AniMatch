import { db } from "@/db/drizzle";
import { comments } from "@/db/schema"; 
import { asc, eq } from "drizzle-orm";

export const animalComments = async (animalId: number) => {
    const data = await db.select().from(comments).where(eq(comments.animalId,animalId));
    return data;
  }
;


export const getData = async () => {
    const data = await db.select().from(comments).orderBy(asc(comments.id));
    return data;
  }; 


export const addComment = async (
    id: number,
    userId: number,
    content: string,
    rate: number,
    animalId: number
  ) => {
    await db.insert(comments).values({
      id,
      userId,
      content,
      rate,
      animalId
    });
  };