import { NextRequest, NextResponse } from 'next/server';
import { getData , addUser } from '@/actions/userActions';

export async function GET() {
  try {
    const data = await getData();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching data', error }, { status: 500 });
  }
}



export async function POST(request: NextRequest) {
try {
    const body = await request.json();
    const { id, name,lastname,password,email,image } = body;
    await addUser(id, name,lastname,password,email,image);

    return NextResponse.json({ message: 'User added successfully' }, { status: 200 });

} catch (error) { 

    return NextResponse.json({ message: 'Error adding user', error }, { status: 500 });


}
} 