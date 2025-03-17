export interface UserDTO {
  id: string;
  email: string;
  displayName: string;
  photoUrl: string;
  learnedExercises: LearnedExercise[];
}

export interface LearnedExercise {
  subjectId: string;
  exerciseId: string;
  lastLearned: Date;
  correct: boolean;
}
