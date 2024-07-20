import { getAnimalById, getById } from "@/actions/animalActions";
import { addInvitation, getData, getInvitationBySenderIdAndReceiverId } from "@/actions/invitationActions";
import { count } from "console";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const data = await getData();
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ message: 'Error fetching data', error }, { status: 500 });
    }
};

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { id, status, date, senderId, receiverId, animalId } = body;
        // Validation de base
        if (!senderId || !receiverId || !animalId) {
            return NextResponse.json("Missing required parameters");
        }


        const existingAnimal = await getAnimalById(animalId);
        if (!existingAnimal) {
            return NextResponse.json("Animal not found");
        }

        const [animal] = await getById(animalId);
        const [invitation] = await getInvitationBySenderIdAndReceiverId(senderId, receiverId);
        const ownerId = animal.ownerId;

        if (ownerId !== receiverId) {
            return NextResponse.json("You can't invite someone who doesn't own the animal");
        }

       
        // Utiliser la date actuelle si aucune date n'est fournie
        const invitationDate = date ? new Date(date) : new Date();



        await addInvitation(id, status, invitationDate, senderId, receiverId, animalId);
        return NextResponse.json({ message: 'Invitation added successfully' }, { status: 200 });
    } catch (error: any) {
        console.error("Error adding invitation:", error);
        return NextResponse.json({ message: 'Error adding invitation', error }, { status: 500 });
    }
};
