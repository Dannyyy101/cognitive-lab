'use server'

import { ExerciseBase } from "@/types/exercise";

export const createNewExercise = async (exerciseId: string, exercise: ExerciseBase) => {

    try {
        const result = await fetch(`http://127.0.0.1:8000/api/exercises/${exerciseId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exercise)
        });
        if (!result.ok) {
            throw new Error('Failed to fetch data');
        }

    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export const updateExerciseById = async (exerciseId: string, exercise: ExerciseBase) => {

    try {
        const result = await fetch(`http://127.0.0.1:8000/api/exercises/${exerciseId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exercise)
        });
        console.log(exercise)
        console.log(result)
        if (!result.ok) {
            throw new Error('Failed to fetch data');
        }

    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}