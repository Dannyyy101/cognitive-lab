"use client";
import {CreateExercise} from "@/components/exercises/CreateExercise";
import {Exercise} from "@/components/exercises/Exercise";
import {PopUpView} from "@/components/PopUpView";
import {useSubject} from "@/context/SubjectProvider";
import {CombinedExerciseDTO} from "@/types/dtos/exerciseDTO";
import {ExerciseBase} from "@/types/models/exercise";
import {LearnExercise} from "@/components/exercises/LearnExercise";

import {useRef, useState} from "react";
import Link from "next/link";

import folderIcon from "../../../media/file-directory.svg"
import triangleIcon from "../../../media/triangle-down.svg"
import Image from "next/image";
import {useClickedOutside} from "@/hooks/useClickedOutside";
import {SubjectDTO} from "@/types/dtos/subjectDTO";
import {CreateSubject} from "@/components/CreateSubject";

export default function Page() {
    const {subject} = useSubject();
    const [selectedExercise, setSelectedExercise] = useState<ExerciseBase | null>(null);
    const [createNewExercise, setCreateNewExercise] = useState<ExerciseBase | null>();
    const [createNewSubject, setCreateNewSubject] = useState<SubjectDTO | null>();
    const [learnExercise, setLearnExercise] = useState<ExerciseBase | null>();
    const popupRef = useRef<HTMLDivElement>(null);

    const [createPopUpVisible, setCreatePopUpVisible] = useClickedOutside<HTMLDivElement>(popupRef)

    const handleNextExercise = () => {
        const temp = [...subject.exercises];
        if (learnExercise) {
            let index = temp.findIndex((e) => e.id === learnExercise.id);
            if (index !== -1 && ++index < temp.length) {
                setLearnExercise({...temp[index]});
            }
        }
    };

    const handlePreviousExercise = () => {
        const temp = [...subject.exercises];
        if (learnExercise) {
            let index = temp.findIndex((e) => e.id === learnExercise.id);
            if (index !== -1 && --index >= 0) {
                setLearnExercise(temp[index]);
            }
        }
    };


    return (
        <main className="w-screen h-screen flex justify-center items-center">
            <section className="w-2/3 font-bold relative">
                <div className="w-32 h-8 rounded-md absolute right-28 -top-6">
                    <button
                        onClick={() =>
                            setCreatePopUpVisible((prevState) => !prevState)
                        }
                        className="justify-center flex items-center font-semibold border border-borderColor_translucent bg-bgColor_inset text-fgColor-default w-32 h-8 rounded-md"
                    >
                        Hinzufügen<Image src={triangleIcon} alt={"triangleIcon"}/>
                    </button>
                    {createPopUpVisible &&
                        <div ref={popupRef}
                             className="rounded-md w-40 items-start absolute flex flex-col -bottom-14 bg-bgColor_default z-50 border border-borderColor_translucent shadow-shadow_floating_small">
                            <button onClick={() => setCreateNewSubject({
                                id: "",
                                parent: subject,
                                name: "",
                                children: [],
                                createdOn: new Date(),
                                color: "",
                                exercises: [],
                                lastEdited: new Date()
                            })}
                                    className="pl-2 text-left font-normal w-full rounded-md hover:bg-bgColor_muted pt-1">Ordner
                            </button>
                            <button className="pl-2 text-left font-normal w-full rounded-md hover:bg-bgColor_muted"
                                    onClick={() =>
                                        setCreateNewExercise({id: "", question: "", type: ""})
                                    }>Übung
                            </button>
                        </div>
                    }
                </div>

                <button
                    onClick={() => setLearnExercise(subject.exercises[0])}
                    className="border border-bgColor_open_emphasis bg-bgColor_open_emphasis text-fgColor_white w-24 h-8 rounded-md absolute right-0 -top-6"
                >
                    Lernen
                </button>
                <h1 className="text-2xl text-fgColor_default">{subject.name}</h1>
                <hr/>
                <table className="w-full border-collapse">
                    <tbody className="">
                    {subject.children.map((child, index) => (
                        <tr key={index} className="border border-fgColor_default">
                            <td className="text-fgColor_default h-8 pl-1 flex items-center">
                                <Image className="mr-1" src={folderIcon} alt={"folder-icon"}/>
                                <Link href={`./${child.id}`} className="w-full text-left">
                                    {child.name}
                                </Link>
                            </td>
                        </tr>
                    ))}
                    {subject.exercises.map((exercise, index) => (
                        <tr key={index} className="border border-fgColor_default">
                            <td className="text-fgColor_default h-8 pl-1">
                                <button
                                    className="w-full text-left"
                                    onClick={() => {
                                        setSelectedExercise(exercise);
                                    }}
                                >
                                    {exercise.question}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
            {selectedExercise !== null && (
                <PopUpView handlePopUpClose={() => setSelectedExercise(null)}>
                    <Exercise
                        subjectId={subject.id}
                        exercise={selectedExercise as CombinedExerciseDTO}
                    ></Exercise>
                </PopUpView>
            )}
            {createNewExercise && (
                <PopUpView handlePopUpClose={() => setCreateNewExercise(null)}>
                    <CreateExercise subjectId={subject.id}/>
                </PopUpView>
            )}
            {createNewSubject && (
                <PopUpView handlePopUpClose={() => setCreateNewSubject(null)}>
                    <CreateSubject/>
                </PopUpView>
            )}
            {learnExercise && (
                <PopUpView handlePopUpClose={() => setLearnExercise(null)}>
                    <LearnExercise
                        key={learnExercise.id}
                        nextExercise={handleNextExercise}
                        previousExercise={handlePreviousExercise}
                        subjectId={subject.id}
                        exercise={learnExercise as CombinedExerciseDTO}
                    />
                </PopUpView>
            )}
        </main>
    );
}
