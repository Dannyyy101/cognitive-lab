export interface ExerciseBaseDTO {
    id: string
    question: string;
    type: ExerciseType
    lastEdited:Date;
    createdOn:Date;
    lastLearned:Date
}

export type ExerciseType = "normal" | "multiple-choice" | "image";

export interface ExerciseNormalDTO extends ExerciseBaseDTO {
    answer: string;
}

export interface ExerciseMultipleChoiceDTO extends ExerciseBaseDTO {
    answer: string;
    choices: string[]
}

export interface ExerciseImageDTO extends ExerciseBaseDTO {
    answer: string;
    answerImageUrl:string | File | null;
    questionImageUrl:string | File | null;
}

export interface CombinedExerciseDTO extends ExerciseNormalDTO, ExerciseMultipleChoiceDTO, ExerciseImageDTO {
    [key: string]: string | number | boolean | undefined | string[] | File | null | Date;
}