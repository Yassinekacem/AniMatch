import db from "@/db/drizzle";
import {  invitation } from "@/db/schema";
import { asc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { ClientPageRoot } from "next/dist/client/components/client-page";






export const getInvitationBySenderIdAndReceiverId = async (senderId: number, receiverId: number) => { 
    try {
        const data = await db.select().from(invitation).where(eq(invitation.senderId, senderId) && eq(invitation.receiverId, receiverId));
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching invitation:', error);
        throw error;
    }
};



export const getInvitation = async (id: number) => {
  const data = await db.select().from(invitation).where(eq(invitation.id, id));
  return data;

}


export const getData = async () => {
  const data = await db.select().from(invitation).orderBy(asc(invitation.id));
  return data;
};

export const addInvitation = async (id: number,
    status: "pended" | "accepted" | "rejected",
    date: Date,
    senderId: number,
    receiverId: number,
    animalId: number) => {
  await db.insert(invitation).values({
    id: id,
    status: status,
    date: date.toISOString(),
    senderId: senderId,
    receiverId: receiverId,
    animalId: animalId,
  });
};





export const editInvitaion = async (id: number,
    status: "pended" | "accepted" | "rejected",
    date: Date,
    senderId: number,
    receiverId: number,
    animalId: number) => {
  await db
    .update(invitation)
    .set({
        id: id,
    status: status,
    date: date.toISOString(),
    senderId: senderId,
    receiverId: receiverId,
    animalId: animalId,
    })
    .where(eq(invitation.id, id));
};
 





export const deleteInvitation = async (id: number) => {
  await db.delete(invitation).where(eq(invitation.id, id));
};

