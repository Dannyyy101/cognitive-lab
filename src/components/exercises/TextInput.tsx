import { useExercise } from "@/context/ExerciseProvider";

interface TextInputProps {
  value: string;
}

export const TextInput: React.FC<TextInputProps> = ({ value }) => {
  const { exercise, setExercise } = useExercise();

  return (
    <input
      className="resize-none border border-bgColor_neutral_emphasis pl-1 w-1/2 h-10 rounded-md mt-4 focus:outline-none"
      value={exercise[value] as string}
      placeholder={value}
      onChange={(e) => setExercise({ ...exercise, [value]: e.target.value })}
    />
  );
};
