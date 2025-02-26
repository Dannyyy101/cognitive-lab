import { ExerciseBase } from "./exercise";

export interface Subject {
    id: string;
    name: string;
    color: string;
    exercises:ExerciseBase[]
}