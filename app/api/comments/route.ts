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

try {   
    await addComment(body.id , parseInt (body.animalId), body.content, parseInt (body.rate), body.userId);
    return NextResponse.json({ message: 'comment added successfully' });

     


} catch (error: any) { 
    return NextResponse.json({ message: 'Error adding comment', error }, { status: 500 }); 
}
}
