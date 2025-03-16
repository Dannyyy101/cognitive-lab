export type ExerciseType = "text" | "multiple-choice" | "image";

export interface ExerciseBaseDTO {
  id: string;
  question: ExerciseComponent[];
  answer: ExerciseComponent[]; // only one answer is allowed, but Image components could be necessary
  lastEdited: Date;
  createdOn: Date;
  documentationUrl?: string;
  authorId: string;
}

export type ExerciseComponent =
  | ExerciseTextComponent
  | ExerciseImageComponent
  | ExerciseMultipleChoiceComponent;

export interface ExerciseTextComponent {
  type: "text";
  content: string;
}

export interface ExerciseImageComponent {
  type: "image";
  imageUrl: string;
}

export interface ExerciseMultipleChoiceComponent {
  type: "multiple-choice";
  choices: string[];
  correctChoice: string;
}

export type ExerciseTyp = "image" | "text" | "multiple-choice";
