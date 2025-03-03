import {ExerciseProvider} from "@/context/ExerciseProvider";
import {SubmitButton} from "./SubmitButton";
import {Textarea} from "./Textarea";
import {UploadFile} from "@/components/exercises/UploadFile";
import React from "react";
import {TypeSwitch} from "@/components/exercises/TypeSwitch";

interface CreateExerciseProps {
    subjectId?: string;
}

export const CreateExercise: React.FC<CreateExerciseProps> = ({
                                                                  subjectId,
                                                              }) => {


    return (
        <section className="flex flex-col items-center h-[40rem] relative w-[60rem]">
            <ExerciseProvider>
                <h1 className="text-3xl font-bold mt-8">Create new exercise</h1>
                <section className="w-2/3 flex flex-col items-center mt-8">
                    <TypeSwitch/>
                    <Textarea index="question"/>
                    <UploadFile type={"question"}/>
                    <Textarea index="answer"/>
                    <UploadFile type={"answer"}/>
                    <SubmitButton edit={false} subjectId={subjectId}>
                        Speichern
                    </SubmitButton>
                </section>
            </ExerciseProvider>
        </section>
    );
};
