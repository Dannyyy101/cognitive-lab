export interface UserDTO {
    id: string;
    email: string
    displayName: string
    photoUrl: string
    learnedExercises: {
        exerciseId: string,
        correct: boolean
    }[]
}