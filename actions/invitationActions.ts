import {db} from "@/db/drizzle";
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
// get the invitation by receiver id
export const getInvitationByReceiver = async (receiverId: number) => {
  const data = await db.select().from(invitations).where(eq(invitations.receiverId, receiverId));
  return data;

} 




// get all invitations
export const getAllInvitations = async () => {
  const data = await db.select().from(invitations).orderBy(asc(invitations.id));
  return data;
}; 

//add new invitation
export const addInvitation = async (
  status: "pended" | "accepted" | "rejected",
  senderId: number,
  receiverId: number,
  animalId: number,
  senderName: string,
  senderPhoto: string,
  animalName: string,
  description: string,
  images: string[],
  animalAge: number,
  animalGender: string,
  animalCity: string,
  animalBreed: string,
  animalVaccinated: boolean,
  animalTrained: boolean,
  animalFriendly: boolean,
  animalSpecies: string,
  NumTel: string,
) => {
  await db.insert(invitations).values({
    status,
    senderId,
    receiverId,
    animalId,
    senderName,
    senderPhoto,
    animalName,
    description,
    images,
    animalAge,
    animalGender,
    animalCity,
    animalBreed,
    animalVaccinated,
    animalTrained,
    animalFriendly,
    animalSpecies, 
    NumTel,
  });
  revalidatePath("/");
};



//update the invitation by id
export const editInvitaion = async (id: number,
    status: "pended" | "accepted" | "rejected",
    senderId: number,
    receiverId: number,
    animalId: number ,  
    senderName : string , 
    senderPhoto : string , 
    animalName : string , 
    description : string , 
    images : string[] , 
    animalAge: number , 
    animalGender: string , 
    animalCity: string , 
    animalBreed: string , 
    animalVaccinated : boolean , 
    animalTrained : boolean , 
    animalFriendly : boolean , 
    animalSpecies : string , 

  ) => {
  await db
    .update(invitations)
    .set({
        id: id,
    status: status,
    senderId: senderId,
    receiverId: receiverId,
    animalId: animalId, 
    senderName : senderName , 
    senderPhoto : senderPhoto , 
    animalName : animalName , 
    description : description , 
    images : images ,  
    animalAge: animalAge , 
    animalGender: animalGender , 
    animalCity: animalCity , 
    animalBreed: animalBreed ,
    animalVaccinated : animalVaccinated , 
    animalTrained : animalTrained , 
    animalFriendly : animalFriendly , 
    animalSpecies : animalSpecies , 
    })
    .where(eq(invitations.id, id));
    revalidatePath("/");

};
 




//delete the invitation by id
export const deleteInvitation = async (id: number) => {
  await db.delete(invitations).where(eq(invitations.id, id));
  revalidatePath("/");

};

