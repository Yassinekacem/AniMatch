import { deleteWish } from "@/actions/wishActions";
import { NextResponse } from "next/server";

export const DELETE = async ( context: { params: { id: string } }) => {  
    const id = parseInt(context.params.id);  
    
try {
    await deleteWish(id);
    return NextResponse.json({ message: 'wish deleted successfully' }, { status: 200 });
    

} catch (error : any) { 
    return NextResponse.json({ message: 'Error deleting wish', error }, { status: 500 });


} 
}