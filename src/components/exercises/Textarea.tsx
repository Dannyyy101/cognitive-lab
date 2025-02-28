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
          className="resize-none border border-bgColor_neutral_emphasis pl-1 w-1/2 h-20 rounded-md mt-4 focus:outline-none"
          value={exercise[index] as string}
          placeholder={index}
          onChange={(e) =>
            setExercise({ ...exercise, [index]: e.target.value })
          }
        />
      ) : (
        <p className="border border-bgColor_neutral_emphasis pl-1 w-1/2 h-20 rounded-md mt-4">
          {exercise[index] as string}
        </p>
      )}
    </>
  );
};
