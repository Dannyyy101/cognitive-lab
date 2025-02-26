

export interface ExerciseNormal extends ExerciseBase {
    answer: string;
}

export interface ExerciseMultipleChoice extends ExerciseBase {
    answer: string;
    choices: string[]

}

export interface ExerciseBase {
    id:string
    question: string;
    type: string;
}