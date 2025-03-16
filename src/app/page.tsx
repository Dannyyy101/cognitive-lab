import {getAllSubjects} from "@/actions/subjectActions";
import {Loading} from "@/components/Loading";
import {SubjectDTO} from "@/types/dtos/subjectDTO";
import Link from "next/link";
import React, {ReactNode} from "react";
import bookIcon from "../media/book.svg"
import Image from "next/image";
import {ProgressBar} from "@/components/ui/ProgressBar";

export default async function Page(): Promise<ReactNode> {
    const subjects = await getAllSubjects();

    if (!subjects) {
        return <Loading/>;
    }
    return (
        <main className="w-screen h-screen flex items-center justify-center">
            <section className="flex items-center justify-center flex-wrap">
                {subjects.map((s) =>
                    <SubjectView subject={s} key={s.id}/>
                )}
            </section>
        </main>
    );
}

interface SubjectDisplayProps {
    subject: SubjectDTO;
}

const SubjectView: React.FC<SubjectDisplayProps> = ({subject}) => {
    const completed = 50
    return (
        <Link href={`/subjects/${subject.id}`}
              className="w-96 h-56 rounded-md m-2 border-borderColor_default border">
            <div className="w-full flex  px-4 pb-4 pt-6 flex-col rounded-t-md" style={{backgroundColor: subject.bgColor}}>
                <div className="flex">
                    <div style={{backgroundColor: subject.color}} className="rounded-full p-2 h-9 w-9">
                        <Image src={bookIcon} alt={"book-icon"} width={20} height={20} className="filter invert"/>
                    </div>
                    <h1 className="text-fgColor_default text-2xl font-semibold pl-2">{subject.name}</h1>
                </div>

            </div>
            <div className="w-full mt-4 px-4">
                <div className="w-full flex">
                    <p className="text-sm w-1/2">{subject.exercises.length} Aufgaben</p>
                    <p className="text-sm w-1/2 text-right">{subject.children.length} Unter-Themen</p>
                </div>
                <ProgressBar progress={completed} color={subject.color}/>
                <p className="w-full text-right text-sm text-fgColor_disabled mt-1">45% erledigt</p>
                <button className="mt-4 w-32 h-10 rounded-md bg-bgColor_inverse text-fgColor_onEmphasis font-semibold">Lernen</button>
            </div>
        </Link>
    );
};
