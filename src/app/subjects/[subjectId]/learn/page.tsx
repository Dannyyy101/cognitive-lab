"use client";
import { ExerciseSolutionView } from "@/components/exercises/display/ExerciseSolutionView";
import { useSubject } from "@/context/SubjectProvider";
import {
  ExerciseBaseDTO,
  ExerciseImageComponent,
  ExerciseTextComponent,
} from "@/types/dtos/exerciseDTO";
import React, { useState } from "react";
import { Arrow } from "@/components/ui/button/Arrow";
//import { setExerciseLearnedForUser } from "@/actions/userActions";
//import { useUserSession } from "@/hooks/useUserSession";
import Image from "next/image";
import Link from "next/link";
import { Text } from "@/components/text/Text";
import { isAnswerCorrect as checkAnswer } from "@/utils/exerciseFunctions";
import { addRatingToExercise } from "@/utils/addRatingToExercise";

export default function Page() {
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const { subject } = useSubject();
  // const user = useUserSession(null);

  if (subject.exercises.length === 0) {
    return <p className="mt-32 text-black">This subject has no exercises</p>;
  }

  const isAnswerCorrect = () => {
    return checkAnswer(
      userAnswer,
      (subject.exercises[exerciseIndex].answer[0] as ExerciseTextComponent)
        .content,
    );
  };

  const handleNextExercise = () => {
    setExerciseIndex((prev) =>
      prev < subject.exercises.length - 1
        ? prev + 1
        : subject.exercises.length - 1,
    );
    setUserAnswer("");
    setShowAnswer(false);
  };

  const handlePrevoisExercise = () => {
    setExerciseIndex((prev) => (prev > 0 ? prev - 1 : 0));
    setUserAnswer("");
    setShowAnswer(false);
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center relative">
      <Arrow
        onClick={handlePrevoisExercise}
        className="absolute top-1/2 left-4"
        direction={"left"}
      />
      <Arrow
        onClick={handleNextExercise}
        className="absolute top-1/2 right-4"
        direction={"right"}
      />
      <section className="w-2/3 min-h-96 flex border-l-4 border-l-bgColor_accent_emphasis border border-borderColor_default rounded-md flex-col relative">
        <div className="w-full min-h-96 p-4">
          <ExerciseLearnCard
            exercise={subject.exercises[exerciseIndex]}
            handleUserAnswer={setUserAnswer}
            userAnswer={userAnswer}
          />
          {showAnswer && (
            <ExerciseSolutionView
              answer={(
                subject.exercises[exerciseIndex]
                  .answer[0] as ExerciseTextComponent
              ).content.replaceAll("/", "")}
              type={isAnswerCorrect() ? "correct" : "wrong"}
            />
          )}
        </div>
        <div className="h-20 relative w-full border-t border-t-borderColor_default mt-2 p-4">
          {subject.exercises[exerciseIndex].documentationUrl && (
            <Link
              href={subject.exercises[exerciseIndex].documentationUrl}
              className="flex justify-center items-center absolute left-4 bottom-5 h-10 w-32 bg-bgColor_accent_emphasis rounded-md text-white"
            >
              Dokumentation
            </Link>
          )}
          <button
            onClick={() => {
              setShowAnswer((prev) => !prev);
              addRatingToExercise(
                subject.parent ? subject.parent.id : "",
                subject.id,
                subject.exercises[exerciseIndex],
                checkAnswer(
                  userAnswer,
                  (
                    subject.exercises[exerciseIndex]
                      .answer[0] as ExerciseTextComponent
                  ).content,
                ),
              );
            }}
            className="absolute right-4 bottom-5 h-10 w-32 bg-bgColor_accent_emphasis rounded-md text-white"
          >
            Check Answer
          </button>
        </div>
      </section>
    </main>
  );
}

const ExerciseLearnCard = ({
  exercise,
  handleUserAnswer,
  userAnswer,
}: {
  exercise: ExerciseBaseDTO;
  userAnswer: string;
  handleUserAnswer: (answer: string) => void;
}) => {
  let questionComponent = null;
  let answerComponent = null;

  switch (exercise.question[0].type) {
    case "text":
      questionComponent = (
        <>
          <label className="text-fgColor_default">Frage</label>
          <Text className="text-fgColor_default">{(exercise.question[0] as ExerciseTextComponent).content}</Text>
        </>
      );
      break;
    case "image":
      questionComponent = (
        <>
          <label className="text-fgColor_default">Frage</label>
          <Image
            src={(exercise.question[0] as ExerciseImageComponent).imageUrl}
            alt="question-image"
            width={128}
            height={128}
          />
        </>
      );
  }

  switch (exercise.answer[0].type) {
    case "text":
      answerComponent = (
        <div className="my-6 flex flex-col">
          <label className="text-fgColor_default">Deine Antwort</label>
          <input
            value={userAnswer}
            onChange={(e) => handleUserAnswer(e.target.value)}
            className="text-fgColor_default w-full bg-transparent max-w-96 h-10 pl-1 border border-borderColor_default rounded-md"
          />
        </div>
      );
  }

  return (
    <div>
      {questionComponent}
      {answerComponent}
    </div>
  );
};
