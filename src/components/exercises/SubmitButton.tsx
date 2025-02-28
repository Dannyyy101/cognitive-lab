import {
  createNewExercise,
  updateExerciseById,
} from "@/actions/exerciseActions";
import { addExercisesToSubject } from "@/actions/subjectActions";
import { useExercise } from "@/context/ExerciseProvider";
import { useSubject } from "@/context/SubjectProvider";
import { ButtonHTMLAttributes } from "react";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  subjectId?: string;
  edit?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  subjectId,
  edit = true,
  ...props
}) => {
  const { exercise } = useExercise();
  const { subject, setSubject } = useSubject();

  const hanldeCreateExercise = async () => {
    if (edit) {
      await updateExerciseById(exercise.id, exercise);
      const temp = [...subject.exercises];
      const index = temp.findIndex((e) => e.id === exercise.id);
      if (index !== -1) {
        temp[index] = exercise;
        setSubject({ ...subject, exercises: temp });
      }
    } else {
      const id = await createNewExercise(exercise);
      if (subjectId) {
        await addExercisesToSubject(subjectId, id);
      }
      const temp = [...subject.exercises];
      temp.push(exercise);
      setSubject({ ...subject, exercises: temp });
    }
  };

  return (
    <button
      {...props}
      onClick={hanldeCreateExercise}
      className="absolute right-8 bottom-8 w-32 bg-bgColor_accent_emphasis text-fgColor_white h-10 rounded-md"
    >
      {children}
    </button>
  );
};
