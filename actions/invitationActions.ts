import db from "@/db/drizzle";
import {  invitation } from "@/db/schema";
import { asc } from 'drizzle-orm';
import { eq , and} from 'drizzle-orm';




// Check if the invitation exists or not with this attributes (senderId, receiverId, animalId) 
export const checkInvitationExists = async (senderId: number, receiverId: number, animalId: number) => {
  const result = await db.select()
    .from(invitation)
    .where(
      and(
        eq(invitation.senderId, senderId),
        eq(invitation.receiverId, receiverId),
        eq(invitation.animalId, animalId)
      )
    );
  return result.length > 0;
}; 


// check if the invitation exists or not with this id
export const getInvitationById = async (id: number) => {
  const result = await db.select().from(invitation).where(eq(invitation.id, id)).limit(1);
  if (result.length > 0) {
    return true
  } else {
    return false
  }
};

// get the invitation by id
export const getInvitation = async (id: number) => {
  const data = await db.select().from(invitation).where(eq(invitation.id, id));
  return data;

}

// get all invitations
export const getAllInvitations = async () => {
  const data = await db.select().from(invitation).orderBy(asc(invitation.id));
  return data;
}; 

//add new invitation
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




//update the invitation by id
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
 




//delete the invitation by id
export const deleteInvitation = async (id: number) => {
  await db.delete(invitation).where(eq(invitation.id, id));
};

