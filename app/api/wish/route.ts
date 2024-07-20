import { addWish, getData } from "@/actions/wishActions";
import next from "next";
import { NextRequest, NextResponse } from "next/server";



export const GET = async () => {
    try {
        const data = await getData();
        return NextResponse.json(data, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({message:"wish list error",error}, { status: 500 });
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const {userId, animalId} = body;
        await addWish(userId, animalId);
        return NextResponse.json({message:"wish added successfully"}, { status: 200 });
    } catch (error) {
        return NextResponse.json({message:"wish list error",error}, { status: 500 });
    }
}