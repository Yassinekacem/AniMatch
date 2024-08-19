import { deleteComment, getCommentsByAnimal } from "@/actions/commentActions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest ,context :{params : {id: number}}) => { 
    const id = context.params.id;
    try {
        
        const data = await getCommentsByAnimal(id);
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {  
        return NextResponse.json({ message: 'Error fetching Aniamlcomments', error }, { status: 500 });
    
    }
};



export const DELETE = async (request: NextRequest ,context :{params : {id: number}}) => {   

    const id = context.params.id;
    try {
        await deleteComment(id);
        return NextResponse.json({ message: 'Comment deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Error deleting comment', error }, { status: 500 });
    }
}