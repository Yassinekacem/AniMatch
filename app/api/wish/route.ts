// pages/api/user-wishlist.ts
import { NextRequest, NextResponse } from 'next/server';
import { addWish, checkWishExists, getData, getWishedAnimals } from '@/actions/wishActions';
import { getById } from '@/actions/animalActions';

export const GET = async (request: NextRequest) => {    
try { 
    const data = await getData();
    return NextResponse.json(data, { status: 200 });
} catch (error: any) { 
    return NextResponse.json({ message: 'Error fetching user wishlist', error }, { status: 500 });
}
}




export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { id , userId , animalId } = body; 
        // check if the animal is wished by her owner or not 
        const [animal] = await getById(animalId)
        const ownerId = animal.ownerId; 
        if (ownerId === userId) {
          return NextResponse.json({ message: "the owner cannot wish his animal" }, { status: 403 });
        }  

        // check if the wish already exists or not
        const existingWish = await checkWishExists(userId , animalId); 
        if (existingWish) {
            return NextResponse.json({ message: "Wish already exists" }, { status: 409 });
        }


        // add the wish
        await addWish (id, userId, animalId); 
        

        return NextResponse.json({ message: 'wish added successfully' }, { status: 200 });
    
    } catch (error) { 
    
        return NextResponse.json({ message: 'Error adding the wish', error }, { status: 500 });
    
    
    }
    } 
    
