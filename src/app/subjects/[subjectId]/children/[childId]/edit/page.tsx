'use client'

import React, { useState } from 'react'
import { useSubject } from '@/context/SubjectProvider'
import Image from 'next/image'
import bookIcon from '@/media/book.svg'
import { IsUserAdmin } from '@/components/auth/IsUserAdmin'
import { Exercise } from '@/types/models/exercise'
import { CheckIconGreen, TrashIcon, XIconRed } from '@/components/ui/Icons'
import { DEFAULT_EXERCISE, TYPES } from '@/utils/constants'
import { PopUpView } from '@/components/PopUpView'
import { ExerciseCard } from '@/components/exercises/ExerciseCard'
import { DeleteModal } from '@/components/ui/DeleteModal'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button/Button'
import { useRefreshStore } from '@/hooks/useRefreshStore'

export default function Page() {
    const { subject, setSubject } = useSubject()
    const [showTypeFields, setShowTypeFields] = useState<boolean>(false)
    const [newExercise, setNewExercise] = useState<Exercise | null>(null)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [subjectName, setSubjectName] = useState<string>(subject.name)

    const router = useRouter()

    const handleShowCreateExerciseDialog = (type: string) => {
        setShowTypeFields(false)
        setNewExercise({ ...DEFAULT_EXERCISE, type: type })
    }

    const handleDeleteSubject = async () => {
        const response = await fetch(`/api/subjects/${subject.id}`, { method: 'DELETE' })
        console.log(response)
        if (response.ok) {
            useRefreshStore.getState().triggerRefresh()
            router.back()
        }
    }

    const handleCreateNewExercise = async (exercise: Exercise) => {
        const response = await fetch('/api/exercises/', {
            method: 'POST',
            body: JSON.stringify({ ...exercise, subjectId: subject.id }),
        })
        const newExerciseId: number = (await response.json()).id
        setSubject({ ...subject, exercises: [...subject.exercises, { ...exercise, id: newExerciseId }] })
        setNewExercise(null)
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
        <main className="flex items-center mt-32 flex-col relative">
            {showDeleteModal && (
                <PopUpView handlePopUpClose={() => setShowDeleteModal(false)}>
                    <DeleteModal type={'Subject'} name={subject.name} deleteItem={handleDeleteSubject} />
                </PopUpView>
            )}
            <div className="w-full flex px-4 pb-4 pt-6 flex-col rounded-t-md">
                <div className="flex items-center">
                    <div
                        style={{ backgroundColor: subject.primaryColor }}
                        className="rounded-full p-2 h-12 w-12 min-h-12 min-w-12"
                    >
                        <Image src={bookIcon} alt={'book-icon'} width={32} height={32} className="filter invert" />
                    </div>
                    <input
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        className="max-w-96 ml-1 text-fgColor_default text-4xl font-bold pl-1 break-all border border-borderColor_default"
                    />
                    {subjectName !== subject.name && (
                        <>
                            <button className="ml-1" onClick={handleResetSubjectName}>
                                <XIconRed />
                            </button>
                            <button onClick={handleUpdateSubjectName}>
                                <CheckIconGreen />
                            </button>
                        </>
                    )}
                    <IsUserAdmin>
                        <Button
                            onClick={() => setShowDeleteModal((prev) => !prev)}
                            variant="danger"
                            className={`absolute right-40 w-32 h-10 rounded-md font-semibold -top-6 md:top-0`}
                            disabled={subject.exercises.length > 0}
                        >
                            Löschen
                        </Button>
                        <button
                            className={`bg-bgColor_accent_emphasis w-32 h-10 text-white rounded-md -top-6 md:top-0 right-6 absolute `}
                            onClick={() => setShowTypeFields(!showTypeFields)}
                        >
                            Erstellen
                        </button>
                        {showTypeFields && (
                            <div
                                className={
                                    'justify-start flex flex-col w-32 bg-bgColor_inset absolute top-10 right-6 rounded-md border border-borderColor_default'
                                }
                            >
                                {TYPES.map((type: string) => (
                                    <button
                                        className={'w-full text-left hover:bg-bgColor_neutral_muted px-2'}
                                        key={type}
                                        onClick={() => handleShowCreateExerciseDialog(type)}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        )}
                        {newExercise && (
                            <PopUpView handlePopUpClose={() => setNewExercise(null)}>
                                <ExerciseCard exercise={newExercise} edit={true} onChange={handleCreateNewExercise} />
                            </PopUpView>
                        )}
                    </IsUserAdmin>
                </div>
            </div>

            <hr className="w-full px-2" />
            <section className="w-10/12 flex justify-start flex-wrap mt-4">
                {subject.exercises.map((exercise: Exercise) => (
                    <DisplayExercises exercise={exercise} key={exercise.id} />
                ))}
            </section>
        </main>
    )
}

const DisplayExercises = ({ exercise }: { exercise: Exercise }) => {
    const [showDeleteExerciseModal, setShowDeleteExerciseModal] = useState<boolean>()
    const [showUpdateExerciseModal, setShowUpdateExerciseModal] = useState<boolean>()
    const { subject, setSubject } = useSubject()

    const handleDeleteExercise = async () => {
        await fetch(`/api/exercises/${exercise.id}`, { method: 'DELETE' })
        setSubject({ ...subject, exercises: subject.exercises.filter((item) => item.id !== exercise.id) })
    }

    const handleUpdateExercise = async (exercise: Exercise) => {
        const temp = [...subject.exercises]
        const index = temp.findIndex((item) => item.id === exercise.id)
        if (index !== -1) {
            temp[index] = exercise
        }
        await fetch(`/api/exercises/${exercise.id}`, { body: JSON.stringify(exercise), method: 'PUT' })
        setSubject({ ...subject, exercises: temp })
        setShowUpdateExerciseModal(false)
    }

    return (
        <>
            {showUpdateExerciseModal && (
                <PopUpView handlePopUpClose={() => setShowUpdateExerciseModal(false)}>
                    <ExerciseCard exercise={exercise} edit={true} onChange={handleUpdateExercise}></ExerciseCard>
                </PopUpView>
            )}
            {showDeleteExerciseModal && (
                <PopUpView handlePopUpClose={() => setShowDeleteExerciseModal(false)}>
                    <DeleteModal
                        type={'Exercise'}
                        name={exercise.title}
                        close={() => setShowDeleteExerciseModal(false)}
                        deleteItem={handleDeleteExercise}
                    />
                </PopUpView>
            )}
            <div
                onClick={() => setShowUpdateExerciseModal((prev) => !prev)}
                className={'w-64 h-32 bg-bgColor_inset border border-borderColor_default rounded-md relative m-2 p-2'}
            >
                <div className={'absolute top-2 right-4 flex z-10'}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowDeleteExerciseModal(true)
                        }}
                    >
                        <TrashIcon className={'w-6 h-6'} />
                    </button>
                </div>
                <h2 className="text-xl font-semibold overflow-y-auto">{exercise.title}</h2>
                <label
                    className={'px-2 bg-bgColor_accent_muted rounded-xl text-fgColor_accent absolute bottom-2 left-2'}
                >
                    {exercise.type}
                </label>
            </div>
        </>
    )
}
