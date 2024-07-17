import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/drizzle';
import { animal } from '@/db/schema';
import { getData , addAnimal } from '@/actions/animalActions';

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
    const { id, breed, species, name, age, vaccinated, trained, friendly, available, description, image } = body;
    await addAnimal(id , breed, species, name, age, vaccinated, trained, friendly, available, description, image);

    return NextResponse.json({ message: 'Animal added successfully' }, { status: 200 });

} catch (error) { 

    return NextResponse.json({ message: 'Error adding animal', error }, { status: 500 });


}
} 






