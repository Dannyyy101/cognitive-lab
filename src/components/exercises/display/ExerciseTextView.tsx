import {ExerciseTextComponent} from "@/types/dtos/exerciseDTO";


export const ExerciseTextView = ({exercise, key}:{exercise: ExerciseTextComponent, key:string}) => {
    return <div key={key} className="w-full">{exercise.content}</div>
}