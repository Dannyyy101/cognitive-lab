"use client";
import { CreateExercise } from "@/components/exercises/CreateExercise";
import { Exercise } from "@/components/exercises/Exercise";
import { PopUpView } from "@/components/PopUpView";
import { useSubject } from "@/context/SubjectProvider";
import { CombinedExerciseDTO } from "@/types/dtos/exerciseDTO";
import { ExerciseBase } from "@/types/models/exercise";
import { LearnExercise } from "@/components/exercises/LearnExercise";

import { useState } from "react";

export default function Page() {
  const { subject } = useSubject();
  const [selectedExercise, setSelectedExercise] = useState<ExerciseBase | null>(
    null
  );
  const [createNewExercise, setCreateNewExercise] =
    useState<ExerciseBase | null>();
  const [learnExercise, setLearnExercise] = useState<ExerciseBase | null>();

  const handleNextExercise = () => {
    const temp = [...subject.exercises];
    if (learnExercise) {
      let index = temp.findIndex((e) => e.id === learnExercise.id);
      if (index !== -1 && ++index < temp.length) {
        setLearnExercise({ ...temp[index] });
      }
    }
  };

  const handlePreviousExercise = () => {
    const temp = [...subject.exercises];
    if (learnExercise) {
      let index = temp.findIndex((e) => e.id === learnExercise.id);
      if (index !== -1 && --index >= 0) {
        setLearnExercise(temp[index]);
      }
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <section className="w-2/3 font-bold relative">
        <button
          onClick={() =>
            setCreateNewExercise({ id: "", question: "", type: "" })
          }
          className="font-semibold border border-borderColor_translucent bg-bgColor_inset text-fgColor-default w-28 h-8 rounded-md absolute right-28 -top-10"
        >
          Hinzufügen
        </button>
        <button
          onClick={() => setLearnExercise(subject.exercises[0])}
          className="border border-bgColor_open_emphasis bg-bgColor_open_emphasis text-fgColor_white w-24 h-8 rounded-md absolute right-0 -top-10"
        >
          Lernen
        </button>
        <h1 className="text-2xl text-fgColor_default">{subject.name}</h1>
        <hr />
        <table className="w-full border-collapse">
          <tbody className="">
            {subject.exercises.map((exercise, index) => (
              <tr key={index} className="border border-fgColor_default">
                <td className="text-fgColor_default h-8 pl-1">
                  <button
                    className="w-full text-left"
                    onClick={() => {
                      setSelectedExercise(exercise);
                    }}
                  >
                    {exercise.question}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {selectedExercise !== null && (
        <PopUpView handlePopUpClose={() => setSelectedExercise(null)}>
          <Exercise
            subjectId={subject.id}
            exercise={selectedExercise as CombinedExerciseDTO}
          ></Exercise>
        </PopUpView>
      )}
      {createNewExercise && (
        <PopUpView handlePopUpClose={() => setCreateNewExercise(null)}>
          <CreateExercise subjectId={subject.id} />
        </PopUpView>
      )}
      {learnExercise && (
        <PopUpView handlePopUpClose={() => setLearnExercise(null)}>
          <LearnExercise
            key={learnExercise.id}
            nextExercise={handleNextExercise}
            previousExercise={handlePreviousExercise}
            subjectId={subject.id}
            exercise={learnExercise as CombinedExerciseDTO}
          />
        </PopUpView>
      )}
    </main>
  );
}
