import {CombinedExerciseDTO} from "@/types/dtos/exerciseDTO";

export const filterExerciseFields = (exercise: CombinedExerciseDTO) => {
    if (exercise.type === 'normal') {
        const { type, createdOn, lastEdited, lastLearned, question, answer} = exercise;
        return { type, createdOn, lastEdited, lastLearned, question, answer };
    }
    return null;
};