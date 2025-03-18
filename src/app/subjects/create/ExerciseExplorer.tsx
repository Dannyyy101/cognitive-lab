import { useSubject } from "@/context/SubjectProvider";
import Image from "next/image";
import trashIcon from "@/media/trash.svg";
import React from "react";

export const ExerciseExplorer = ({
  handleFocusExercise,
  focusedExerciseIndex,
}: {
  handleFocusExercise: (index: number) => void;
  focusedExerciseIndex: number;
}) => {
  const { subject, setSubject } = useSubject();

  const handleRemoveExerciseFromSubject = (index: number) => {
    const temp = [...subject.exercises];
    temp.splice(index, 1);
    setSubject({ ...subject, exercises: temp });
  };

  return (
    <div className="flex flex-col w-32 overflow-y-auto mx-4">
      {subject.exercises.map((_exercise, index) => (
        <div
          className={`my-1 flex items-center h-8 rounded-md ${focusedExerciseIndex === index ? "bg-black text-white" : "bg-white text-black"}`}
          key={index}
        >
          <button
            className={`focus:bg-black w-20`}
            onClick={() => handleFocusExercise(index)}
          >
            Frage {index + 1}
          </button>
          <button onClick={() => handleRemoveExerciseFromSubject(index)}>
            <Image
              className={`${focusedExerciseIndex === index && "filter invert"}`}
              src={trashIcon}
              alt={"trash-icon"}
            />
          </button>
        </div>
      ))}
    </div>
  );
};
