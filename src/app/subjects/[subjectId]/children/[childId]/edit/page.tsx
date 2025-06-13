'use client'

import React, { useState } from 'react'
import { useSubject } from '@/context/SubjectProvider'
import Image from 'next/image'
import bookIcon from '@/media/book.svg'
import { IsUserAdmin } from '@/components/auth/IsUserAdmin'
import { Exercise } from '@/types/models/exercise'
import { ExerciseQuestionComponent } from '@/components/exercises/display/ExerciseQuestionComponent'
import { TrashIcon } from '@/components/ui/Icons'
import { DEFAULT_EXERCISE, TYPES } from '@/utils/constants'
import { PopUpView } from '@/components/PopUpView'
import { ExerciseCard } from '@/components/exercises/ExerciseCard'
import { ExerciseProvider } from '@/context/ExerciseProvider'
import { DeleteModal } from '@/components/ui/DeleteModal'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function Page() {
    const { subject, setSubject } = useSubject()
    const [showTypeFields, setShowTypeFields] = useState<boolean>(false)
    const [newExercise, setNewExercise] = useState<Exercise | null>(null)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

    const router = useRouter()
    const pathname = usePathname()

    const handleShowCreateExerciseDialog = (type: string) => {
        setShowTypeFields(false)
        setNewExercise({ ...DEFAULT_EXERCISE, type: type })
    }

    const handleDeleteSubject = async () => {
        const response = await fetch(`/api/subjects/${subject.id}`, { method: 'DELETE' })
        if (response.ok) {
            router.push(pathname.replace(/\/children\/\d\/edit/, ''))
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

    return (
        <main className="flex items-center mt-32 flex-col relative">
            {showDeleteModal && (
                <PopUpView handlePopUpClose={() => setShowDeleteModal(false)}>
                    <DeleteModal
                        type={'Subject'}
                        name={subject.name}
                        close={() => setShowDeleteModal(false)}
                        deleteItem={handleDeleteSubject}
                    />
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
                    <h1 className="text-fgColor_default text-4xl font-bold pl-2 break-all">{subject.name}</h1>
                    <IsUserAdmin>
                        <button
                            onClick={() => setShowDeleteModal((prev) => !prev)}
                            className={` ${subject.exercises.length > 0 ? 'bg-bgColor_disabled text-gray-400 cursor-not-allowed' : 'bg-bgColor_danger_emphasis text-white'} flex justify-center items-center absolute right-40 w-32 h-10 rounded-md font-semibold top-0`}
                            disabled={subject.exercises.length > 0}
                        >
                            Löschen
                        </button>
                        <button
                            className={`bg-bgColor_accent_emphasis w-32 h-10 text-white rounded-md top-0 right-6 absolute `}
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
    const { subject, setSubject } = useSubject()

    const handleDeleteExercise = async () => {
        await fetch(`/api/exercises/${exercise.id}`, { method: 'DELETE' })
        setSubject({ ...subject, exercises: subject.exercises.filter((item) => item.id !== exercise.id) })
    }

    return (
        <>
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
            <div className={'w-64 h-32 bg-bgColor_inset border border-borderColor_default rounded-md relative m-2'}>
                <div className={'absolute top-2 right-4 flex'}>
                    <button onClick={() => setShowDeleteExerciseModal(true)}>
                        <TrashIcon className={'w-6 h-6'} />
                    </button>
                </div>
                <ExerciseProvider oldExercise={exercise}>
                    <ExerciseQuestionComponent />
                </ExerciseProvider>
                <label className={'bg-bgColor_accent_muted rounded-xl text-fgColor_accent px-2 py-0.5 ml-2'}>
                    {exercise.type}
                </label>
            </div>
        </>
    )
}
