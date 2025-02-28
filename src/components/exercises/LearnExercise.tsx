import { ExerciseProvider } from "@/context/ExerciseProvider";
import { Textarea } from "./Textarea";
import { CombinedExerciseDTO } from "@/types/dtos/exerciseDTO";
import Image from "next/image";
import { useState } from "react";

import leftArrow from "../../media/chevron-left.svg";
import rightArrow from "../../media/chevron-right.svg";

interface LearnExerciseProps {
  subjectId?: string;
  exercise: CombinedExerciseDTO;
  nextExercise: () => void;
  previousExercise: () => void;
}
export const LearnExercise: React.FC<LearnExerciseProps> = ({
  exercise,
  nextExercise,
  previousExercise,
}) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  return (
    <section className="flex flex-col items-center h-[40rem] relative w-[60rem]">
      <button onClick={previousExercise} className="absolute top-1/2 left-4">
        <Image src={leftArrow} alt="left-arrow" />
      </button>
      <button onClick={nextExercise} className="absolute top-1/2 right-4">
        <Image src={rightArrow} alt="right-arrow" />
      </button>
      <ExerciseProvider oldExercise={exercise}>
        <h1 className="text-3xl font-bold mt-8"></h1>
        <section className="w-full flex flex-col items-center mt-8">
          <Textarea index="question" edit={false} />
          {showAnswer && <Textarea index="answer" edit={false} />}
          <button className="absolute right-8 bottom-8 w-32 bg-bgColor_accent_emphasis text-fgColor_white h-10 rounded-md flex justify-center items-center" onClick={() => setShowAnswer((prev) => !prev)}>
            Show answer
          </button>
        </section>
      </ExerciseProvider>
    </section>
  );
};
