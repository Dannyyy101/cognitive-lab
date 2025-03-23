"use client";
import {ExerciseBaseDTO} from "@/types/dtos/exerciseDTO";
import {SubjectDTO} from "@/types/dtos/subjectDTO";

export const createChild = (
    parentId: string,
    subjectId: string,
    exercise: ExerciseBaseDTO,
    correct: boolean,
) => {
    const parentString = localStorage.getItem(parentId) || "";
    const parent = JSON.parse(parentString);

    if (!parent.child) {
        createParent(parentId, subjectId, exercise, correct);
    } else {
        parent.children.push({
            childId: subjectId,
            exercises: [
                {
                    exerciseId: exercise.id,
                    learned: {date: new Date(), correct: correct},
                },
            ],
        });
    }
};

export const createParent = (
    parentId: string,
    subjectId: string,
    exercise: ExerciseBaseDTO,
    correct: boolean,
) => {
    localStorage.setItem(
        parentId,
        JSON.stringify({
            children: [
                {
                    childId: subjectId,
                    exercises: [
                        {
                            exerciseId: exercise.id,
                            learned: {date: new Date(), correct: correct},
                        },
                    ],
                },
            ],
        }),
    );
};

export const getRatingForParent = (
    parentId: string,
    numberOfExercises: number,
) => {
    const parentString = localStorage.getItem(parentId);
    if (!parentString) {
        return 0;
    }

    const parent = JSON.parse(parentString);
    if (!parent.children || parent.children.length === 0) {
        return 0;
    }

    return Math.round(parent.children.reduce((sum:number, e:SubjectDTO) => sum + e.exercises.length, 0) / numberOfExercises * 100);
};

export const deleteLearnProgress = () =>{
    const theme = localStorage.getItem("theme")
    localStorage.clear()
    localStorage.setItem("theme", theme || "light")
}