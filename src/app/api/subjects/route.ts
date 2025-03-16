import { NextRequest, NextResponse } from "next/server";
import { collection, doc, setDoc } from "firebase/firestore";
import { SubjectDTO } from "@/types/dtos/subjectDTO";
import { subjectConverter } from "@/lib/converter/subjectConverter";
import { db } from "@/lib/firebase/clientApp";

const COLLECTION = "subjects";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as SubjectDTO;

  const ref = doc(collection(db, COLLECTION)).withConverter(subjectConverter);
  await setDoc(ref, body);

  return NextResponse.json(ref.id);
}
