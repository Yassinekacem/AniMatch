import { deleteUser, editUser, getUser, getUserlById } from "@/actions/userActions";
import { NextRequest, NextResponse } from "next/server"


export const GET = async (request: NextRequest , context: { params: { id: string } }) => {
    const id = parseInt(context.params.id);  
    try {
        const user = await getUser(id);
        return NextResponse.json(user, { status: 200 });
    } catch (error : any) {
        return NextResponse.json({ message: 'Error getting user', error }, { status: 500 });
    }

}



export const PUT = async (request: NextRequest , context: { params: { id: string } }) => {  
    const id = parseInt(context.params.id);

    const user = await getUserlById(id);

try { 
    const body = await request.json();
     if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });}

    const { name,lastname,password,email,image } = body;
    await editUser(id , name,lastname,password,email,image);

return NextResponse.json({ message: 'user updated successfully' }, { status: 200 });
}catch (error : any) {
return NextResponse.json({ message: 'Error updating user', error }, { status: 500 });
}
}


export const DELETE = async (request: NextRequest , context: { params: { id: string } }) => {  
    const id = parseInt(context.params.id);  

    const user = await getUserlById(id);
    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });}
    
try {
    await deleteUser(id);
    return NextResponse.json({ message: 'user deleted successfully' }, { status: 200 });


} catch (error : any) { 
    return NextResponse.json({ message: 'Error deleting user', error }, { status: 500 });


} 
}