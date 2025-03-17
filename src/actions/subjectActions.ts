"use server";

import { SubjectDTO } from "@/types/dtos/subjectDTO";
import { BACKEND_URL } from "@/utils/constants";
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/clientApp";
import { subjectWithExercisesConverter } from "@/lib/converter/subjectWithExercisesConverter";
import { subjectConverter } from "@/lib/converter/subjectConverter";
import { createNewExercises } from "./exerciseActions";
import { updateDoc } from "firebase/firestore";
import { arrayRemove } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

const COLLECTION = "subjects";

export const createNewSubject = async (subject: SubjectDTO) => {
  const exercises = await createNewExercises(subject.exercises);

  const ref = doc(collection(db, COLLECTION)).withConverter(subjectConverter);
  await setDoc(ref, { ...subject, exercises: exercises } as SubjectDTO);
  return ref.id;
};

export const getAllSubjects = async () => {
  const col = collection(db, COLLECTION);
  const q = query(col, where("parent", "==", null));

  const querySnapshot = await getDocs(q);

  const postsList = querySnapshot.docs.map(async (doc) => {
    const data = doc.data();
    const exercises = await Promise.all(
      data.exercises.map(async (exerciseRef: DocumentReference) => {
        const exerciseDoc = await getDoc(exerciseRef);
        return exerciseDoc.exists()
          ? { ...exerciseDoc.data(), id: exerciseDoc.id }
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
    return {
      id: doc.id,
      ...data,
      exercises: exercises.filter((exercise) => exercise !== null),
      children: children.filter((child) => child !== null),
    };
  });

  return (await Promise.all(postsList)) as SubjectDTO[];
};

export const getSubjectById = async (subjectId: string) => {
  try {
    const result = await fetch(`${BACKEND_URL}/subjects/${subjectId}`);
    if (!result.ok) {
      throw new Error("Failed to fetch data");
    }
    return (await result.json()) as SubjectDTO;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

export const updateSubjectById = async (
  subjectId: string,
  subject: SubjectDTO,
) => {
  const subjectCollection = doc(db, COLLECTION, subjectId).withConverter(
    subjectWithExercisesConverter,
  );
  await setDoc(subjectCollection, subject, { merge: true });
};

export const addExercisesToSubject = async (
  subjectId: string,
  exerciseId: string,
) => {
  try {
    const result = await fetch(
      `${BACKEND_URL}/subjects/${subjectId}/exercises/${exerciseId}`,
      { method: "POST" },
    );
    if (!result.ok) {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

export const removeExercisesFromSubject = async (
  subjectId: string,
  exerciseId: string,
) => {
  try {
    const result = await fetch(
      `${BACKEND_URL}/subjects/${subjectId}/exercises/${exerciseId}`,
      { method: "DELETE" },
    );
    if (!result.ok) {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

export const removeChildFromSubject = async (
  parentId: string,
  subjectId: string,
) => {
  const washingtonRef = doc(db, COLLECTION, parentId);
  const docu = doc(db, COLLECTION, subjectId);
  await updateDoc(washingtonRef, { children: arrayRemove(docu) });
};

export const deleteSubjectById = async (subjectId: string) => {
  const ref = doc(db, COLLECTION, subjectId).withConverter(
    subjectWithExercisesConverter,
  );
  const document = await getDoc(ref);
  if (document.exists()) {
    const data = document.data();

    if (data?.parent) {
      removeChildFromSubject(data.parent.id, subjectId);
    }
    await deleteDoc(ref);
  }
};
