import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { deleteDoc, doc, DocumentReference, getDoc } from "firebase/firestore";
import { subjectWithExercisesConverter } from "@/lib/converter/subjectWithExercisesConverter";
import { BACKEND_URL } from "@/utils/constants";

const COLLECTION = "subjects";

export async function GET(request: NextRequest) {
  const subjectId = request.nextUrl.pathname.split("/").pop();

  if (!subjectId) {
    return NextResponse.json(
      { error: "Invalid request param provided" },
      { status: 404 },
    );
  }
  try {
    const col = doc(db, COLLECTION, subjectId).withConverter(
      subjectWithExercisesConverter,
    );
    const postsSnapshot = await getDoc(col);

    if (!postsSnapshot.exists()) {
      return NextResponse.json(
        {
          error: "Document not found",
        },
        { status: 404 },
      );
    }

    const data = postsSnapshot.data();

    // Check if exercises exist
    if (!data || !data.exercises) {
      console.warn(`Document with ID ${postsSnapshot.id} has no exercises.`);
      return NextResponse.json({
        id: postsSnapshot.id,
        ...data,
        exercises: [],
        children: [],
      });
    }

    // Fetch exercise documents
    const exercises = await Promise.all(
      data.exercises.map(async (exerciseRef: DocumentReference) => {
        const exerciseDoc = await getDoc(exerciseRef);
        return exerciseDoc.exists()
          ? { ...exerciseDoc.data(), id: exerciseDoc.id, lastLearned: new Date(exerciseDoc.data().lastLearned.seconds * 1000) }
          : null;
      }),
    );

    const children = await Promise.all(
      data.children.map(async (childrenRef: DocumentReference) => {
        const childrenDoc = await getDoc(childrenRef);
        return childrenDoc.exists()
          ? { id: childrenDoc.id, ...childrenDoc.data() }
          : null;
      }),
    );

    let parent = null;
    if (data.parent) {
      const childrenDoc = await getDoc(data.parent);
      parent = childrenDoc.exists()
        ? { id: childrenDoc.id, ...childrenDoc.data() }
        : null;
    }

    // Return the post with valid exercises
    return NextResponse.json({
      ...data,
      id: postsSnapshot.id,
      exercises: exercises.filter((exercise) => exercise !== null),
      children: children.filter((children) => children !== null),
      parent: parent
    });
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const subjectId = request.nextUrl.pathname.split("/").pop();

  if (!subjectId) {
    return NextResponse.json(
      { error: "Invalid request param provided" },
      { status: 404 },
    );
  }

  const ref = doc(db, COLLECTION, subjectId).withConverter(
    subjectWithExercisesConverter,
  );
  const document = await getDoc(ref);
  if (document.exists()) {
    const data = document.data();
    console.log(data?.parent.id);
    if (data?.parent) {
      await fetch(
        `${BACKEND_URL}/subjects/${data.parent.id}/children/${subjectId}`,
        {
          method: "DELETE",
        },
      );
    }
    await deleteDoc(ref);
  }
  return NextResponse.json({});
}
