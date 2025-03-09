'use server'

import {BACKEND_URL} from "@/utils/constants";
import {collection, doc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "@/lib/firebase";
import {exerciseConverter} from "@/lib/converter/exerciseConverter";
import {CombinedExerciseDTO} from "@/types/dtos/exerciseDTO";
import {filterExerciseFields} from "@/utils/exerciseFunctions";

const COLLECTION = "exercises"

export const createNewExercise = async (exercise: CombinedExerciseDTO) => {
    const ref = doc(collection(db, COLLECTION))
    const filteredExercise = filterExerciseFields(exercise)

    if (!filteredExercise) {
        throw new Error("Exercise type not found")
    }

    await setDoc(ref, {...filteredExercise, createdOn: new Date(), lastEdited: new Date(), lastLearned: new Date()});

    return {...filteredExercise, id: ref.id}
}

export const updateExerciseById = async (exerciseId: string, exercise: CombinedExerciseDTO) => {
    const ref = doc(db, COLLECTION, exerciseId).withConverter(exerciseConverter);
    const filteredExercise = filterExerciseFields(exercise)
    if (!filteredExercise) {
        throw new Error("Exercise type not found")
    }
    await updateDoc(ref, filteredExercise);
}

export const setLearnedExerciseById = async (exerciseId: string) => {
    const ref = doc(db, COLLECTION, exerciseId).withConverter(exerciseConverter);
    await updateDoc(ref, {lastLearned: new Date()});
}

export const getExerciseById = async (exerciseId: string) => {
    try {
        const result = await fetch(`${BACKEND_URL}/exercises/${exerciseId}`, {
            method: "GET"
        });

        if (!result.ok) {
            throw new Error('Failed to fetch data');
        }
        return await result.json()
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export const deleteExerciseById = async (exerciseId: string) => {
    try {
        const result = await fetch(`${BACKEND_URL}/exercises/${exerciseId}`, {
            method: "DELETE"
        });

        if (!result.ok) {
            throw new Error('Failed to fetch data');
        }

    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}