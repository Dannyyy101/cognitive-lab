import { NextRequest, NextResponse } from "next/server";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { exerciseConverter } from "@/lib/converter/exerciseConverter";
import { db } from "@/lib/firebase/clientApp";
import { ExerciseBaseDTO } from "@/types/dtos/exerciseDTO";

const COLLECTION = "exercises";

export async function GET() {
  const col = collection(db, COLLECTION);
  const postsSnapshot = await getDocs(col);
  const postsList = postsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return NextResponse.json(postsList);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ExerciseBaseDTO;
  const ref = doc(collection(db, COLLECTION)).withConverter(exerciseConverter);
  await setDoc(ref, body);

  return NextResponse.json(ref.id);
}
