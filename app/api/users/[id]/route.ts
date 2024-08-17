import { getById } from "@/actions/userActions";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request : NextRequest, context : { params: { id: string } }) { 
    const id = parseInt(context.params.id);
    try {
      const data = await getById(id);
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Error fetching data', error }, { status: 500 });
    }
  }