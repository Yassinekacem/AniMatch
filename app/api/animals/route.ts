import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/db/drizzle";
import { animals, comments } from "@/db/schema";
import { eq, and, lte, gte, sql, desc } from 'drizzle-orm';
import { addAnimal } from '@/actions/animalActions';

function getAgeRange(ageCategory: string) {
  switch (ageCategory.toLowerCase()) {
    case 'puppy':
      return { min: 0, max: 12 };
    case 'young':
      return { min: 12, max: 24 };
    case 'adult':
      return { min: 24, max: 60 };
    case 'senior':
      return { min: 60 };
    default:
      return null;
  }
}

async function getAvgRating(animalId: number) {
  const avgRatingResult = await db
    .select({ averageRating: sql`AVG(${comments.rate})` })
    .from(comments)
    .where(eq(comments.animalId, animalId));

    return parseFloat(avgRatingResult[0]?.averageRating?.toString() || '0');
  }

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filters: any = {};

  if (searchParams.has('breed')) {
    filters['breed'] = searchParams.get('breed');
  }
  if (searchParams.has('city')) {
    filters['city'] = searchParams.get('city');
  }
  if (searchParams.has('gender')) {
    filters['gender'] = searchParams.get('gender');
  } 
  if (searchParams.has('species')) {
    filters['species'] = searchParams.get('species');
  }
  if (searchParams.has('ageCategory')) {
    const ageCategory = searchParams.get('ageCategory');
    if (ageCategory) {
      const ageRange = getAgeRange(ageCategory);
      if (ageRange) {
        if (ageRange.min !== undefined) {
          filters['ageMin'] = ageRange.min;
        }
        if (ageRange.max !== undefined) {
          filters['ageMax'] = ageRange.max;
        }
      }
    }
  }

  if (searchParams.has('vaccinated')) {
    filters['vaccinated'] = searchParams.get('vaccinated') === 'true';
  }
  if (searchParams.has('trained')) {
    filters['trained'] = searchParams.get('trained') === 'true';
  }
  if (searchParams.has('friendly')) {
    filters['friendly'] = searchParams.get('friendly') === 'true';
  }

  const sortBy = searchParams.get('sortBy');

  try {
    let data = await db
      .select()
      .from(animals)
      .where(
        and(
          ...Object.entries(filters).map(([key, value]) => {
            if (key === 'ageMin') {
              return gte(animals.age, value as number);
            }
            if (key === 'ageMax') {
              return lte(animals.age, value as number);
            }
            return eq((animals as any)[key], value);
          })
        )
      );

    if (sortBy === 'rate') {
      const animalsWithRatings = await Promise.all(
        data.map(async (animal) => ({
          ...animal,
          avgRate: await getAvgRating(animal.id),
        }))
      );
      animalsWithRatings.sort((a, b) => b.avgRate - a.avgRate);
      data = animalsWithRatings;
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching data', error }, { status: 500 });
  }
}


export async function POST(request: Request) {
  const body = await request.json();
  if (body.image.some((img: string) => img.trim() === '')) {
    return NextResponse.json({ message: 'Error: Image array contains empty strings' }, { status: 400 });
  }
  try {
    await addAnimal(
      body.id,                        
      body.breed,
      body.species,
      body.name,
      parseInt(body.age, 10), // Parse age as integer
      body.city,
      body.gender,                  
      body.vaccinated,      
      body.trained,         
      body.friendly,        
      body.available ?? true, // Use default true if not provided
      body.description,
      body.image, // Changed from `image` to `images`
      parseInt(body.ownerId, 10) // Parse ownerId as integer
    ); 

    
    
    return NextResponse.json({ message: 'Animal added successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding animal', error }, { status: 500 });
  }
}
