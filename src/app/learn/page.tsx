'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Exercise } from '@/types/models/exercise'
import { ExerciseCard } from '@/components/exercises/ExerciseCard'

export default function Learn() {
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const [index, setIndex] = useState<number>(0)

    const params = useSearchParams()
    const subjectIds = params.get('subjectIds')
    useEffect(() => {
        fetch(`/api/exercises?subjectIds=${subjectIds}`).then((result) =>
            result.json().then((result) => {
                setExercises(result.data)
                setLoading(false)
            })
        )
    }, [subjectIds])
    if (!subjectIds) return <div>No Exercises selected</div>

    if (loading) return <div></div>

    const handleNextPage = () => {
        if (index < exercises.length - 1) {
            setIndex(index + 1)
        }
    }

    const handlePreviousPage = () => {
        if (index > 0) {
            setIndex(index - 1)
        }
    }

    return (
        <main className={'w-screen h-screen flex flex-col items-center justify-center'}>
            <ExerciseCard exercise={exercises[index]} />
            <div className={'mt-8'}>
                <button
                    className={'w-32 h-10 border border-borderColor_default rounded-md text-black mx-1'}
                    onClick={handlePreviousPage}
                >
                    Vorherige Frage
                </button>
                <button
                    className={'w-32 h-10 bg-bgColor_accent_emphasis rounded-md text-white mx-1'}
                    onClick={handleNextPage}
                >
                    Nächste Frage
                </button>
            </div>
        </main>
    )
}
