'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Exercise } from '@/types/models/exercise'
import { ExerciseCard } from '@/components/exercises/ExerciseCard'
import { convertSecondsToTime } from '@/utils/convertSecondsToTime'
import confetti from 'canvas-confetti'
import { PopUpView } from '@/components/PopUpView'
import { useSession } from '@/hooks/useSession'
import { Button } from '@/components/ui/button/Button'
import { useRouter } from 'next/navigation'
import { BookIcon, ClockIcon, GoalIcon } from '@primer/octicons-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { formatTimeFromSeconds } from '@/utils/time'

export default function Learn() {
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [showFinishedExercisesModal, setShowFinishedExercisesModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [timer, setTimer] = useState<number>(0)
    const router = useRouter()

    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const [index, setIndex] = useState<number>(0)

    const params = useSearchParams()
    const subjectIds = params.get('subjectIds')

    const isLearned = useSession((state) => {
        const id = exercises[index]?.id
        return id ? state.isLearned(id) : false
    })

    useEffect(() => {
        fetch(`/api/exercises?subjectIds=${subjectIds}`).then((result) =>
            result.json().then((result) => {
                setExercises(result.data)
                setLoading(false)
            })
        )
    }, [subjectIds])

    useEffect(() => {
        startTimer()

        return () => stopTimer()
    }, [])

    const startTimer = () => {
        if (intervalRef.current !== null) return
        intervalRef.current = setInterval(() => {
            setTimer((prev) => prev + 1)
        }, 1000)
    }

    const stopTimer = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    if (!subjectIds) return <div>No Exercises selected</div>

    if (loading) return <div></div>

    if (exercises.length === 0)
        return (
            <div className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}>
                Keine Aufgaben ausgewählt
            </div>
        )

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

    const handleFinishLearnSession = () => {
        setShowFinishedExercisesModal(true)
        stopTimer()
    }

    const nextDisabled = !isLearned

    return (
        <main className={'w-screen h-screen flex flex-col items-center justify-center relative'}>
            <p className="absolute top-24 md:top-32 right-4 md:right-10 tabular-nums">{convertSecondsToTime(timer)}</p>
            <ExerciseCard exercise={exercises[index]} />
            <div className={'md:mt-8 mt-4'}>
                <button
                    className={'w-32 h-10 border border-borderColor_default rounded-md text-black mx-1'}
                    onClick={handlePreviousPage}
                >
                    Vorherige Frage
                </button>
                {index === exercises.length - 1 ? (
                    <Button
                        variant="primary"
                        className={`w-32 h-10 mx-1`}
                        onClick={handleFinishLearnSession}
                        disabled={nextDisabled}
                    >
                        Beenden
                    </Button>
                ) : (
                    <Button
                        variant="primary"
                        className={`w-36 h-10 mx-1`}
                        onClick={handleNextPage}
                        disabled={nextDisabled}
                    >
                        Nächste Frage
                    </Button>
                )}
            </div>
            {showFinishedExercisesModal && (
                <PopUpView handlePopUpClose={() => setShowFinishedExercisesModal(false)}>
                    <FinishedExercisesModal router={router} time={timer} numberOfSubjects={subjectIds.length} />
                </PopUpView>
            )}
            <div
                className={`absolute bottom-0 left-0 h-1 bg-bgColor_accent_emphasis rounded-e-md`}
                style={{ width: `${(index + 1 / exercises.length) * 100}%` }}
            ></div>
        </main>
    )
}

const FinishedExercisesModal = ({
    router,
    time,
    numberOfSubjects,
}: {
    router: AppRouterInstance
    time: number
    numberOfSubjects: number
}) => {
    const session = useSession()

    const fireConfetti = () => {
        const duration = 1000 // 1 second
        const end = Date.now() + duration

        ;(function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
            })
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
            })

            if (Date.now() < end) {
                requestAnimationFrame(frame)
            }
        })()
    }

    useEffect(() => {
        fireConfetti()
    }, [])

    const handleEscapeLearningMode = () => {
        session.clear()
        router.back()
    }

    const numberOfCorrectExercises = session.exercises.filter((items) => items.correct).length
    const percentageOfCorrectAnswers =
        numberOfCorrectExercises > 0 ? Math.floor((numberOfCorrectExercises / session.exercises.length) * 100) : 0
    const numberOfWrongExercises = session.exercises.length - numberOfCorrectExercises

    return (
        <div className="w-[400px] h-[500px] p-4 flex flex-col items-center relative">
            <h1 className="text-3xl font-bold text-center mt-4">Du hast es geschaft 🥳</h1>
            <div className="w-full flex">
                <div className="mt-4 w-1/2 h-32 bg-bgColor_accent_muted flex flex-col items-center justify-center rounded-md mx-1">
                    <ClockIcon className="text-fgColor_accent" size={24} />
                    <h2 className="text-2xl font-semibold text-fgColor_accent">{formatTimeFromSeconds(time)}</h2>
                    <p className="text-fgColor_muted">Time spent</p>
                </div>
                <div className="mt-4 w-1/2 h-32 bg-bgColor_done_muted flex flex-col items-center justify-center rounded-md mx-1">
                    <BookIcon className="text-fgColor_done" size={24} />
                    <h2 className="text-2xl font-semibold text-fgColor_done">{numberOfSubjects}</h2>
                    <p className="text-fgColor_muted">Topics Covered</p>
                </div>
            </div>
            <div className="mt-2 w-full h-32 bg-bgColor_success_muted flex flex-col items-center justify-center rounded-md">
                <GoalIcon className="text-fgColor_success" size={24} />
                <h2 className="text-2xl font-semibold text-fgColor_success">{percentageOfCorrectAnswers}%</h2>
                <p className="text-fgColor_muted">Accuracy</p>
                <div className="flex">
                    <div className="flex items-center mx-2">
                        <div className="w-3 h-3 bg-bgColor_success_emphasis rounded-full"></div>
                        <p className="text-fgColor_success ml-1">{numberOfCorrectExercises}</p>
                    </div>
                    <div className="flex items-center mx-2">
                        <div className="w-3 h-3 bg-bgColor_danger_emphasis rounded-full"></div>
                        <p className="text-fgColor_danger ml-1">{numberOfWrongExercises}</p>
                    </div>
                </div>
            </div>

            <section className="w-full flex justify-center absolute bottom-8 left-1/2 -translate-x-1/2">
                <button
                    onClick={handleEscapeLearningMode}
                    className="w-32 h-10 bg-bgColor_accent_emphasis text-white rounded-md"
                >
                    Fertig
                </button>
            </section>
        </div>
    )
}
