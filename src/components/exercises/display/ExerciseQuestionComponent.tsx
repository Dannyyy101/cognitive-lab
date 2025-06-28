import { ExerciseText } from '@/types/models/exercise'
import React from 'react'
import { useExercise } from '@/context/ExerciseProvider'

export const ExerciseQuestionComponent: React.FC<{ edit?: boolean }> = ({ edit }) => {
    const { exercise, setExercise } = useExercise()

    switch (exercise.type) {
        case 'text':
            const textExercise = exercise as ExerciseText
            return (
                <div className={'flex flex-col p-4'}>
                    {edit ? (
                        <>
                            <label className={'mt-2 text-2xl font-semibold'}>Titel</label>
                            <input
                                className={'w-96 border border-borderColor_default rounded-md pl-2 h-10'}
                                placeholder={'Titel...'}
                                value={exercise.title}
                                onChange={(e) => setExercise({ ...exercise, title: e.target.value })}
                            />
                            <label className={'mt-2 text-2xl font-semibold'}>Frage</label>
                            <textarea
                                className={'resize-none border border-borderColor_default rounded-md w-96 h-32 p-2'}
                                value={exercise.content.question}
                                onChange={(e) =>
                                    setExercise({
                                        ...exercise,
                                        content: { ...exercise.content, question: e.target.value },
                                    })
                                }
                            />
                        </>
                    ) : (
                        <>
                            <label className={'text-2xl font-semibold'}>{exercise.title}</label>
                            <p>{textExercise.content.question}</p>
                        </>
                    )}
                </div>
            )
    }
}
