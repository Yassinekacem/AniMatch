"use server"
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "./userActions";

export async function getCurrentUserWithDetails() {
  const user = await currentUser();
  if (!user) return null;
  const userDetails = await getUser(user.id);
  return userDetails ? userDetails[0] : null;
}