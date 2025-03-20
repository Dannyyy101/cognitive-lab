"use client";
import { ExerciseBaseDTO } from "@/types/dtos/exerciseDTO";
import { createParent, createChild } from "./userExerciseRating";
import {LearnExerciseDTO, LearnSubjectDTO} from "@/types/dtos/learnExerciseDTO";

export const addRatingToExercise = (
  parentId: string,
  subjectId: string,
  exercise: ExerciseBaseDTO,
  correct: boolean,
) => {

  if(parentId.length === 0){
    throw new Error("parent id is not allowed to be null")
  }

  const parentString = localStorage.getItem(parentId);
  if (!parentString) {
    createParent(parentId, subjectId, exercise, correct);
    return;
  }

  const parent = JSON.parse(parentString);
  let index = -1;
  if (
    !parent.children ||
    (index = parent.children.findIndex((e:LearnSubjectDTO) => e.childId === subjectId)) === -1
  ) {
    createChild(parentId, subjectId, exercise, correct);
    return;
  }

  let exerciseIndex = -1;
  if (
    (exerciseIndex = parent.children[index].exercises.findIndex(
      (e:LearnExerciseDTO) => e.exerciseId === exercise.id,
    )) === -1
  ) {
    parent.children[index].exercises.push({
      exerciseId: exercise.id,
      learned: { date: new Date(), correct: correct },
    });
  } else {
    parent.children[index].exercises[exerciseIndex] = {
      exerciseId: exercise.id,
      learned: { date: new Date(), correct: correct },
    };
  }

  localStorage.setItem(parentId, JSON.stringify(parent));
};
