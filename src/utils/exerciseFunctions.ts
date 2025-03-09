import {CombinedExerciseDTO, ExerciseType} from "@/types/dtos/exerciseDTO";

export const filterExerciseFields = (exercise: CombinedExerciseDTO) => {
    if (exercise.type === 'normal') {
        const {type, createdOn, lastEdited, lastLearned, question, answer} = exercise;
        return {type, createdOn, lastEdited, lastLearned, question, answer};
    }
    return null;
};

export const convertExerciseTypeIntoLabel = (type: ExerciseType) => {
    switch (type) {
        case "normal":
            return "Normal"
        case "multiple-choice":
            return "Multiple Choice"
    }
}