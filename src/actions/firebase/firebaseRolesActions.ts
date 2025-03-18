"use server";
import { admin } from "@/lib/firebase/firebaseAdmin";

export async function setUserRole(uid: string, role: string) {
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log(`Rolle "${role}" für Benutzer ${uid} gesetzt.`);
  } catch (error) {
    console.error("Fehler beim Setzen der Rolle:", error);
  }
}
