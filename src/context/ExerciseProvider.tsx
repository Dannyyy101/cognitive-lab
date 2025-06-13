import { Loading } from '@/components/Loading'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Exercise } from '@/types/models/exercise'
import { DEFAULT_EXERCISE } from '@/utils/constants'

interface ExerciseProviderProps {
    children: React.ReactNode
    exerciseId?: string
    oldExercise?: Exercise
}

interface ExerciseContextType {
    exercise: Exercise
    setExercise: (exercise: Exercise) => void
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined)

export const ExerciseProvider: React.FC<ExerciseProviderProps> = ({ children, exerciseId, oldExercise }) => {
    const [exercise, setExercise] = useState<Exercise | null>(null)

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                if (exerciseId) {
                    fetch(`/api/exercises/${exerciseId}`).then((response) =>
                        response.json().then((result) => setExercise(result.data))
                    )
                } else if (oldExercise) {
                    setExercise(oldExercise)
                } else {
                    setExercise(DEFAULT_EXERCISE)
                }
            } catch (error) {
                console.error('Failed to fetch exercise:', error)
            }
        }

        fetchExercise()
    }, [exerciseId, oldExercise])

    if (!exercise) return <Loading />

    return <ExerciseContext.Provider value={{ exercise, setExercise }}>{children}</ExerciseContext.Provider>
}

export const useExercise = () => {
    const context = useContext(ExerciseContext)
    if (context === undefined) {
        throw new Error('useExercise must be used within an ExerciseProvider')
    }
    return context
}
