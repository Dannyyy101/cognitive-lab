import { ExerciseBase, ExerciseMultipleChoice, ExerciseNormal } from "@/types/exercise";

export const generateExercises = async (data: Record<string, any>) => {
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