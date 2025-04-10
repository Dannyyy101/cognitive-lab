"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { SubjectProvider, useSubject } from "@/context/SubjectProvider";
import { getDefaultExerciseByType } from "@/utils/exerciseFunctions";
import { EditExerciseView } from "./EditExerciseView";
import { ExerciseExplorer } from "@/app/subjects/create/ExerciseExplorer";
import { ExerciseTyp } from "@/types/dtos/exerciseDTO";
import {
  createNewSubject,
  getSubjectById,
  updateSubjectById,
} from "@/actions/subjectActions";
import { Loading } from "@/components/Loading";
import {IsUserAdmin} from "@/components/auth/IsUserAdmin";

interface CreateSubjectViewProps {
  redirectUrl: string | null;
  parentId: string | null;
}

const CreateSubjectView = ({
  parentId,
}: CreateSubjectViewProps) => {
  const difficulties = ["Very Easy", "Easy", "Medium", "Hard", "Really Hard"];
  const exerciseVariants: ExerciseTyp[] = ["text", "multiple-choice", "image"];
  const [newExerciseType, setNewExerciseType] = useState<ExerciseTyp>("text");
  const [newExerciseIndex, setNewExerciseIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { subject, setSubject } = useSubject();

  const handleCreateNewSubject = async () => {
    setLoading(true);
    let parent = null;
    if (parentId) parent = JSON.parse(await getSubjectById(parentId));

    const id = await createNewSubject({ ...subject, parent: parent });

    if (parent) {
      const newParent = {
        ...parent,
        children: [...parent.children, { ...subject, id: id }],
      };
      await updateSubjectById(parent.id, newParent);
    }
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
    setLoading(false);
  };

  return (
    <main className="w-screen mt-32 flex justify-center items-center flex-col h-fit">
      <IsUserAdmin>
      <section className="w-10/12">
        <h1 className="text-3xl font-bold">Erstelle eine neue Aufgabe</h1>
        <p className="text-fgColor_disabled text-sm">
          Entwerfen Sie Fragen und stellen Sie Ihre Übung zusammen
        </p>
      </section>

      <section className="relative w-10/12 rounded-md border-borderColor_default border p-4 mt-4 flex flex-col">
        <button
          onClick={handleCreateNewSubject}
          className="flex justify-center items-center absolute right-4 w-48 h-10 rounded-md bg-bgColor_inverse text-bgColor_default font-semibold"
        >
          {loading ? <Loading /> : " Subject erstellen"}
        </button>
        <h2 className="text-2xl font-bold">Subject Details</h2>
        <p className="text-fgColor_disabled text-sm">
          Enter the basic information about your exercise
        </p>
        <label className="mt-4">Subject Name</label>
        <input
          value={subject.name}
          onChange={(e) => setSubject({ ...subject, name: e.target.value })}
          className="w-full max-w-96 h-10 bg-transparent text-fgColor_default border border-borderColor_default pl-1 rounded-md"
        />
        <label className="mt-2">Schwierigkeit</label>
        <select className="text-bgColor_default w-1/2 h-8 border border-borderColor_default pl-1 rounded-md bg-bgColor_default">
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
        <div className="flex justify-centers w-full mt-4">
          <div className="flex justify-centers">
            <ExerciseExplorer
              handleFocusExercise={(n) => setNewExerciseIndex(n)}
              focusedExerciseIndex={newExerciseIndex}
            />
          </div>
          <EditExerciseView index={newExerciseIndex} />
        </div>
        <select
          value={newExerciseType}
          onChange={(e) => setNewExerciseType(e.target.value as ExerciseTyp)}
          className="text-bgColor_default bg-bgColor_inverse absolute right-56 w-32 h-8 border border-borderColor_default pl-1 rounded-md"
        >
          {exerciseVariants.map((variant) => (
            <option key={variant}>{variant}</option>
          ))}
        </select>
        <button
          onClick={handleAddExercise}
          className="absolute right-4 w-48 h-10 rounded-md bg-bgColor_inverse text-bgColor_default font-semibold"
        >
          Aufgabe hinzufügen
        </button>
      </section>
      </IsUserAdmin>
    </main>
  );
};

export default function Page() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl");
  const subjectId = searchParams.get("subjectId");
  const parentId = searchParams.get("parentId");

  return (
    <SubjectProvider subjectId={subjectId || undefined}>
      <CreateSubjectView redirectUrl={redirectUrl} parentId={parentId} />
    </SubjectProvider>
  );
}
