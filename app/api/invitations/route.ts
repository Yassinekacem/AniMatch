import { getAnimalById, getById } from "@/actions/animalActions";
import { addInvitation , checkInvitationExists, getAllInvitations } from "@/actions/invitationActions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const data = await getAllInvitations();

    const response = NextResponse.json(data, { status: 200 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: 'Error fetching data', error }, { status: 500 });
  }
};


export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const {  status, senderId, receiverId, animalId  , senderName , senderPhoto , animalName , description , images , animalAge , animalSpecies , animalGender , animalBreed , animalCity , animalVaccinated , animalTrained , animalFriendly , NumTel} = body;

    // Validation des champs obligatoitres
    if (!senderId || !receiverId || !animalId) {
      return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
    }

    // verifier si l'animal existe deja ou non 
    const existingAnimal = await getAnimalById(animalId);
    if (!existingAnimal) {
      return NextResponse.json({ message: "Animal not found" }, { status: 404 });
    }  

    const [animal] = await getById(animalId)
    const ownerId = animal.ownerId; 
    if (ownerId !== receiverId) {
      return NextResponse.json({ message: "the receiver is not the owner of animal" }, { status: 403 });
    }
    
    // verifier si le sender existe deja ou non
    if (senderId === receiverId) { 
      return NextResponse.json({ message: "sender and receiver should'nt are the same" }, { status: 403 });
    }

    // verifier si l'invitation existe deja ou non
    const existingInvitation1 = await checkInvitationExists (senderId , receiverId , animalId); 
    if (existingInvitation1) {
      return NextResponse.json({ message: "Invitation already exists" }, { status: 409 });
    }

    // Utiliser la date actuelle

    await addInvitation( 
      
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
  );    return NextResponse.json({ message: 'Invitation added successfully' }, { status: 200 });
  } catch (error: any) {
    console.error("Error adding invitation:", error);
    return NextResponse.json({ message: 'Error adding invitation', error }, { status: 500 });
  }
};


