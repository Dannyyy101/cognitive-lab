"use client";
import React, { useState } from "react";
import { useSubject } from "@/context/SubjectProvider";
import { getDefaultExerciseByType } from "@/utils/exerciseFunctions";
import { EditExerciseView } from "@/app/subjects/create/EditExerciseView";
import { ExerciseExplorer } from "@/app/subjects/create/ExerciseExplorer";
import { ExerciseBaseDTO, ExerciseTyp } from "@/types/dtos/exerciseDTO";
import {
  removeExercisesFromSubject,
  updateSubjectById,
} from "@/actions/subjectActions";
import deepEqual from "deep-equal";
import {
  createNewExercise,
  updateExerciseById,
} from "@/actions/exerciseActions";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";
import {IsUserAdmin} from "@/components/auth/IsUserAdmin";

const CreateSubjectView = () => {
  const difficulties = ["Very Easy", "Easy", "Medium", "Hard", "Really Hard"];
  const exerciseVariants: ExerciseTyp[] = ["text", "multiple-choice", "image"];
  const [newExerciseType, setNewExerciseType] = useState<ExerciseTyp>("text");
  const [newExerciseIndex, setNewExerciseIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { subject, setSubject } = useSubject();
  const [oldSubject, _setOldSubject] = useState(subject);

  const handleUpdateSubject = async () => {
    setLoading(true);
    const elementsToUpdate: ExerciseBaseDTO[] = [];

    await Promise.all(
      subject.exercises.map(async (newExercise) => {
        const index = oldSubject.exercises.findIndex(
          (e) => e.id === newExercise.id,
        );

        if (index !== -1) {
          const oldExercise = oldSubject.exercises[index];
          const equal = deepEqual(newExercise, oldExercise);
          console.log(equal);
          if (!equal) {
            await updateExerciseById(newExercise.id, newExercise);
          }
          elementsToUpdate.push(newExercise);
        } else {
          const savedExercise = await createNewExercise(newExercise);
          console.log("Saved Exercise:", savedExercise);
          elementsToUpdate.push(savedExercise);
        }
      }),
    );

    await Promise.all(
      oldSubject.exercises.map(async (oldExercise) => {
        const index = subject.exercises.findIndex(
          (e) => e.id === oldExercise.id,
        );
        if (index === -1) {
          console.log(oldSubject);
          await removeExercisesFromSubject(subject.id, oldExercise.id);
        }
      }),
    );

    await updateSubjectById(subject.id, {
      ...subject,
      exercises: elementsToUpdate,
    });
    setLoading(false);
    router.back();
  };

  const handleAddExercise = () => {
    setSubject({
      ...subject,
      exercises: [
        ...subject.exercises,
        getDefaultExerciseByType(newExerciseType),
      ],
    });
  };

  return (
    <main className="w-screen mt-32 flex justify-center items-center flex-col h-fit">
      <IsUserAdmin>
      <section className="w-10/12">
        <h1 className="text-3xl font-bold">Editiere eine Aufgabe</h1>
        <p className="text-fgColor_disabled text-sm">
          Entwerfen Sie Fragen und stellen Sie Ihre Übung zusammen
        </p>
      </section>

      <section className="relative w-10/12 rounded-md border-borderColor_default border p-4 mt-4 flex flex-col">
        <button
          onClick={handleUpdateSubject}
          className="absolute right-4 w-48 h-10 rounded-md bg-bgColor_inverse text-fgColor_onEmphasis font-semibold flex justify-center items-center"
        >
          {loading ? <Loading /> : "Subject updaten"}
        </button>
        <h2 className="text-2xl font-bold">Subject Details</h2>
        <p className="text-fgColor_disabled text-sm">
          Enter the basic information about your exercise
        </p>
        <label className="mt-4">Subject Name</label>
        <input
          value={subject.name}
          onChange={(e) => setSubject({ ...subject, name: e.target.value })}
          className="w-full h-8 border border-borderColor_default pl-1 rounded-md"
        />
        <label className="mt-2">Schwiergkeit</label>
        <select className="w-1/2 h-8 border border-borderColor_default pl-1 rounded-md">
          {difficulties.map((difficulty) => (
            <option key={difficulty}>{difficulty}</option>
          ))}
        </select>
      </section>
      <section className="w-10/12 rounded-md border-borderColor_default border p-4 mt-8 flex flex-col relative">
        <h2 className="text-2xl font-bold">Fragen</h2>
        <p className="text-fgColor_disabled text-sm">
          Enter the basic information about your exercise
        </p>
        <div className="flex">
          <ExerciseExplorer
            handleFocusExercise={(n) => setNewExerciseIndex(n)}
            focusedExerciseIndex={newExerciseIndex}
          />
          <EditExerciseView index={newExerciseIndex} />
        </div>
        <select
          value={newExerciseType}
          onChange={(e) => setNewExerciseType(e.target.value as ExerciseTyp)}
          className="bg-bgColor_inverse text-fgColor_onEmphasis absolute right-56 w-32 h-8 border border-borderColor_default pl-1 rounded-md"
        >
          {exerciseVariants.map((variant) => (
            <option key={variant}>{variant}</option>
          ))}
        </select>
        <button
          onClick={handleAddExercise}
          className="absolute right-4 w-48 h-10 rounded-md bg-bgColor_inverse text-fgColor_onEmphasis font-semibold"
        >
          Aufgabe hinzufügen
        </button>
      </section>
      </IsUserAdmin>
    </main>
  );
};

export default function Page() {
  return <CreateSubjectView />;
}
