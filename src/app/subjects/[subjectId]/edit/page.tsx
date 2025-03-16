"use client";

import React from "react";
import {useSubject} from "@/context/SubjectProvider";
import Image from "next/image";
import bookIcon from "@/media/book.svg";
import {SubjectDTO} from "@/types/dtos/subjectDTO";
import plusIcon from "../../../../media/plus.svg"
import {updateSubjectById} from "@/actions/subjectActions";
import Link from "next/link";

export default function Page() {
    const {subject, setSubject} = useSubject()

    const handleUpdateSubject = async () =>{
        await updateSubjectById(subject.id, subject)
    }

    return (
        <main className="flex h-screen items-center mt-32 flex-col">
            <div className="w-full flex  px-4 pb-4 pt-6 flex-col rounded-t-md">
                <div className="flex items-center relative">
                    <div style={{backgroundColor: subject.color}} className="rounded-full p-2 h-12 w-12">
                        <Image src={bookIcon} alt={"book-icon"} width={32} height={32} className="filter invert"/>
                    </div>
                    <input onChange={(e) => setSubject({...subject, name: e.target.value})} value={subject.name} className="border-borderColor_default border text-fgColor_default text-4xl font-bold pl-2"/>
                    <button onClick={handleUpdateSubject}
                        className="absolute right-4 w-32 h-10 rounded-md bg-bgColor_inverse text-fgColor_onEmphasis font-semibold">Speichern
                    </button>
                </div>
            </div>

            <hr className="w-full px-2"/>
            <section className="w-10/12 flex justify-start flex-wrap mt-4">
                {subject.children.map((child) => <DisplaySubjects subject={child} key={child.id}/>)}
                <Link href={`/subjects/create?redirectUrl${window.location.href}&subjectId=${subject.id}`} className="m-2 p-4 rounded-md border-borderColor_default border w-80 h-40 flex justify-center items-center"><Image src={plusIcon} alt={"plus-icon"}/></Link>
            </section>
        </main>
    );
}

const DisplaySubjects = ({subject}: { subject: SubjectDTO }) => {
    return (
        <section className="p-4 rounded-md border-borderColor_default border w-80 h-40 relative m-2">
            <h1 className="text-black text-fgColor_default text-xl font-semibold">
                {subject.name}
            </h1>
            <p className="text-sm text-fgColor_disabled">{subject.exercises.length} Aufgaben</p>
            <button
                className="absolute bottom-4 right-4 w-32 h-10 rounded-md bg-bgColor_inverse text-fgColor_onEmphasis font-semibold">Bearbeiten
            </button>
        </section>
    )
}
