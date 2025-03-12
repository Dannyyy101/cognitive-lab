import {ExerciseProvider} from "@/context/ExerciseProvider";
import {SubmitButton} from "./SubmitButton";
import {Textarea} from "./Textarea";
import {UploadFile} from "@/components/exercises/UploadFile";
import React from "react";
import {TypeSwitch} from "@/components/exercises/TypeSwitch";
import {Card, CardBottom, CardContent} from "@/components/exercises/learn/LearnExercise";
import {usePopUpClose} from "@/context/PopUpContext";
import xIcon from "../../media/x.svg"
import Image from "next/image";
import {TextInput} from "@/components/exercises/TextInput";

interface CreateExerciseProps {
    subjectId?: string;
}

export const CreateExercise: React.FC<CreateExerciseProps> = ({
                                                                  subjectId,
                                                              }) => {
    const handlePopUpClose = usePopUpClose()
    return (
        <section
            className="flex flex-col justify-center items-center h-screen md:h-[40rem] w-screen md:w-[40rem] relative lg:w-[60rem]">
            <button
                className="absolute right-8 top-8"
                onClick={() => handlePopUpClose()}>
                <Image src={xIcon} alt={"x-icon"}/>
            </button>
            <ExerciseProvider>
                <section className="w-3/4 flex flex-col items-center mt-12 h-full">
                    <h1 className="pl-4 text-3xl font-bold w-full">Erstelle eine neue Übung</h1>
                    <Card>
                        <TypeSwitch/>
                        <div className="mt-8"></div>
                        <CardContent>
                            <Textarea index="question"/>
                            <UploadFile type={"question"}/>
                            <Textarea index="answer"/>
                            <UploadFile type={"answer"}/>
                        </CardContent>
                        <CardBottom>
                            <div className="w-11/12 flex">
                                <div className="w-1/3">
                                    <div
                                        className="flex items-center w-40 justify-center rounded-md h-10">
                                        <TextInput placeholder="Link zur Doku" value={"documentationUrl"}/>
                                    </div>
                                </div>
                                <div className="w-2/3 flex justify-end">
                                    <SubmitButton edit={false} subjectId={subjectId}>
                                        Speichern
                                    </SubmitButton>
                                </div>
                            </div>
                        </CardBottom>
                    </Card>
                </section>
            </ExerciseProvider>
        </section>
    )
        ;
};
