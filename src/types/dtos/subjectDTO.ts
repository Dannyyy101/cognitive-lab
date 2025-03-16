import {ExerciseBaseDTO} from "./exerciseDTO";

export interface SubjectDTO {
    id: string;
    name: string;
    color: string;
    bgColor: string;
    exercises: ExerciseBaseDTO[];
    parent: SubjectDTO | null
    children: SubjectDTO[]
    lastEdited: Date
    createdOn: Date
}