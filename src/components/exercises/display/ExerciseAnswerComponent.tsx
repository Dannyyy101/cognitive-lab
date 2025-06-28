import React, { useEffect, useState } from 'react'
import { isAnswerCorrect } from '@/utils/exerciseFunctions'
import { useExercise } from '@/context/ExerciseProvider'
import { TrashIcon } from '@/components/ui/Icons'
import { useSession } from '@/hooks/useSession'
import { Text } from '@/components/text/Text'

export const ExerciseAnswerComponent: React.FC<{ showAnswer: boolean; edit?: boolean }> = ({ showAnswer, edit }) => {
    const [userInput, setUserInput] = useState<string>('')
    const [isCorrect, setIsCorrect] = useState<boolean>(false)
    const [learned, setLearned] = useState<boolean>(false)

    const session = useSession()

    const { exercise, setExercise } = useExercise()

    useEffect(() => {
        setUserInput('')
        setLearned(false)
    }, [exercise])

    const isInputCorrect = (e: string) => {
        setUserInput(e)
        setIsCorrect(isAnswerCorrect(e, exercise.content.answer[0]))
    }

    const handleUpdateAnswer = (value: string, index: number) => {
        const temp = [...exercise.content.answer]
        temp[index] = value
        setExercise({ ...exercise, content: { ...exercise.content, answer: temp } })
    }

    const handleDeleteAnswer = (index: number) => {
        setExercise({
            ...exercise,
            content: { ...exercise.content, answer: exercise.content.answer.toSpliced(index, 1) },
        })
    }
    useEffect(() => {
        if (!edit && showAnswer && !learned && !session.isLearned(exercise.id)) {
            session.addExercise(exercise, isCorrect)
            fetch(`/api/exercises/${exercise.id}/learned`, {
                body: JSON.stringify({ correct: isCorrect }),
                method: 'POST',
            }).then((response) => {
                console.log('ok', response.ok)
                if (response.ok) {
                    setLearned(true)
                } else {
                    session.removeExercise(exercise.id)
                }
            })
        }
    }, [showAnswer])

    switch (exercise.type) {
        case 'text':
            return (
                <div className={'flex w-full'}>
                    <div className={`flex flex-col p-4 ${edit ? 'w-full' : 'w-1/2'}`}>
                        <label className={'mt-2 text-2xl font-semibold'}>Deine Antwort</label>
                        {edit ? (
                            <div className="flex flex-col w-full">
                                {exercise.content.answer.map((item: string, index: number) => (
                                    <div className="flex items-center" key={index}>
                                        <input
                                            value={item}
                                            onChange={(e) => handleUpdateAnswer(e.target.value, index)}
                                            className={
                                                'border border-borderColor_default rounded-md w-96 h-10 p-2 mb-2'
                                            }
                                        />
                                        {index > 0 && (
                                            <button onClick={() => handleDeleteAnswer(index)} className="ml-2">
                                                <TrashIcon />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <div className="w-96 flex justify-center">
                                    <button
                                        onClick={() =>
                                            setExercise({
                                                ...exercise,
                                                content: {
                                                    ...exercise.content,
                                                    answer: [...exercise.content.answer, ''],
                                                },
                                            })
                                        }
                                        className="w-8 h-8 rounded-full border-2 border-borderColor_default"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <textarea
                                value={userInput}
                                onChange={(e) => isInputCorrect(e.target.value)}
                                className={'resize-none border border-borderColor_default rounded-md w-96 h-32 p-2'}
                            />
                        )}
                    </div>
                    {showAnswer && (
                        <div className={`flex flex-col p-4 w-1/2`}>
                            <label
                                className={`text-2xl font-semibold ${isCorrect ? 'text-fgColor_success' : 'text-fgColor_danger'}`}
                            >
                                Lösung
                            </label>
                            <Text
                                className={`resize-none border rounded-md w-96 h-32 p-2 ${isCorrect ? 'text-fgColor_success border-borderColor_success_emphasis' : 'text-fgColor_danger border-borderColor_danger_emphasis'}`}
                            >
                                {exercise.content.answer.join('\n')}
                            </Text>
                        </div>
                    )}
                </div>
            )
    }
}
