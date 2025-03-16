"use server";

import { BACKEND_URL } from "@/utils/constants";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/clientApp";
import { ExerciseBaseDTO } from "@/types/dtos/exerciseDTO";

const COLLECTION = "exercises";

export const createNewExercise = async (exercise: ExerciseBaseDTO) => {
  const ref = doc(collection(db, COLLECTION));
  const { id: _id, ...exercisesWithoutId } = exercise;
  await setDoc(ref, exercisesWithoutId);
  return { ...exercise, id: ref.id };
};

export const createNewExercises = async (exercises: ExerciseBaseDTO[]) => {
  return await Promise.all(
    exercises.map(async (exercise) => createNewExercise(exercise)),
  );
};

export const getExerciseById = async (exerciseId: string) => {
  try {
    const result = await fetch(`${BACKEND_URL}/exercises/${exerciseId}`, {
      method: "GET",
    });

    if (!result.ok) {
      throw new Error("Failed to fetch data");
    }
    return await result.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

export const deleteExerciseById = async (exerciseId: string) => {
  try {
    const result = await fetch(`${BACKEND_URL}/exercises/${exerciseId}`, {
      method: "DELETE",
    });

    if (!result.ok) {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
