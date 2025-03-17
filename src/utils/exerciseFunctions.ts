import { ExerciseBaseDTO, ExerciseTyp } from "@/types/dtos/exerciseDTO";

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
