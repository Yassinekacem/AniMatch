import {getData } from "@/actions/userActions";
import { NextRequest, NextResponse } from "next/server";



export const GET = async (request: NextRequest  ) => { 
try { 
    const data = await getData() 
    return NextResponse.json(data, { status: 200 });

} catch (error) {  
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: 'Error fetching data', error }, { status: 500 });

}
}