import { Exercise } from "@/types/models/exercise";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from 'zustand/middleware';

interface SessionStateProps {
    exercises: { exercise: Exercise, correct: boolean }[]
    addExercise: (exercise: Exercise, correct: boolean) => void
    removeExercise: (exerciseId: number) => void
    isLearned: (exerciseId: number) => boolean
    clear: () => void
}

export const useSession = create<SessionStateProps>()(persist(immer((set, get) => ({
    exercises: [],
    addExercise: (exercise: Exercise, correct: boolean) => set((state) => (
        {
            exercises: [...state.exercises, { exercise: exercise, correct: correct }]
        })),
    removeExercise: (exerciseId: number) => set((state) => ({
        exercises: state.exercises.filter((items) => items.exercise.id !== exerciseId)
    })),
    isLearned: (exerciseId: number) =>
        get().exercises.filter((item) => item.exercise.id === exerciseId).length > 0,
    clear: () =>
        set((state) => {
            state.exercises = [];
        }),
})), { name: "session-storage" }))