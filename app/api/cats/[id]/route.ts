import { getCatsByowner, getDogsByowner } from "@/actions/animalActions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest ,context :{params : {id: number}}) => { 
    const id = context.params.id;
    try {
        const data= await getCatsByowner(id);
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {  
        return NextResponse.json({ message: 'Error fetching catsByOwner', error }, { status: 500 });
    
    }
};
