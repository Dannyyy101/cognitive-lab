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
          className="resize-none border border-bgColor_neutral_emphasis pl-1 w-full h-20 mt-1 rounded-md focus:outline-none"
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
