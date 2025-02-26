import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { exerciseConverter } from "@/lib/converter/exerciseConverter";

const COLLECTION = "exercises"

export async function GET(request: NextRequest) {
  const exerciseId = request.nextUrl.pathname.split("/").pop();

  if (!exerciseId) {
    return NextResponse.json({ error: "Invalid request param provided" }, { status: 404 });
  }

  const ref = doc(db, COLLECTION, exerciseId).withConverter(exerciseConverter);
  const postsSnapshot = await getDoc(ref);
  if (postsSnapshot.exists()) {
    return NextResponse.json(postsSnapshot.data());
  }
}