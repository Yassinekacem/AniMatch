import { deleteUser, editUser } from "@/actions/userActions";
import { NextRequest, NextResponse } from "next/server"



export const PUT = async (request: NextRequest , context: { params: { id: string } }) => {  
    const id = parseInt(context.params.id);

try { 
    const body = await request.json();
    const { name,lastname,password,email,image } = body;
    await editUser(id , name,lastname,password,email,image);

return NextResponse.json({ message: 'user updated successfully' }, { status: 200 });
}catch (error : any) {
return NextResponse.json({ message: 'Error updating user', error }, { status: 500 });

  }
}


export const DELETE = async (request: NextRequest , context: { params: { id: string } }) => {  
    const id = parseInt(context.params.id);  
    
try {
    await deleteUser(id);
    return NextResponse.json({ message: 'user deleted successfully' }, { status: 200 });


} catch (error : any) { 
    return NextResponse.json({ message: 'Error deleting user', error }, { status: 500 });


} 
}