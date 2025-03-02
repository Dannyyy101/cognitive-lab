"use client";

import React, {useState} from "react";
import {useExercise} from "@/context/ExerciseProvider";

export const  UploadFile = () => {
    const [file, setFile] = useState<File | null>(null);

    const {exercise, setExercise} = useExercise()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]; // Use optional chaining to handle null case
        if (selectedFile) {
            setExercise({...exercise, file: selectedFile})
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
