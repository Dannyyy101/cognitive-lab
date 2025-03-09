import {useExercise} from "@/context/ExerciseProvider";

interface UserInputExerciseProps {
    onChange: (value: string) => void;
}

export const UserInputExercise = ({onChange}: UserInputExerciseProps) => {
    const {exercise} = useExercise();

    switch (exercise.type) {
        case "normal":
            return <input onChange={(e) => onChange(e.target.value)} className="mt-2 w-full h-10 border border-borderColor_default pl-2 rounded-md" placeholder={"Eingabe"}/>;
        default:
            return null;
    }
};