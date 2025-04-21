'use client';
import React from 'react';
import { ExerciseTextComponent } from '@/types/dtos/exerciseDTO';
import { useSubject } from '@/context/SubjectProvider';

interface ExerciseTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    type: 'answer' | 'question';
    index: number;
}

export const ExerciseTextArea: React.FC<ExerciseTextAreaProps> = ({ index, type, ...props }) => {
    const { subject, setSubject } = useSubject();

    const value = (subject.exercises[index][type][0] as ExerciseTextComponent).content;

    const handleChangeValue = (value: string) => {
        const exercises = [...subject.exercises];
        (exercises[index][type][0] as ExerciseTextComponent).content = value;
        setSubject({ ...subject, exercises: exercises });
    };

    return (
        <textarea
            {...props}
            name="question"
            value={value}
            onChange={(e) => handleChangeValue(e.target.value)}
            className="bg-transparent text-fgColor_default resize-none w-full h-32 border border-borderColor_default pl-2 rounded-md"
        />
    );
};
