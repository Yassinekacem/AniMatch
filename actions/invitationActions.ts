import db from "@/db/drizzle";
import {  invitations } from "@/db/schema";
import { asc } from 'drizzle-orm';
import { eq , and} from 'drizzle-orm';
import { revalidatePath } from "next/cache";




// Check if the invitation exists or not with this attributes (senderId, receiverId, animalId) 
export const checkInvitationExists = async (senderId: number, receiverId: number, animalId: number) => {
  const result = await db.select()
    .from(invitations)
    .where(
      and(
        eq(invitations.senderId, senderId),
        eq(invitations.receiverId, receiverId),
        eq(invitations.animalId, animalId)
      )
    );
  return result.length > 0;
}; 


// check if the invitation exists or not with this id
export const getInvitationById = async (id: number) => {
  const result = await db.select().from(invitations).where(eq(invitations.id, id)).limit(1);
  if (result.length > 0) {
    return true
  } else {
    return false
  }
};

// get the invitation by id
export const getInvitation = async (id: number) => {
  const data = await db.select().from(invitations).where(eq(invitations.id, id));
  return data;

}

// get all invitations
export const getAllInvitations = async () => {
  const data = await db.select().from(invitations).orderBy(asc(invitations.id));
  return data;
}; 

//add new invitation
export const addInvitation = async (id: number,
    status: "pended" | "accepted" | "rejected",
    date: Date,
    senderId: number,
    receiverId: number,
    animalId: number) => {
  await db.insert(invitations).values({
    id: id,
    status: status,
    date: date.toISOString(),
    senderId: senderId,
    receiverId: receiverId,
    animalId: animalId,
  });
  revalidatePath("/");

};




//update the invitation by id
export const editInvitaion = async (id: number,
    status: "pended" | "accepted" | "rejected",
    date: Date,
    senderId: number,
    receiverId: number,
    animalId: number) => {
  await db
    .update(invitations)
    .set({
        id: id,
    status: status,
    date: date.toISOString(),
    senderId: senderId,
    receiverId: receiverId,
    animalId: animalId,
    })
    .where(eq(invitations.id, id));
    revalidatePath("/");

};
 




//delete the invitation by id
export const deleteInvitation = async (id: number) => {
  await db.delete(invitations).where(eq(invitations.id, id));
  revalidatePath("/");

};

