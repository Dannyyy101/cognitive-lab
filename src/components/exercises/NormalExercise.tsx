"use client";
import { type ExerciseNormal } from "@/types/exercise";

import pencil from "../../media/pencil.svg";
import book from "../../media/book.svg";

import Image from "next/image";
import { useState } from "react";
import { createNewExercise, updateExerciseById } from "@/actions/exerciseActions";
import { useSubject } from "@/context/SubjectProvider";

interface NormalExerciseProps {
  exercise: ExerciseNormal;
  newElement?: boolean;
}

export const NormalExercise: React.FC<NormalExerciseProps> = ({
  exercise,
  newElement,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editedExercise, setEditedExercise] =
    useState<ExerciseNormal>(exercise);

  const { subject, setSubject } = useSubject();

  const handleUpdateExercise = async () => {
    if (newElement) {
      await createNewExercise(editedExercise.id, editedExercise);
      const temp = [...subject.exercises];
      temp.push(editedExercise);
      setSubject({ ...subject, exercises: temp });
    } else {
      await updateExerciseById(editedExercise.id, editedExercise);
      const temp = [...subject.exercises];
      const index = temp.findIndex((e) => (e.id = exercise.id));
      if (index !== -1) {
        temp[index] = editedExercise;
      }
      setSubject({ ...subject, exercises: temp });
    }
  };

  const handleChangeExerciseType = async (newType: string) => {
    setEditedExercise({ ...editedExercise, type: newType });
    await handleUpdateExercise();
  };

  return (
    <div className="flex flex-col items-center h-[40rem] relative w-[60rem]">
      <button
        onClick={() => setEdit((prev) => !prev)}
        className="absolute right-8 top-8"
      >
        <Image src={edit ? pencil : book} alt="pencil"></Image>
      </button>
      
      {newElement && (
        <select
          onChange={(e) => handleChangeExerciseType(e.target.value)}
          value={editedExercise.type}
        >
          <option value="normal">Normal</option>
          <option value="multiple-choice">Multiple Choice</option>
        </select>
      )}
      <section className="mt-8 flex flex-col w-full p-4 h-full">
        <div className="w-full h-1/2">
          <h1 className="text-2xl">Frage</h1>
          {edit ? (
            <div className="flex flex-col">
              <textarea
                className="resize-none border border-bgColor_neutral_emphasis pl-1 w-full h-fit rounded-md"
                value={editedExercise.question}
                onChange={(e) =>
                  setEditedExercise({
                    ...editedExercise,
                    question: e.target.value,
                  })
                }
              />
            </div>
          ) : (
            <>
              <h3 className="text-xl">{exercise.question}</h3>
            </>
          )}
        </div>
        <hr />
        <div className="w-full h-1/2">
          <h1 className="text-2xl mt-2">Antwort</h1>
          {edit ? (
            <textarea
              className="resize-none border border-bgColor_neutral_emphasis pl-1 w-full h-fit rounded-md"
              value={editedExercise.answer}
              onChange={(e) =>
                setEditedExercise({ ...editedExercise, answer: e.target.value })
              }
            />
          ) : (
            <h3 className="text-xl">{exercise.answer}</h3>
          )}
        </div>
        <button
          onClick={handleUpdateExercise}
          className="absolute right-8 bottom-8 w-32 bg-bgColor_accent_emphasis text-fgColor_white h-10 rounded-md"
        >
          Speichern
        </button>
      </section>
    </div>
  );
};
