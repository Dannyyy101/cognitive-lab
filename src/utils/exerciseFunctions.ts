import {ExerciseBaseDTO, ExerciseComponent, ExerciseTyp} from "@/types/dtos/exerciseDTO";
import {ExerciseTextView} from "@/components/exercises/display/ExerciseTextView";

export const getDefaultExerciseByType = (
  type: ExerciseTyp,
): ExerciseBaseDTO => {
  switch (type) {
    case "text":
      return {
        id: "",
        lastEdited: new Date(),
        authorId: "",
        createdOn: new Date(),
        documentationUrl: "",
        answer: [{ type: "text", content: "" }],
        question: [{ type: "text", content: "" }],
      } as ExerciseBaseDTO;
    case "image":
      return {
        id: "",
        lastEdited: new Date(),
        authorId: "",
        createdOn: new Date(),
        documentationUrl: "",
        answer: [{ type: "text", content: "" }],
        question: [{ type: "image", imageUrl: "" }],
      } as ExerciseBaseDTO;
    default:
      return getDefaultExerciseByType("text");
  }
};

export const getExerciseViewByType = (questionOrAnswer:ExerciseComponent, key:string) => {
  switch (questionOrAnswer.type) {
    case "text":
      return ExerciseTextView({exercise: questionOrAnswer, key: key})
  }
}

export const isAnswerCorrect = (userInput: string, answer: string) => {
  // Regular expression to extract the text between slashes
  const regex = /\/(.*?)\//g;
  const matches = [];
  let match;

  while ((match = regex.exec(answer.replaceAll(" ", ""))) !== null) {
    matches.push(match[1]); // match[1] contains the text between slashes
  }

  if (matches.length === 0) return userInput === answer;

  // Compare extracted matches with user input
  return matches.includes(userInput.replaceAll(" ", ""));
};
