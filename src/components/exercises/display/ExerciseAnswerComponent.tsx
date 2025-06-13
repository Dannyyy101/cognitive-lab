import React, { useState } from 'react'
import { isAnswerCorrect } from '@/utils/exerciseFunctions'
import { useExercise } from '@/context/ExerciseProvider'

export const ExerciseAnswerComponent: React.FC<{ showAnswer: boolean; edit?: boolean }> = ({ showAnswer, edit }) => {
    const [userInput, setUserInput] = useState<string>('')
    const [isCorrect, setIsCorrect] = useState<boolean>(false)

    const { exercise, setExercise } = useExercise()

    const isInputCorrect = (e: string) => {
        setUserInput(e)
        setIsCorrect(isAnswerCorrect(e, exercise.content.answer))
    }

    switch (exercise.type) {
        case 'text':
            return (
                <div className={'flex w-full'}>
                    <div className={'flex flex-col p-4 w-1/2'}>
                        <label className={'text-2xl font-semibold'}>Deine Antwort</label>
                        {edit ? (
                            <textarea
                                value={exercise.content.answer}
                                onChange={(e) =>
                                    setExercise({
                                        ...exercise,
                                        content: { ...exercise.content, answer: e.target.value },
                                    })
                                }
                                className={'resize-none border border-borderColor_default rounded-md w-96 h-32 p-2'}
                            />
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
                            <p
                                className={`resize-none border rounded-md w-96 h-32 p-2 ${isCorrect ? 'text-fgColor_success border-borderColor_success_emphasis' : 'text-fgColor_danger border-borderColor_danger_emphasis'}`}
                            >
                                {exercise.content.answer}
                            </p>
                        </div>
                    )}
                </div>
            )
    }
}
