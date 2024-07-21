import { deleteInvitation, getInvitation, getInvitationById } from "@/actions/invitationActions";
import { NextRequest, NextResponse } from "next/server";






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