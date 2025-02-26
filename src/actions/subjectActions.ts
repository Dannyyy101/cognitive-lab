'use server'
import { Subject } from "@/types/subject";
import { METHODS } from "http";

export const getAllSubjects = async () => {
    try {
        const result = await fetch("http://127.0.0.1:8000/api/subjects");
        if (!result.ok) {
            throw new Error('Failed to fetch data');
        }
        return await result.json() as Subject[]
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export const getSubjectById = async (subjectId: string) => {
    try {
        const result = await fetch(`http://127.0.0.1:8000/api/subjects/${subjectId}`);
        if (!result.ok) {
            throw new Error('Failed to fetch data');
        }
        return await result.json() as Subject
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
        return await result.json() as Subject
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

