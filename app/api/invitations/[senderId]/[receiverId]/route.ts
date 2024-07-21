import { getInvitationBySenderIdAndReceiverId } from "@/actions/invitationActions";
import { NextRequest, NextResponse } from "next/server";





export const GET = async (request: NextRequest , context: { params: { senderId: string, receiverId: string } }) => {
    const senderId = parseInt(context.params.senderId);  
    const receiverId = parseInt(context.params.receiverId);  
    try {
        const invitation = await getInvitationBySenderIdAndReceiverId(senderId, receiverId);
        return NextResponse.json(invitation, { status: 200 });
    } catch (error : any) {
        return NextResponse.json({ message: 'Error getting invitation', error }, { status: 500 });
    }

}