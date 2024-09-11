import { deleteInvitation, getInvitation, getInvitationById, getInvitationByReceiver } from "@/actions/invitationActions";
import { NextRequest, NextResponse } from "next/server";


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