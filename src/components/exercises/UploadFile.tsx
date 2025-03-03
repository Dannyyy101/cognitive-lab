"use client";

import React, {useState} from "react";
import {useExercise} from "@/context/ExerciseProvider";


interface UploadFileProps {
    type: string
}

export const UploadFile: React.FC<UploadFileProps> = ({type}) => {
    const [,setFile] = useState<File | null>(null);

    const {exercise, setExercise} = useExercise()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]; // Use optional chaining to handle null case
        if (selectedFile) {
            if (type === "question") {
                setExercise({...exercise, questionImageUrl: selectedFile})
            } else if (type === "answer") {
                setExercise({...exercise, answerImageUrl: selectedFile})
            }
            setFile(selectedFile);
        }
    };

    return (
        <>{exercise.type === "image" &&
            <div className="w-full my-2">
                <input type="file" onChange={handleFileChange}/>
            </div>
        }
        </>
    );
}
