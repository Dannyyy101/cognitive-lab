'use client'
import Image from "next/image";

import quote from "../../../media/quote.svg"
import fileMedia from "../../../media/file-media.svg"
import {useExercise} from "@/context/ExerciseProvider";
import xIcon from "@/media/x.svg";
import React from "react";
import {usePopUpClose} from "@/context/PopUpContext";

export const ExerciseComponentView = ({element}: { element: "question" | "answer" }) => {
    const types = ["text", "image"]

    const {exercise, setExercise} = useExercise()
    const handlePopUpClose = usePopUpClose()

    const handleAddComponentToExercise = (type: string) => {

        const temp = element === "question" ? exercise.question : exercise.answer

        switch (type) {
            case "text":
                temp.push({type: "text", content: ""})
                setExercise({...exercise, [element]: temp})
                break
            case "image":
                temp.push({type: "image", imageUrl: ""})
                setExercise({...exercise, [element]: temp})
        }

        handlePopUpClose()
    }

    return <section className="w-[800px] h-[700px] p-6 rounded-md border border-borderColor_default relative">
        <button
            className="absolute right-8 top-8"
            onClick={() => handlePopUpClose()}>
            <Image src={xIcon} alt={"x-icon"}/>
        </button>
        <h1 className="text-xl font-semibold">Wähle den Aufgaben Typ</h1>
        <p className="text-fgColor_muted text-sm">Wähle einen Aufgabentyp um ihn der Aufgabe hinzuzufügen</p>
        <div className="flex mt-8 flex-wrap overflow-y-auto">
            {types.map((type) =>
                <ExercisesComponentSelectionView
                    key={type} type={type}
                    addComponentToExercise={handleAddComponentToExercise}/>
            )}

        </div>
    </section>
}

interface ExercisesComponentSelectionViewProps {
    type: string
    addComponentToExercise: (type: string) => void
}

const ExercisesComponentSelectionView = ({type, addComponentToExercise}: ExercisesComponentSelectionViewProps) => {
    switch (type) {
        case "text":
            return <button onClick={() => addComponentToExercise("text")}
                           className="m-2 p-4 w-56 h-44 border-borderColor_default border rounded-md flex flex-col">
                <div className="flex">
                    <Image src={quote} alt={"quote-icon"} width={18} height={18}/><h1 className="ml-2 text-xl">Text</h1>
                </div>
                <p className="p-2 bg-bgColor_disabled rounded-md mt-2 h-36">Füge eine Text Frage ein. Diese kann auch in
                    Markdown Format verfasst sein.</p>
            </button>
        case "image":
            return <button onClick={() => addComponentToExercise("image")}
                           className="m-2 p-4 w-56 h-44 border-borderColor_default border rounded-md flex flex-col">
                <div className="flex">
                    <Image src={fileMedia} alt={"file-media-icon"} width={18} height={18}/><h1
                    className="ml-2 text-xl">Bild</h1>
                </div>
                <div
                    className="p-2 bg-bgColor_disabled rounded-md mt-2 flex flex-col justify-center items-center h-36 w-full">
                    <Image src={fileMedia} alt={"file-media-icon"} width={40} height={40}/>
                    <p className="text-sm">Bild mit Beschreibung</p>
                </div>
            </button>
    }
}