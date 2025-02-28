import {
  deleteExerciseById,
} from "@/actions/exerciseActions";
import {
  removeExercisesFromSubject,
} from "@/actions/subjectActions";
import { useExercise } from "@/context/ExerciseProvider";
import { usePopUpClose } from "@/context/PopUpContext";
import { useSubject } from "@/context/SubjectProvider";
import { ButtonHTMLAttributes, useState } from "react";
import { Loading } from "../Loading";

interface DeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  subjectId?: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  children,
  subjectId,
  ...props
}) => {
  const { exercise } = useExercise();
  const { subject, setSubject } = useSubject();
  const handlePopUpClose = usePopUpClose();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteExercise = async () => {
    setIsLoading(true);
    await deleteExerciseById(exercise.id);
    if (subjectId) await removeExercisesFromSubject(subjectId, exercise.id);
    const temp = [...subject.exercises];
    const index = temp.findIndex((e) => e.id === exercise.id);
    if (index !== -1) {
      temp.splice(index, 1);
      setSubject({ ...subject, exercises: temp });
    }
    setIsLoading(false);
    handlePopUpClose();
  };

  return (
    <button
      {...props}
      onClick={handleDeleteExercise}
      className="absolute left-8 bottom-8 w-32 bg-bgColor_danger_emphasis text-fgColor_white h-10 rounded-md flex justify-center items-center"
    >
      {isLoading ? <Loading /> : children}
    </button>
  );
};
