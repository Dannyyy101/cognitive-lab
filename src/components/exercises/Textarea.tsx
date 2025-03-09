import { useExercise } from "@/context/ExerciseProvider";

interface TextInputProps {
  index: string;
  edit?: boolean;
}

export const Textarea: React.FC<TextInputProps> = ({ index, edit = true }) => {
  const { exercise, setExercise } = useExercise();

  return (
    <>
      {edit ? (
        <textarea
            className="resize-none mt-2 w-full min-h-24 border border-borderColor_default pl-2 rounded-md"
          value={exercise[index] as string}
          placeholder={index}
          onChange={(e) =>
            setExercise({ ...exercise, [index]: e.target.value })
          }
        />
      ) : (
        <p className="border border-bgColor_neutral_emphasis pl-1 w-full h-20 rounded-md mt-1">
          {exercise[index] as string}
        </p>
      )}
    </>
  );
};
