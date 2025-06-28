import { Database } from '@/types/database.types'

export type BaseExercise = Database['public']['Tables']['exercises']['Row']

export type BaseLearnedExercise = BaseExercise & {
    learned: Learned[]
}

export type Exercise = Omit<BaseExercise, 'content'> & {
    content: { question: string; answer: string[] }
    learned: boolean
}

export type ExerciseText = Exercise & {
    content: { question: string; answer: string[] }
}

export type Learned = Database['public']['Tables']['learnedExercises']['Row']
