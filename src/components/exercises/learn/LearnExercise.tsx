import {ExerciseProvider} from "@/context/ExerciseProvider";
import {CombinedExerciseDTO} from "@/types/dtos/exerciseDTO";
import Image from "next/image";
import {useEffect, useState} from "react";


import {useSubject} from "@/context/SubjectProvider";
import {usePopUpClose} from "@/context/PopUpContext";
import {convertExerciseTypeIntoLabel} from "@/utils/exerciseFunctions";
import {Arrow} from "@/components/card/Arrow";

import xIcon from "../../../media/x.svg"
import {SolutionExercise} from "@/components/exercises/learn/SolutionExercise";
import {UserInputExercise} from "@/components/exercises/learn/UserInputExercise";

interface LearnExerciseProps {
    subjectId?: string;
    exercise: CombinedExerciseDTO;
    nextExercise: () => void;
    previousExercise: () => void;
}

export const LearnExercise: React.FC<LearnExerciseProps> = ({
                                                                exercise,
                                                                nextExercise,
                                                                previousExercise,
                                                            }) => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [exerciseIndex, setExerciseIndex] = useState<number>(0);
    const [inputValue, setInputValue] = useState(""); // State für den Eingabewert

    const handlePopUpClose = usePopUpClose()
    const {subject} = useSubject();

    useEffect(() => {
        const index = subject.exercises.findIndex((e) => e.id === exercise.id);
        setExerciseIndex(index)
        setProgress(((index + 1) * 100) / subject.exercises.length);
    }, [exercise]);

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };


    return (
        <section className="flex flex-col justify-center items-center h-screen md:h-[40rem] w-screen md:w-[40rem] relative lg:w-[60rem]">
            <button
                className="absolute right-4 top-4"
                onClick={() => handlePopUpClose()}>
                <Image src={xIcon} alt={"x-icon"}/>
            </button>

            <Arrow onClick={previousExercise} className="absolute top-1/2 left-4" direction={"left"}/>
            <Arrow onClick={nextExercise} className="absolute top-1/2 right-4" direction={"right"}/>

            <ExerciseProvider oldExercise={exercise}>
                <section className="w-3/4 flex flex-col items-center mt-12 h-full">
                    <h1 className="pl-4 text-3xl font-bold w-full">{subject.name}</h1>
                    <div
                        className="relative w-full h-2/3 mt-2 flex flex-col pt-4 border border-borderColor_default border-l-borderColor_accent_emphasis border-l-4 rounded-md">
                        <p className="absolute right-4 top-4 text-fgColor_neutral text-sm border border-borderColor_muted rounded-md w-16 text-center">{convertExerciseTypeIntoLabel(exercise.type)}</p>
                        <div className="flex flex-col w-full h-4/5 px-4 relative">
                            <h1 className="text-xl font-medium w-full">Aufgabe {exerciseIndex + 1}</h1>
                            {/*TODO INFER THE QUESTION STYLE FROM TYPE*/}
                            <p className="mt-2 font-semibold">{exercise.question}</p>
                            <UserInputExercise onChange={handleInputChange}/>
                            {showAnswer &&
                                <SolutionExercise className="absolute bottom-4 w-11/12" userInput={inputValue}/>
                            }
                        </div>
                        <div
                            className="w-full border-t border-borderColor_default h-1/5 flex items-center justify-center">
                            <div className="w-11/12 flex justify-end">
                                <button
                                    className="w-28 bg-bgColor_accent_emphasis text-fgColor_white h-10 rounded-md flex justify-center items-center"
                                    onClick={() => setShowAnswer((prev) => !prev)}
                                >
                                    Antwort
                                </button>
                            </div>
                        </div>
                    </div>

                </section>
            </ExerciseProvider>

            <div
                className={`absolute bottom-0 left-0 bg-bgColor_accent_emphasis h-2 rounded-b-lg`}
                style={{width: `${progress}%`}}
            ></div>
        </section>
    );
};
