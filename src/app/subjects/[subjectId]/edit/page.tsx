'use client'

import React, { useState } from 'react'
import { useSubject } from '@/context/SubjectProvider'
import Image from 'next/image'
import bookIcon from '@/media/book.svg'
import plusIcon from '../../../../media/plus.svg'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ImageIcon } from '@/components/ui/ImageIcon'
import { PopUpView } from '@/components/PopUpView'
import { IsUserAdmin } from '@/components/auth/IsUserAdmin'
import { Subject } from '@/types/models/subject'
import { DeleteModal } from '@/components/ui/DeleteModal'
import { CreateSubjectView } from '@/components/subjects/CreateSubjectView'
import { Button } from '@/components/ui/button/Button'
import { CheckIconGreen, XIconRed } from '@/components/ui/Icons'

export default function Page() {
    const [showDeletePopUp, setShowDeletePopUp] = useState<boolean>(false)
    const [showCrateSubjectView, setShowCreateSubjectView] = useState<boolean>(false)
    const { subject, setSubject } = useSubject()
    const [subjectName, setSubjectName] = useState<string>(subject.name)
    const router = useRouter()

    const handleDeleteSubject = async () => {
        await fetch(`/api/subjects/${subject.id}`, { method: 'DELETE' })
        router.push('/')
    }

    const handleNavigateBack = () => {
        router.back()
    }

    const handleAddSubject = (newSubject: Subject) => {
        setSubject({ ...subject, children: [...subject.children, newSubject] })
    }

    const handleUpdateSubjectName = async () => {
        const newSubject = { ...subject, name: subjectName }
        const response = await fetch(`/api/subjects/${subject.id}`, {
            body: JSON.stringify(newSubject),
            method: 'PUT',
        })

        if (response.ok) setSubject(newSubject)
    }

    const handleResetSubjectName = () => {
        setSubjectName(subject.name)
    }

    return (
        <main className="flex h-screen items-center mt-32 flex-col relative">
            <IsUserAdmin>
                <div className="w-full flex px-4 pb-4 pt-6 flex-col rounded-t-md">
                    <div className="flex items-center">
                        <div style={{ backgroundColor: subject.primaryColor }} className="rounded-full p-2 h-12 w-12">
                            <Image src={bookIcon} alt={'book-icon'} width={32} height={32} className="filter invert" />
                        </div>
                        <input
                            onChange={(e) => setSubjectName(e.target.value)}
                            value={subjectName}
                            className="ml-1 max-w-96 border-borderColor_default border text-fgColor_default text-4xl font-bold pl-1 bg-transparent"
                        />
                        {subjectName !== subject.name && (
                            <>
                                <button className="ml-2" onClick={handleResetSubjectName}>
                                    <XIconRed />
                                </button>
                                <button onClick={handleUpdateSubjectName}>
                                    <CheckIconGreen />
                                </button>
                            </>
                        )}
                        <Button
                            variant="danger"
                            onClick={() => setShowDeletePopUp(true)}
                            disabled={subject.children.length > 0}
                            className={`absolute right-40 w-32 h-10 rounded-md -top-6 md:top-0`}
                        >
                            Löschen
                        </Button>
                        <button
                            onClick={handleNavigateBack}
                            className="absolute right-4 w-32 h-10 rounded-md bg-bgColor_inverse text-bgColor_default font-semibold -top-6 md:top-0"
                        >
                            Zurück
                        </button>
                    </div>
                </div>

                <hr className="w-full px-2" />
                <section className="w-10/12 flex justify-start flex-wrap mt-4">
                    {subject.children.map((child) => (
                        <DisplaySubjects subject={child} key={child.id} />
                    ))}
                    <button
                        onClick={() => setShowCreateSubjectView((prev) => !prev)}
                        className="m-2 p-4 rounded-md border-borderColor_default border w-80 h-40 flex justify-center items-center"
                    >
                        <ImageIcon src={plusIcon} alt="plus-icon" />
                    </button>
                </section>
                {showCrateSubjectView && (
                    <PopUpView handlePopUpClose={() => setShowCreateSubjectView(false)}>
                        <CreateSubjectView
                            defaultColor={{
                                primaryColor: subject.primaryColor,
                                secondaryColor: subject.secondaryColor,
                            }}
                            selectColor={false}
                            parentId={subject.id}
                            handleAddSubject={handleAddSubject}
                        />
                    </PopUpView>
                )}
                {showDeletePopUp && (
                    <PopUpView handlePopUpClose={() => setShowDeletePopUp(false)}>
                        <DeleteModal
                            name={subject.name}
                            type={'Subject'}
                            deleteItem={handleDeleteSubject}
                            close={() => setShowDeletePopUp(false)}
                        ></DeleteModal>
                    </PopUpView>
                )}
            </IsUserAdmin>
        </main>
    )
}

const DisplaySubjects = ({ subject }: { subject: Subject }) => {
    const { subject: parent } = useSubject()

    return (
        <div className="p-4 rounded-md border-borderColor_default border w-80 h-40 relative m-2">
            <Link href={`/subjects/${parent.id}/children/${subject.id}/edit`} className="w-full h-full">
                <h1 className="text-black text-fgColor_default text-xl font-semibold">{subject.name}</h1>
                <p className="text-sm text-fgColor_disabled">{subject.exercises.length} Aufgaben</p>
                <button className="text-bgColor_default absolute bottom-4 right-4 w-32 h-10 rounded-md bg-bgColor_inverse font-semibold">
                    Bearbeiten
                </button>
            </Link>
        </div>
    )
}
