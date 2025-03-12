import { NextRequest, NextResponse } from "next/server";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import {db} from "@/lib/firebase/clientApp";

const COLLECTION = "subjects"

export async function POST(request: NextRequest) {
    const path = request.nextUrl.pathname.split("/")
    const subjectId = path[path.length - 3]
    const exerciseId = path[path.length - 1]

    if (!subjectId || !exerciseId) {
        return NextResponse.json({ error: "Invalid request param provided" }, { status: 404 });
    }

    const washingtonRef = doc(db, COLLECTION, subjectId);
    const docu = doc(db, "exercises", exerciseId)

    await updateDoc(washingtonRef, { exercises: arrayUnion(docu) })

    return NextResponse.json({})
}

export async function DELETE(request: NextRequest) {
    const path = request.nextUrl.pathname.split("/")
    const subjectId = path[path.length - 3]
    const exerciseId = path[path.length - 1]

    if (!subjectId || !exerciseId) {
        return NextResponse.json({ error: "Invalid request param provided" }, { status: 404 });
    }

    const washingtonRef = doc(db, COLLECTION, subjectId);
    const docu = doc(db, "exercises", exerciseId)

    await updateDoc(washingtonRef, { exercises: arrayRemove(docu) })

    return NextResponse.json({})
}