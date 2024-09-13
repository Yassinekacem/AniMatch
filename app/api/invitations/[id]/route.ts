import { deleteInvitation, getInvitation, getInvitationById, getInvitationByReceiver, getTheInvitationById } from "@/actions/invitationActions";
import { NextRequest, NextResponse } from "next/server";
import { editInvitaion } from "@/actions/invitationActions";


export const GET = async (request: NextRequest ,context :{params : {id: number}}) => { 
    const id = context.params.id;
    try {
        const data = await getInvitationByReceiver(id);
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {  
        return NextResponse.json({ message: 'Error fetching invitations', error }, { status: 500 });
    
    }
};

export const DELETE = async (request: NextRequest, context: { params: { id: string } }) => {
    const id = parseInt(context.params.id);

    try {
        
        const existingInvitaion = await getInvitationById(id);
        if (!existingInvitaion) {
            return NextResponse.json({ message: 'invitation not found' }, { status: 404 });
        }


        await deleteInvitation(id);
        return NextResponse.json({ message: 'invitation deleted successfully' }, { status: 200 });


    } catch (error: any) {
        return NextResponse.json({ message: 'Error deleting invitation', error }, { status: 500 });


    }
}



export const PATCH = async (request: NextRequest, context: { params: { id: string } }) => {
  const id = parseInt(context.params.id);

  try {
    // Check if the invitation exists
    const existingInvitation = await getTheInvitationById(id);
    if (!existingInvitation) {
      return NextResponse.json({ message: 'Invitation not found' }, { status: 404 });
    }

    // Parse request body to get the new status
    const { status } = await request.json();
    if (!status || !["pended", "accepted", "rejected"].includes(status)) {
      return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

    // Update the invitation status
    await editInvitaion(id, status, existingInvitation.senderId, existingInvitation.receiverId, existingInvitation.animalId, existingInvitation.senderName, existingInvitation.senderPhoto, existingInvitation.animalName, existingInvitation.description, existingInvitation.images, existingInvitation.animalAge, existingInvitation.animalGender, existingInvitation.animalCity, existingInvitation.animalBreed, existingInvitation.animalVaccinated, existingInvitation.animalTrained, existingInvitation.animalFriendly, existingInvitation.animalSpecies);

    return NextResponse.json({ message: 'Invitation status updated successfully' }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ message: 'Error updating invitation', error }, { status: 500 });
  }
};