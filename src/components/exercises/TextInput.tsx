import { useExercise } from "@/context/ExerciseProvider";
import React from "react";

interface TextInputProps {
  value: string;
  placeholder:string
}

export const TextInput: React.FC<TextInputProps> = ({ value, placeholder }) => {
  const { exercise, setExercise } = useExercise();

  return (
    <input
        className="w-full h-full border border-borderColor_default pl-2 rounded-md"
      value={exercise[value] as string}
      placeholder={placeholder}
      onChange={(e) => setExercise({ ...exercise, [value]: e.target.value })}
    />
  );
};
