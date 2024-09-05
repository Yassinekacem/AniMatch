import { deleteAnimal, editAnimal, getAnimalById, getById } from "@/actions/animalActions";
import { db } from "@/db/drizzle";
import { comments } from "@/db/schema";
import { avg, count, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, context: { params: { id: number } }) {
    const id = context.params.id;
  
    try {
      // Fetch the animal by ID
      const animal = await getById(id);
  
      if (!animal) {
        return NextResponse.json({ message: 'Animal not found' }, { status: 404 });
      }
  
      // Fetch the count of comments for the animal
      const totalCommentsResult = await db
        .select({ count: count(comments.id) })
        .from(comments)
        .where(eq(comments.animalId, id))
        .then(res => res[0]?.count || 0);
  
      // Fetch the average rating for the animal
      const avgRatingResult = await db
        .select({ averageRating: avg(comments.rate) })
        .from(comments)
        .where(eq(comments.animalId, id))
        .then(res => parseFloat(res[0]?.averageRating || '0'));
  
      const result = {
        ...animal,
        totalComments: totalCommentsResult,
        avgRating: avgRatingResult,
      };
  
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Error fetching data', error }, { status: 500 });
    }
  }


  export const PUT = async (request: NextRequest, context: { params: { id: string } }) => {
    const id = parseInt(context.params.id);

    try {
        const body = await request.json();
        const { breed, species, name, age, vaccinated, trained, gender ,  city ,friendly, available, description, image } = body;

        // Vérifiez l'existence de l'animal
        const existingAnimal = await getAnimalById(id);
        if (!existingAnimal) {
            return NextResponse.json({ message: 'Animal not found' }, { status: 404 });
        }

        // Mettez à jour l'animal s'il existe
        await editAnimal(id, breed, species, name, age, city , gender ,  vaccinated, trained, friendly, available, description, image);
        
        return NextResponse.json({ message: 'Animal updated successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Error updating animal', error }, { status: 500 });
    }
};

export const DELETE = async (request: NextRequest, context: { params: { id: string } }) => {
    const id = parseInt(context.params.id);

    try {
        
        const existingAnimal = await getAnimalById(id);
        if (!existingAnimal) {
            return NextResponse.json({ message: 'Animal not found' }, { status: 404 });
        }


        await deleteAnimal(id);
        return NextResponse.json({ message: 'Animal deleted successfully' }, { status: 200 });


    } catch (error: any) {
        return NextResponse.json({ message: 'Error deleting animal', error }, { status: 500 });


    }
}