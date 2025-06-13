import { DocumentReference } from 'firebase/firestore'
import { Database } from '@/types/database.types'
import { Exercise } from '@/types/models/exercise'

export type Subject = Database['public']['Tables']['subjects']['Row'] & {
    exercises: Exercise[]
    children: Subject[]
}

export interface SubjectWithUnresolvedChildrenAndExercises {
    id: string
    name: string
    color: string
    bgColor: string
    exercises: DocumentReference[]
    parent: DocumentReference
    children: DocumentReference[]
    lastEdited: Date
    createdOn: Date
}
