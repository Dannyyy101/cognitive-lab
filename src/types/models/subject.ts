import { DocumentReference } from "firebase/firestore";

export interface SubjectWithUnresolvedChildrenAndExercises {
    id: string;
    name: string;
    color: string;
    bgColor:string
    exercises:DocumentReference[]
    parent: DocumentReference
    children: DocumentReference[]
    lastEdited: Date
    createdOn: Date
}