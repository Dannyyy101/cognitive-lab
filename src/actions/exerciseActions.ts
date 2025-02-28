'use server'

import { ExerciseBase } from "@/types/models/exercise";
import { BACKEND_URL } from "@/utils/constants";

export const createNewExercise = async (exercise: ExerciseBase) => {

    try {
        const result = await fetch(`${BACKEND_URL}/exercises`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exercise)
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

export const updateExerciseById = async (exerciseId: string, exercise: ExerciseBase) => {

    try {
        const result = await fetch(`${BACKEND_URL}/exercises/${exerciseId}`, {
            method: "PUT",
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