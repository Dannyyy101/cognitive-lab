import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
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

export async function DELETE(request: NextRequest) {
  const exerciseId = request.nextUrl.pathname.split("/").pop();

  if (!exerciseId) {
    return NextResponse.json({ error: "Invalid request param provided" }, { status: 404 });
  }

  const ref = doc(db, COLLECTION, exerciseId).withConverter(exerciseConverter);
  await deleteDoc(ref);
}

export async function PUT(request: NextRequest) {
  const exerciseId = request.nextUrl.pathname.split("/").pop();

  if (!exerciseId) {
    return NextResponse.json({ error: "Invalid request param provided" }, { status: 404 });
  }

  try {
    // Parse den Request-Body
    const body = await request.json();

    if (!body) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    const ref = doc(db, COLLECTION, exerciseId).withConverter(exerciseConverter);
    await updateDoc(ref, body);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating document:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}