import { ExerciseProvider } from "@/context/ExerciseProvider";
import { SubmitButton } from "./SubmitButton";
import { Textarea } from "./Textarea";
import { CombinedExerciseDTO } from "@/types/dtos/exerciseDTO";
import pencil from "../../media/pencil.svg";
import book from "../../media/book.svg";
import Image from "next/image";
import { useState } from "react";
import { DeleteButton } from "./DeleteButton";

interface ExerciseProps {
  subjectId?: string;
  exercise: CombinedExerciseDTO;
}
export const Exercise: React.FC<ExerciseProps> = ({ subjectId, exercise }) => {
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <section className="flex flex-col items-center h-[40rem] relative w-[60rem]">
      <button
        onClick={() => setEdit((prev) => !prev)}
        className="absolute right-8 top-8"
      >
        <Image src={edit ? pencil : book} alt="pencil"></Image>
      </button>
      <ExerciseProvider oldExercise={exercise}>
        <h1 className="text-3xl font-bold mt-8"></h1>
        <section className="w-full flex flex-col items-center mt-8">
          <Textarea index="question" edit={edit} />
          <Textarea index="answer" edit={edit} />
          <SubmitButton subjectId={subjectId}>Speichern</SubmitButton>
          <DeleteButton subjectId={subjectId}>Delete</DeleteButton>
        </section>
      </ExerciseProvider>
    </section>
  );
};
