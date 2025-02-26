
export interface ExerciseBaseDTO {
    id:string
    question: string;
    type: string;
}

export interface ExerciseNormalDTO extends ExerciseBaseDTO {
    answer: string;
}

export interface ExerciseMultipleChoiceDTO extends ExerciseBaseDTO {
    answer: string;
    choices: string[]

}