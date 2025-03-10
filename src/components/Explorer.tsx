import {useSubject} from "@/context/SubjectProvider";
import {useState} from "react";
import {SubjectDTO} from "@/types/dtos/subjectDTO";
import Image from "next/image";
import folderIcon from "../media/file-directory.svg"
import Link from "next/link";
import hamburgerIcon from "../media/three-bars.svg"

export const Explorer = () => {
    const subject = useSubject()
    const [visible, setVisible] = useState<boolean>(false)
    return (
        <>
            <button onClick={() => setVisible((prevState) => !prevState)} className={`z-[60] absolute top-4 ${visible ? "left-40" : "left-4"}`}>
                <Image src={hamburgerIcon} alt={"hamburger-icon"}/></button>
            <section
                className={`z-50 bg-bgColor_muted h-screen w-52 ${visible ? "absolute" : "hidden"} justify-center top-0 left-0`}>
                <div className="mt-8 flex flex-col w-full">
                    <h1 className="text-xl font-bold pl-2">Subjects</h1>
                    {subject.subject.children.map((child) => <Link href={`/subjects/${child.id}`} className="flex"
                                                                   key={child.id}><Image className="mr-1"
                                                                                         src={folderIcon}
                                                                                         alt={"folder-icon"}/><Folder
                        subject={child}/></Link>)}
                </div>
            </section>
        </>
    )
}

const Folder = ({subject}: { subject: SubjectDTO }) => {
    const [showChildren, setShowChildren] = useState<boolean>(false);
    return (
        <div className="mt-1">
            <button onClick={() => setShowChildren((prevState) => !prevState)}>
                {subject.name}
            </button>
            {showChildren &&
                <div>
                    {subject.children.map((child) => <Folder key={child.id} subject={child}/>)}
                    {subject.exercises.map((exercise) => <div key={exercise.id}>{exercise.question}</div>)}
                </div>
            }
        </div>
    )
}