import { ExerciseBase, ExerciseMultipleChoice, ExerciseNormal } from "@/types/models/exercise";

type ExerciseData =
  | { type: "normal"; } & ExerciseNormal
  | { type: "multiple-choice"; } & ExerciseMultipleChoice;

export const generateExercises = async (data: Record<string, ExerciseData>) => {
    const temp: ExerciseBase[] = []

    Object.keys(data).forEach(function(key) {
        const type = data[key].type
        
        switch (type) {
            case "normal":
                temp.push(data[key] as ExerciseNormal)
                break;
            case "multiple-choice":
                temp.push(data[key] as ExerciseMultipleChoice)
                break;
            default:
                break;
        }
      });
    return temp;
} 