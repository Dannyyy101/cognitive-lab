import { ExerciseTextArea } from "@/components/exercises/display/ExerciseTextArea";
import { useSubject } from "@/context/SubjectProvider";
import { ExerciseTextComponent } from "@/types/dtos/exerciseDTO";

export const EditExerciseView = ({ index }: { index: number }) => {
  const { subject, setSubject } = useSubject();

  if (!subject.exercises || subject.exercises.length === 0) return null;

  const exercise = subject.exercises.at(index);
  if (!exercise) return null;

  const handleChangeExerciseTextContent = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    type: "question" | "answer",
  ) => {
    const newContent = e.target.value;
    const updatedExercises = [...subject.exercises];

    if (updatedExercises[index][type]?.[0]) {
      updatedExercises[index] = {
        ...updatedExercises[index],
        [type]: [
          {
            ...updatedExercises[index][type][0],
            content: newContent,
          },
          ...updatedExercises[index][type].slice(1),
        ],
      };
    }

    setSubject({ ...subject, exercises: updatedExercises });
  };

  let questionComponent = null;
  let answerComponent = null;

  switch (exercise.question?.at(0)?.type) {
    case "text":
      questionComponent = (
        <>
          <label className="mt-2">Frage</label>
          <ExerciseTextArea
            onChange={(e) => handleChangeExerciseTextContent(e, "question")}
            value={
              (exercise.question?.at(0) as ExerciseTextComponent)?.content ?? ""
            }
            placeholder="Gib hier deine Frage ein"
          />
        </>
      );
      break;
  }

  switch (exercise.answer?.at(0)?.type) {
    case "text":
      answerComponent = (
        <>
          <label className="mt-2">Antwort</label>
          <ExerciseTextArea
            value={
              (exercise.answer?.at(0) as ExerciseTextComponent)?.content ?? ""
            }
            onChange={(e) => handleChangeExerciseTextContent(e, "answer")}
            placeholder="Gib hier deine Antwort ein"
          />
        </>
      );
      break;
  }

  return (
    <div className="flex flex-col ml-8">
      {questionComponent}
      {answerComponent}
    </div>
  );
};
