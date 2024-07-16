import { deleteAnimal, editAnimal } from "@/actions/animalActions";
import { NextRequest, NextResponse } from "next/server"



export const PUT = async (request: NextRequest , context: { params: { id: string } }) => {  
    const id = parseInt(context.params.id);

try { 
    const body = await request.json();
    const { breed, species, name, age, vaccinated, trained, friendly, available, description, image } = body;
    await editAnimal(id , breed, species, name, age, vaccinated, trained, friendly, available, description, image);

return NextResponse.json({ message: 'Animal updated successfully' }, { status: 200 });
}catch (error : any) {
return NextResponse.json({ message: 'Error updating animal', error }, { status: 500 });

  }
}


export const DELETE = async (request: NextRequest , context: { params: { id: string } }) => {  
    const id = parseInt(context.params.id);  
    
try {
    await deleteAnimal(id);
    return NextResponse.json({ message: 'Animal deleted successfully' }, { status: 200 });


} catch (error : any) { 
    return NextResponse.json({ message: 'Error deleting animal', error }, { status: 500 });


} 
}