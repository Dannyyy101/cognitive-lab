import {deleteLearnProgress} from "@/utils/userExerciseRating";

export const DeleteLearningProgress = () =>{
    return <button className="w-48 h-10 rounded-md bg-bgColor_danger_muted text-fgColor_danger mt-4" onClick={deleteLearnProgress}>Delete Learn Progress</button>
}