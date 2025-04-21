'use client';

import React, { useState } from 'react';
import { useSubject } from '@/context/SubjectProvider';
import Image from 'next/image';
import bookIcon from '@/media/book.svg';
import { SubjectDTO } from '@/types/dtos/subjectDTO';
import plusIcon from '../../../../media/plus.svg';
import { updateSubjectById, deleteSubjectById } from '@/actions/subjectActions';
import Link from 'next/link';
import trashIcon from '../../../../media/trash.svg';
import { useRouter } from 'next/navigation';
import { ImageIcon } from '@/components/ui/image/ImageIcon';
import { PopUpView } from '@/components/PopUpView';
import { DeleteView } from '@/components/DeleteView';
import { IsUserAdmin } from '@/components/auth/IsUserAdmin';

export default function Page() {
    const [showDeletePopUp, setShowDeletePopUp] = useState<boolean>(false);
    const { subject, setSubject } = useSubject();
    const router = useRouter();

    const handleUpdateSubject = async () => {
        await updateSubjectById(subject.id, subject);
        router.back();
    };

    const handleDeleteSubject = async () => {
        await deleteSubjectById(subject.id);
        router.push('/');
    };

    return (
        <main className="flex h-screen items-center mt-32 flex-col relative">
            <IsUserAdmin>
                <div className="w-full flex px-4 pb-4 pt-6 flex-col rounded-t-md">
                    <div className="flex items-center">
                        <div style={{ backgroundColor: subject.color }} className="rounded-full p-2 h-12 w-12">
                            <Image src={bookIcon} alt={'book-icon'} width={32} height={32} className="filter invert" />
                        </div>
                        <input
                            onChange={(e) => setSubject({ ...subject, name: e.target.value })}
                            value={subject.name}
                            className="border-borderColor_default border text-fgColor_default text-4xl font-bold pl-2 bg-transparent"
                        />
                        <button
                            onClick={() => setShowDeletePopUp(true)}
                            className="absolute right-40 w-32 h-10 rounded-md bg-bgColor_danger_muted text-fgColor_danger font-semibold -top-6 md:top-0"
                        >
                            Löschen
                        </button>
                        <button
                            onClick={handleUpdateSubject}
                            className="absolute right-4 w-32 h-10 rounded-md bg-bgColor_inverse text-bgColor_default font-semibold -top-6 md:top-0"
                        >
                            Speichern
                        </button>
                    </div>
                </div>

                <hr className="w-full px-2" />
                <section className="w-10/12 flex justify-start flex-wrap mt-4">
                    {subject.children.map((child) => (
                        <DisplaySubjects subject={child} key={child.id} />
                    ))}
                    <Link
                        href={`/subjects/create?redirectUrl${window.location.href}&parentId=${subject.id}`}
                        className="m-2 p-4 rounded-md border-borderColor_default border w-80 h-40 flex justify-center items-center"
                    >
                        <ImageIcon src={plusIcon} alt="plus-icon" />
                    </Link>
                </section>
                {showDeletePopUp && (
                    <PopUpView handlePopUpClose={() => setShowDeletePopUp(false)}>
                        <DeleteView handleDelete={handleDeleteSubject} correctAnswer={subject.name}></DeleteView>
                    </PopUpView>
                )}
            </IsUserAdmin>
        </main>
    );
}

const DisplaySubjects = ({ subject }: { subject: SubjectDTO }) => {
    const [showDeletePopUp, setShowDeletePopUp] = useState<boolean>(false);
    const { subject: parent, setSubject } = useSubject();

    const handleDeleteSubject = async () => {
        await deleteSubjectById(subject.id);

        const children = [...parent.children];
        const index = children.findIndex((e) => e.id === subject.id);

        if (index !== -1) {
            children.splice(index, 1);
            setSubject({ ...subject, children: children });
        }
    };

    return (
        <div className="p-4 rounded-md border-borderColor_default border w-80 h-40 relative m-2">
            {showDeletePopUp && (
                <PopUpView handlePopUpClose={() => setShowDeletePopUp(false)}>
                    <DeleteView handleDelete={handleDeleteSubject} correctAnswer={subject.name}></DeleteView>
                </PopUpView>
            )}

            <button
                onClick={(event) => {
                    event.stopPropagation();
                    setShowDeletePopUp(true);
                }}
                className="absolute top-4 right-4"
            >
                <ImageIcon src={trashIcon} alt="trash-icon" />
            </button>
            <Link href={`/subjects/${parent.id}/children/${subject.id}/edit`} className="w-full h-full">
                <h1 className="text-black text-fgColor_default text-xl font-semibold">{subject.name}</h1>
                <p className="text-sm text-fgColor_disabled">{subject.exercises.length} Aufgaben</p>
                <button className="text-bgColor_default absolute bottom-4 right-4 w-32 h-10 rounded-md bg-bgColor_inverse font-semibold">
                    Bearbeiten
                </button>
            </Link>
        </div>
    );
};
