import { addComment, getData } from "@/actions/commentActions";
import { NextRequest, NextResponse } from "next/server";



export const GET = async (request: NextRequest) => { 
try {
    const data = await getData();
    return NextResponse.json(data, { status: 200 });
} catch (error: any) {  
    return NextResponse.json({ message: 'Error fetching comments', error }, { status: 500 });

}

} 
export const POST = async (request: NextRequest) => {
    try {
      const { userId, content, rate, animalId, userPhoto, firstName, lastName } = await request.json();
  
      // Appel à la fonction pour ajouter le commentaire
      await addComment( userId, content, rate, animalId, userPhoto, firstName, lastName);
  
      return NextResponse.json({ message: 'Comment added successfully' }, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ message: 'Error adding comment', error }, { status: 500 });
    }
  };
