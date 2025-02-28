import { ExerciseProvider } from "@/context/ExerciseProvider";
import { SubmitButton } from "./SubmitButton";
import { Textarea } from "./Textarea";

interface CreateExerciseProps {
  subjectId?: string;
}
export const CreateExercise: React.FC<CreateExerciseProps> = ({
  subjectId,
}) => {
  return (
    <section className="flex flex-col items-center h-[40rem] relative w-[60rem]">
      <ExerciseProvider>
        <h1 className="text-3xl font-bold mt-8">Create new exercise</h1>
        <section className="w-full flex flex-col items-center mt-8">
          <Textarea index="question" />
          <Textarea index="answer" />
          <SubmitButton edit={false} subjectId={subjectId}>
            Speichern
          </SubmitButton>
        </section>
      </ExerciseProvider>
    </section>
  );
};
