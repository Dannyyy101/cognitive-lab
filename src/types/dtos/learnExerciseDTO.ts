export interface LearnSubjectDTO{
    childId:string;
    exercises:LearnExerciseDTO
}

export interface LearnExerciseDTO{
    exerciseId:string,
    learned: { date: Date, correct: boolean },
}