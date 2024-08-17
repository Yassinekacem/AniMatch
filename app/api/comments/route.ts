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
    const body =  await request.json();
    const { id, userId, content, rate, animalId } = body; 

try {   
    await addComment(id, userId, content, rate, animalId);
    return NextResponse.json({ message: 'comment added successfully' });

     


} catch (error: any) { 
    return NextResponse.json({ message: 'Error adding comment', error }, { status: 500 }); 
}
}
