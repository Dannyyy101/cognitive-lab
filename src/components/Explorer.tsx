import {useSubject} from "@/context/SubjectProvider";
import {useState} from "react";
import {SubjectDTO} from "@/types/dtos/subjectDTO";
import Image from "next/image";
import folderIcon from "../media/file-directory.svg"
import Link from "next/link";

export const Explorer = () => {
    const subject = useSubject()
    return (
        <section className="bg-bgColor_muted h-screen w-64 flex justify-center">
            <div className="mt-8 h-full flex flex-col w-48 mb-2">
            <h1 className="text-xl font-bold">Subjects</h1>
                {subject.subject.children.map((child) => <Link href={`/subjects/${child.id}`} className="flex" key={child.id}><Image className="mr-1" src={folderIcon} alt={"folder-icon"}/><Folder subject={child}/></Link>)}
            </div>
        </section>
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