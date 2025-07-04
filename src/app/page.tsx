'use client'
import { Loading } from '@/components/Loading'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import bookIcon from '../media/book.svg'
import Image from 'next/image'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useTheme } from '@/components/Theme'
import { PopUpView } from '@/components/PopUpView'
import { CreateSubjectView } from '@/components/subjects/CreateSubjectView'
import { IsUserAdmin } from '@/components/auth/IsUserAdmin'
import { Subject } from '@/types/models/subject'
import { Exercise } from '@/types/models/exercise'

export default function Page() {
    const [subjects, setSubject] = useState<Subject[]>([])
    const [searchedSubjects, setSearchedSubjects] = useState<Subject[]>([])
    const [searchInput, setSearchInput] = useState<string>('')
    const [showCrateSubjectView, setShowCreateSubjectView] = useState<boolean>(false)

    useEffect(() => {
        fetch('/api/subjects').then((response) => {
            response.json().then((data) => {
                setSubject(data)
                setSearchedSubjects(data)
            })
        })
    }, [])

    if (!subjects) {
        return <Loading />
    }

    const handleAddSubject = (subject: Subject) => {
        setSubject([...subjects, subject])
        setSearchedSubjects([...searchedSubjects, subject])
    }
    const handleSearchInputChange = (value: string) => {
        setSearchInput(value)
        if (value.length > 0) {
            setSearchedSubjects(subjects.filter((e) => e.name.toLowerCase().includes(value.toLowerCase())))
        } else {
            setSearchedSubjects(subjects)
        }
    }

    return (
        <main className="w-screen min-h-screen flex flex-col items-center">
            <IsUserAdmin>
                <button
                    onClick={() => setShowCreateSubjectView(true)}
                    className="w-32 h-10 top-32 right-4 bg-bgColor_inverse absolute rounded-md text-bgColor_default"
                >
                    Erstellen
                </button>
            </IsUserAdmin>
            <input
                className="mt-48 md:mt-32 w-96 bg-transparent border-borderColor_default border h-12 pl-2 rounded-md text-fgColor_default"
                value={searchInput}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                placeholder={'Suche nach Kategorien'}
            />
            <section className="flex w-full mt-8 md:items-center justify-center flex-wrap relative overflow-y-auto">
                {searchedSubjects.map((s) => (
                    <SubjectView subject={s} key={s.id} />
                ))}
            </section>
            {showCrateSubjectView && (
                <PopUpView handlePopUpClose={() => setShowCreateSubjectView(false)}>
                    <CreateSubjectView handleAddSubject={handleAddSubject} />
                </PopUpView>
            )}
        </main>
    )
}

interface SubjectDisplayProps {
    subject: Subject
}

const SubjectView: React.FC<SubjectDisplayProps> = ({ subject }) => {
    const numberOfExercises = subject.children.reduce((sum: number, e: Subject) => sum + e.exercises.length, 0)
    const learnedExercises = subject.children.reduce(
        (sum: number, child: Subject) => sum + child.exercises.filter((e: Exercise) => e.learned).length,
        0
    )
    const rating = Math.floor(learnedExercises !== 0 ? (learnedExercises / numberOfExercises) * 100 : 0)

    const { theme } = useTheme()

    return (
        <Link href={`/subjects/${subject.id}`} className="w-96 h-56 rounded-md m-2 border-borderColor_default border">
            <div
                className="w-full flex  px-4 pb-4 pt-6 flex-col rounded-t-md"
                style={{ backgroundColor: `${theme === 'dark' ? subject.primaryColor : subject.secondaryColor}` }}
            >
                <div className="flex">
                    <div style={{ backgroundColor: subject.primaryColor }} className="rounded-full p-2 h-9 w-9">
                        <Image src={bookIcon} alt={'book-icon'} width={20} height={20} className="filter invert" />
                    </div>
                    <h1 className="text-fgColor_default text-2xl font-semibold pl-2 ">{subject.name}</h1>
                </div>
            </div>
            <div className="w-full mt-4 px-4">
                <div className="w-full flex">
                    <p className="text-sm w-1/2 text-fgColor_default">
                        {numberOfExercises} {numberOfExercises === 1 ? 'Aufgabe' : 'Aufgaben'}
                    </p>
                    <p className="text-sm w-1/2 text-right text-fgColor_default">
                        {subject.children.length} {subject.children.length === 1 ? 'Unter-Thema' : 'Unter-Themen'}
                    </p>
                </div>
                <ProgressBar progress={rating} color={subject.primaryColor} />
                <p className="w-full text-right text-sm text-fgColor_disabled mt-1">{rating}% erledigt</p>
                <button className="mt-4 w-32 h-10 rounded-md bg-bgColor_inverse text-bgColor_default font-semibold">
                    Lernen
                </button>
            </div>
        </Link>
    )
}
