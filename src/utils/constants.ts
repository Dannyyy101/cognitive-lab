import { Exercise } from '@/types/models/exercise'
import { Subject } from '@/types/models/subject'

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
export const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL
export const TYPES: string[] = ['text', 'image', 'multiple-choice']
export const DEFAULT_EXERCISE: Exercise = {
    id: -1,
    type: '',
    title: '',
    content: { question: '', answer: '' },
    learned: false,
    subjectId: -1,
    created_at: new Date().toDateString(),
}

export const DEFAULT_SUBJECT: Subject = {
    id: -1,
    name: '',
    primaryColor: '',
    secondaryColor: '',
    created_at: '',
    parent: null,
    exercises: [],
    children: [],
}
