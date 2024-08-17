import { getCommentByAnimalId } from "@/actions/commentActions";
import { NextRequest, NextResponse } from "next/server"




export async function GET(request : NextRequest, context : { params: { id: number } }) { 
    const id = context.params.id;
    try {
      const data = await getCommentByAnimalId(id);
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Error fetching data', error }, { status: 500 });
    }
  }
