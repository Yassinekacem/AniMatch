import { NextRequest, NextResponse } from 'next/server';
import { getData, addAnimal } from '@/actions/animalActions';

export async function GET() {
  try {
    const data = await getData();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching data', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    await addAnimal(
      body.id,                        
      body.breed,
      body.species,
      body.name,
      parseInt(body.age),            
      body.city,
      body.gender,                  
      body.vaccinated,      
      body.trained,         
      body.friendly,        
      body.available,        
      body.description,
      body.image,
      parseInt(body.ownerId)         
    );
    return NextResponse.json({ message: 'Animal added successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding animal', error }, { status: 500 });
  }
}
