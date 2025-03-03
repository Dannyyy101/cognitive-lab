import {ExerciseBaseDTO} from "./exerciseDTO";

export interface SubjectDTO {
    id: string;
    name: string;
    color: string;
    exercises: ExerciseBaseDTO[];
    parent: SubjectDTO
    children: SubjectDTO[]
    lastEdited: Date
    createdOn: Date
}

export interface SubjectWithExercisesDTO {
    id: string;
    name: string;
    color: string;
    exercises: ExerciseBaseDTO[];
}
