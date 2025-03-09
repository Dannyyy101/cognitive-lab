'use client'
import React, {useEffect, useState} from "react";
import {useExercise} from "@/context/ExerciseProvider";

interface SolutionExerciseProps extends React.HTMLAttributes<HTMLDivElement> {
    userInput: string;
}

export const SolutionExercise: React.FC<SolutionExerciseProps> = ({userInput, ...props}) => {
    const [answerIsCorrect, setAnswerIsCorrect] = useState<boolean>()
    const {exercise} = useExercise()

    useEffect(() => {
        if (userInput === exercise.answer) {
            setAnswerIsCorrect(true)
        } else {
            setAnswerIsCorrect(false)
        }
    }, [exercise.answer, userInput]);

    return <div {...props}>
        {answerIsCorrect ?
            <div
                className=" max-h-36 overflow-y-auto p-2 w-full flex flex-col bg-bgColor_success_muted border border-borderColor_success_emphasis rounded-md">
                <h3 className="text-xl font-semibold text-fgColor_success">Korrekt</h3>
                <p className="text-fgColor_success">{`Die Antwort lautet: ${exercise.answer}`}</p>
            </div> :
            <div
                className=" max-h-36 overflow-y-auto p-2 w-full flex flex-col bg-bgColor_danger_muted border border-borderColor_danger_emphasis rounded-md">
                <h3 className="text-xl font-semibold text-fgColor_danger">Inkorrekt</h3>
                <p className="text-fgColor_danger">{`Die Antwort lautet: ${exercise.answer}`}</p>
            </div>
        }
    </div>
}