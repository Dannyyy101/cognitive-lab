import { ExerciseQuestionComponent } from '@/components/exercises/display/ExerciseQuestionComponent'
import { ExerciseAnswerComponent } from '@/components/exercises/display/ExerciseAnswerComponent'
import { Exercise } from '@/types/models/exercise'
import React, { useState } from 'react'
import { ExerciseProvider, useExercise } from '@/context/ExerciseProvider'

export interface ExerciseCardProps {
    exercise: Exercise
    edit?: boolean
    onChange?: (exercise: Exercise) => void
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, edit, onChange }) => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    return (
        <ExerciseProvider oldExercise={exercise}>
            <section
                className={
                    'w-[900px] h-[420px] border border-l-4 border-l-fgColor_accent border-borderColor_default rounded-md flex flex-col justify-end'
                }
            >
                <div className={`h-full overflow-y-auto ${edit && 'flex'}`}>
                    <ExerciseQuestionComponent edit={edit} />
                    <ExerciseAnswerComponent showAnswer={showAnswer} edit={edit} />
                </div>
                <div className={'border-t border-borderColor_default h-32 flex items-center px-4 justify-end'}>
                    {edit && onChange ? (
                        <ExerciseSaveButton onChange={onChange} />
                    ) : (
                        <button
                            className={'w-32 h-10 bg-bgColor_accent_emphasis rounded-md text-white'}
                            onClick={() => setShowAnswer(!showAnswer)}
                        >
                            Lösung
                        </button>
                    )}
                </div>
            </section>
        </ExerciseProvider>
    )
}

const ExerciseSaveButton: React.FC<{ onChange: (exercise: Exercise) => void }> = ({ onChange }) => {
    const { exercise } = useExercise()
    return (
        <button
            className={'w-32 h-10 bg-bgColor_accent_emphasis rounded-md text-white'}
            onClick={() => {
                onChange(exercise)
            }}
        >
            Speichern
        </button>
    )
}
