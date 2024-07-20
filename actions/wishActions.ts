import db from "@/db/drizzle";
import { wish } from "@/db/schema";
import { asc, eq } from "drizzle-orm";





export const getData = async () => {
    const data = await db.select().from(wish).orderBy(asc(wish.id));
    return data;
};

export const addWish = async (userId: number, animalId: number) => {
    await db.insert(wish).values({
        userId: userId,
        animalId: animalId,
    })
};

export const deleteWish = async( id:number) =>{
    await db.delete(wish).where(eq(wish.id,id));
}
