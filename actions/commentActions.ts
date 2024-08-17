import { db } from "@/db/drizzle";
import { comments } from "@/db/schema"; 
import { asc } from "drizzle-orm";



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