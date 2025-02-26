"use client";
import { NormalExercise } from "@/components/exercises/NormalExercise";
import { PopUpView } from "@/components/PopUpView";
import { useSubject } from "@/context/SubjectProvider";
import { ExerciseBase, ExerciseNormal } from "@/types/models/exercise";

import { useState } from "react";

export default function Page() {
  const { subject } = useSubject();
  const [selectedExercise, setSelectedExercise] = useState<ExerciseBase | null>(
    null
  );
  const [createNewExercise, setCreateNewExercise] =
    useState<ExerciseBase | null>();

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <section className="w-2/3 font-bold relative">
        <button
          onClick={() =>
            setCreateNewExercise({ id: "", question: "", type: "" })
          }
          className="border border-bgColor_open_emphasis bg-bgColor_open_emphasis text-fgColor_white w-32 h-8 rounded-md absolute right-0 -top-10"
        >
          Hinzufügen
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
          <NormalExercise
            exercise={selectedExercise as ExerciseNormal}
          ></NormalExercise>
        </PopUpView>
      )}
      {createNewExercise && (
        <PopUpView handlePopUpClose={() => setCreateNewExercise(null)}>
          <NormalExercise exercise={createNewExercise as ExerciseNormal} newElement={true}></NormalExercise>
        </PopUpView>
      )}
    </main>
  );
}
