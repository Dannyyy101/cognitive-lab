import {ExerciseProvider} from "@/context/ExerciseProvider";
import {SubmitButton} from "./SubmitButton";
import {Textarea} from "./Textarea";
import {UploadFile} from "@/components/exercises/UploadFile";
import React from "react";
import {TypeSwitch} from "@/components/exercises/TypeSwitch";
import {Card, CardBottom, CardContent} from "@/components/exercises/learn/LearnExercise";

interface CreateExerciseProps {
    subjectId?: string;
}

export const CreateExercise: React.FC<CreateExerciseProps> = ({
                                                                  subjectId,
                                                              }) => {

    return (
        <section
            className="flex flex-col justify-center items-center h-screen md:h-[40rem] w-screen md:w-[40rem] relative lg:w-[60rem]">
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
                            <div className="w-11/12 flex justify-end">
                                <SubmitButton edit={false} subjectId={subjectId}>
                                    Speichern
                                </SubmitButton>
                            </div>
                        </CardBottom>
                    </Card>
                </section>
            </ExerciseProvider>
        </section>
    )
        ;
};
