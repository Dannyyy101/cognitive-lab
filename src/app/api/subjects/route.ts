import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { SubjectDTO } from "@/types/dtos/subjectDTO";
import { subjectConverter } from "@/lib/converter/subjectConverter";

const COLLECTION = "subjects";

export async function GET() {
  const col = collection(db, COLLECTION).withConverter(subjectConverter);
  const postsSnapshot = await getDocs(col);
  const postsList = postsSnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  return NextResponse.json(postsList);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as SubjectDTO;

  const ref = doc(collection(db, COLLECTION)).withConverter(subjectConverter);
  await setDoc(ref, body);

  return NextResponse.json(ref.id);
}
