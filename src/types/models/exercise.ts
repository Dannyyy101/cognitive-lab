import { Database } from '@/types/database.types'

export interface ExerciseNormal extends ExerciseBase {
    answer: string
}

export interface ExerciseMultipleChoice extends ExerciseBase {
    answer: string
    choices: string[]
}

export interface ExerciseBase {
    id: string
    question: string
    type: string
}

type BaseExercise = Database['public']['Tables']['exercises']['Row']

export type Exercise = Omit<BaseExercise, 'content'> & {
    content: { question: string; answer: string }
    learned: boolean
}

export type ExerciseText = Exercise & {
    content: { question: string; answer: string }
}
