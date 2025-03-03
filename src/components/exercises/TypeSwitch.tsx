import {useState} from "react";
import {useExercise} from "@/context/ExerciseProvider";
import {ExerciseType} from "@/types/dtos/exerciseDTO";

export const TypeSwitch = () => {
    const [type, setType] = useState<ExerciseType>("normal")
    const types: ExerciseType[] = ["normal", "multiple-choice", "image"]

    const {exercise, setExercise} = useExercise()

    const handleChangeType = (e: ExerciseType) => {
        setExercise({...exercise, type: e})
        setType(e)
    }

    return <div className="w-full mt-2"><select value={type} className="text-fgColor-default"
                                           onChange={(e) => handleChangeType(e.target.value as ExerciseType)}>
        {types.map((e, index) => <option key={index} value={e}>{e}</option>)}
    </select>
    </div>
}