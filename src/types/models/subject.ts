import { Database } from '@/types/database.types'
import { BaseLearnedExercise, Exercise } from '@/types/models/exercise'

export type Subject = Database['public']['Tables']['subjects']['Row'] & {
    exercises: Exercise[]
    children: Subject[]
}

export type BaseSubjectWithExercises = Database['public']['Tables']['subjects']['Row'] & {
    exercises: BaseLearnedExercise[]
}

export type BaseSubjectWithChildren = Database['public']['Tables']['subjects']['Row'] & {
    children: BaseSubjectWithExercises[]
}
