import { useExercise } from "@/context/ExerciseProvider";
import { createNewExercise } from "@/actions/exerciseActions";
import { addExercisesToSubject } from "@/actions/subjectActions";

export const SubmitButton = ({ subjectId }: { subjectId: string | null }) => {
  const { exercise } = useExercise();

  const handleSaveExercise = async () => {
    const id = await createNewExercise(exercise);
    if (subjectId) await addExercisesToSubject(subjectId, id.id);
  };

  return (
    <button
      className="absolute right-0 top-2 w-32 h-10 bg-bgColor_accent_emphasis text-fgColor_white rounded-md"
      onClick={handleSaveExercise}
    >
      Speichern
    </button>
  );
};
