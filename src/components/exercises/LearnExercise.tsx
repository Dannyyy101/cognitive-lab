import {ExerciseProvider} from "@/context/ExerciseProvider";
import {Textarea} from "./Textarea";
import {CombinedExerciseDTO} from "@/types/dtos/exerciseDTO";
import Image from "next/image";
import {useEffect, useState} from "react";

import leftArrow from "../../media/chevron-left.svg";
import rightArrow from "../../media/chevron-right.svg";
import {useSubject} from "@/context/SubjectProvider";
import {usePopUpClose} from "@/context/PopUpContext";
import {formatTimeFromSeconds} from "@/utils/time";

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
    const [timer, setTimer] = useState<number>(0);

    const handlePopUpClose = usePopUpClose()
    const {subject} = useSubject();

    useEffect(() => {
        const index = subject.exercises.findIndex((e) => e.id === exercise.id);
        setProgress(((index + 1) * 100) / subject.exercises.length);
    }, [exercise]);

    useEffect(() => {
        handleTimer()
    }, []);

    const handleTimer = () => {
        setTimeout(() => {
            setTimer((prevState) => prevState + 1)
            handleTimer()
        }, 1000)
    }

    return (
        <section className="flex flex-col items-center h-[40rem] relative w-[60rem]">
            <p className="absolute right-8 top-8 w-32 text-fgColor_default h-10 rounded-md flex justify-center items-center"
                onClick={() => setShowAnswer((prev) => !prev)}
            >
                {formatTimeFromSeconds(timer)}
            </p>
            <button onClick={previousExercise} className="absolute top-1/2 left-4">
                <Image src={leftArrow} alt="left-arrow"/>
            </button>
            <button onClick={nextExercise} className="absolute top-1/2 right-4">
                <Image src={rightArrow} alt="right-arrow"/>
            </button>
            <ExerciseProvider oldExercise={exercise}>
                <h1 className="text-3xl font-bold mt-8"></h1>
                <section className="w-2/3 flex flex-col items-center mt-8 h-full">
                    <div className="w-full h-1/2 flex flex-col">
                        <h1 className="text-2xl w-full">Frage</h1>
                        <Textarea index="question" edit={false}/>
                    </div>
                    {showAnswer && (
                        <div className="w-full h-1/2 flex flex-col">
                            <h1 className="text-2xl w-full">Antwort</h1>
                            <Textarea index="answer" edit={false}/>
                        </div>
                    )}
                    <button
                        className="absolute right-8 bottom-8 w-32 bg-bgColor_accent_emphasis text-fgColor_white h-10 rounded-md flex justify-center items-center"
                        onClick={() => setShowAnswer((prev) => !prev)}
                    >
                        Show answer
                    </button>
                    <button
                        className="absolute left-8 bottom-8 w-32 bg-bgColor_danger_emphasis text-fgColor_white h-10 rounded-md flex justify-center items-center"
                        onClick={() => handlePopUpClose()}
                    >
                        Beenden
                    </button>
                </section>
            </ExerciseProvider>

            <div
                className={`absolute bottom-0 left-0 bg-bgColor_accent_emphasis h-2 rounded-b-lg`}
                style={{width: `${progress}%`}}
            ></div>
        </section>
    );
};
