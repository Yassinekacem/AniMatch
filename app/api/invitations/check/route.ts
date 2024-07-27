// pages/api/check-invitation.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/db/drizzle";
import { invitations } from "@/db/schema";
import { and, eq } from 'drizzle-orm';

export const GET = async (request: NextRequest) => {
  try {
    // Récupération des paramètres de requête
    const url = new URL(request.url);
    const senderId = parseInt(url.searchParams.get("senderId") || "");
    const receiverId = parseInt(url.searchParams.get("receiverId") || "");
    const animalId = parseInt(url.searchParams.get("animalId") || "");

    // Validation des paramètres
    if (isNaN(senderId) || isNaN(receiverId) || isNaN(animalId)) {
      return NextResponse.json({ message: "Invalid parameters" }, { status: 400 });
    }

    // Vérification des invitations
    const result = await db.select()
      .from(invitations)
      .where(
        and(
          eq(invitations.senderId, senderId),
          eq(invitations.receiverId, receiverId),
          eq(invitations.animalId, animalId)
        )
      );

    // Retourner les résultats de la vérification
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error checking invitation:", error);
    return NextResponse.json({ message: 'Error checking invitation', error }, { status: 500 });
  }
};
