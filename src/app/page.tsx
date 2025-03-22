"use client";
import {getAllSubjects} from "@/actions/subjectActions";
import {Loading} from "@/components/Loading";
import {SubjectDTO} from "@/types/dtos/subjectDTO";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import bookIcon from "../media/book.svg";
import Image from "next/image";
import {ProgressBar} from "@/components/ui/ProgressBar";
import {getRatingForParent} from "@/utils/userExerciseRating";
import {useTheme} from "@/components/Theme";
import {PopUpView} from "@/components/PopUpView";
import {CreateSubjectView} from "@/components/subjects/CreateSubjectView";
import {IsUserAdmin} from "@/components/auth/IsUserAdmin";

export default function Page() {
    const [subjects, setSubject] = useState<SubjectDTO[]>([]);
    const [showCrateSubjectView, setShowCreateSubjectView] = useState<boolean>(false);
    useEffect(() => {
        getAllSubjects().then((e) => setSubject(JSON.parse(e)));
    }, []);

    if (!subjects) {
        return <Loading/>;
    }

    const handleAddSubject = (subject: SubjectDTO) => {
        setSubject([...subjects, subject])
    }

    return (
        <main className="w-screen h-screen flex items-center justify-center bg-bgColor_default">
            <IsUserAdmin>
                <button onClick={() => setShowCreateSubjectView(true)}
                        className="w-32 h-10 top-32 right-10 bg-bgColor_inverse absolute rounded-md text-bgColor_default">Erstellen
                </button>
            </IsUserAdmin>
            <section className="flex mt-48 md:items-center justify-center flex-wrap md:mt-0 relative">
                {subjects.map((s) => (
                    <SubjectView subject={s} key={s.id}/>
                ))}
            </section>
            {showCrateSubjectView &&
                <PopUpView handlePopUpClose={() => setShowCreateSubjectView(false)}><CreateSubjectView
                    handleAddSubject={handleAddSubject}/></PopUpView>}
        </main>
    );
}

interface SubjectDisplayProps {
    subject: SubjectDTO;
}

const SubjectView: React.FC<SubjectDisplayProps> = ({subject}) => {
    const numberOfExercises = subject.children.reduce((sum, e) => sum + e.exercises.length, 0)
    const rating = getRatingForParent(subject.id, numberOfExercises)
    const {theme} = useTheme()
    console.log(theme)

    return (
        <Link
            href={`/subjects/${subject.id}`}
            className="w-96 h-56 rounded-md m-2 border-borderColor_default border"
        >
            <div
                className="w-full flex  px-4 pb-4 pt-6 flex-col rounded-t-md"
                style={{backgroundColor: `${theme === "dark" ? subject.color : subject.bgColor}`}}
            >
                <div className="flex">
                    <div
                        style={{backgroundColor: subject.color}}
                        className="rounded-full p-2 h-9 w-9"
                    >
                        <Image
                            src={bookIcon}
                            alt={"book-icon"}
                            width={20}
                            height={20}
                            className="filter invert"
                        />
                    </div>
                    <h1 className="text-fgColor_default text-2xl font-semibold pl-2 ">
                        {subject.name}
                    </h1>
                </div>
            </div>
            <div className="w-full mt-4 px-4">
                <div className="w-full flex">
                    <p className="text-sm w-1/2 text-fgColor_default">{numberOfExercises} Aufgaben</p>
                    <p className="text-sm w-1/2 text-right text-fgColor_default">
                        {subject.children.length} Unter-Themen
                    </p>
                </div>
                <ProgressBar
                    progress={rating}
                    color={subject.color}
                />
                <p className="w-full text-right text-sm text-fgColor_disabled mt-1">
                    {rating}% erledigt
                </p>
                <button className="mt-4 w-32 h-10 rounded-md bg-bgColor_inverse text-bgColor_default font-semibold">
                    Lernen
                </button>
            </div>
        </Link>
    );
};
