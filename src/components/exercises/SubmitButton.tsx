import {
    createNewExercise,
    updateExerciseById,
} from "@/actions/exerciseActions";
import {addExercisesToSubject} from "@/actions/subjectActions";
import {useExercise} from "@/context/ExerciseProvider";
import {usePopUpClose} from "@/context/PopUpContext";
import {useSubject} from "@/context/SubjectProvider";
import {ButtonHTMLAttributes, useState} from "react";
import {Loading} from "../Loading";
import {uploadFile} from "@/actions/fileActions";
import {sanitizeFileName} from "@/utils/sanatizeFilename";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    subjectId?: string;
    edit?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
                                                              children,
                                                              subjectId,
                                                              edit = true,
                                                              ...props
                                                          }) => {
    const {exercise} = useExercise();
    const {subject, setSubject} = useSubject();
    const handlePopUpClose = usePopUpClose();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const URL = "https://hwoergrnshbhumndrgue.supabase.co/storage/v1/object/public/docs//"
    const handleCreateExercise = async () => {
        setIsLoading(true);
        if (edit) {
            await updateExerciseById(exercise.id, exercise);
            const temp = [...subject.exercises];
            const index = temp.findIndex((e) => e.id === exercise.id);
            if (index !== -1) {
                temp[index] = exercise;
                setSubject({...subject, exercises: temp});
            }
        } else {
            if (exercise.type === "image") {
                if (exercise.questionImageUrl && exercise.questionImageUrl instanceof File) {
                    await uploadFile(exercise.questionImageUrl);
                    exercise.questionImageUrl = URL + sanitizeFileName(exercise.questionImageUrl.name)
                }
                if (exercise.answerImageUrl && exercise.answerImageUrl instanceof File) {
                    await uploadFile(exercise.answerImageUrl);
                    exercise.questionImageUrl = URL + sanitizeFileName(exercise.answerImageUrl.name)
                }
            }


            const newExercise = await createNewExercise(exercise);
            if (subjectId) {
                await addExercisesToSubject(subjectId, newExercise.id);

            }
            const temp = [...subject.exercises];
            temp.push(exercise);
            setSubject({...subject, exercises: temp});
        }
        setIsLoading(false);
        handlePopUpClose();
    };

    return (
        <button
            {...props}
            onClick={handleCreateExercise}
            className="absolute right-8 bottom-8 w-32 bg-bgColor_accent_emphasis text-fgColor_white h-10 rounded-md flex justify-center items-center"
        >
            {isLoading ? <Loading/> : children}
        </button>
    );
};
