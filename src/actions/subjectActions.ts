'use server'

import { SubjectDTO } from "@/types/dtos/subjectDTO";
import { BACKEND_URL } from "@/utils/constants";

export const getAllSubjects = async () => {
    try {
        const result = await fetch(`${BACKEND_URL}/subjects`);
        if (!result.ok) {
            throw new Error('Failed to fetch data');
        }
        return await result.json() as SubjectDTO[]
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export const getSubjectById = async (subjectId: string) => {
    try {
        const result = await fetch(`${BACKEND_URL}/subjects/${subjectId}`);
        if (!result.ok) {
            throw new Error('Failed to fetch data');
        }
        return await result.json() as SubjectDTO
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export const updateSubjectById = async (subjectId: string) => {
    try {
        const result = await fetch(`http://127.0.0.1:8000/api/subjects/${subjectId}`, { method: "PUT" });
        if (!result.ok) {
            throw new Error('Failed to fetch data');
        }
        return await result.json() as SubjectDTO
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export const addExercisesToSubject = async (subjectId: string, exerciseId: string) => {
    try {
        const result = await fetch(`${BACKEND_URL}/subjects/${subjectId}/exercises/${exerciseId}`, { method: "POST" });
        if (!result.ok) {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}
