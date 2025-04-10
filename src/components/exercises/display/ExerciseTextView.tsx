import {ExerciseComponent, ExerciseTextComponent} from "@/types/dtos/exerciseDTO";
import {Text} from "@/components/text/Text";


export const ExerciseTextView = ({exercise, key}:{exercise: ExerciseComponent, key:string}) => {
    return <Text key={key} className="w-full">{(exercise as ExerciseTextComponent).content}</Text>
}