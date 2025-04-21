import { ExerciseFileUpload } from '@/components/exercises/display/ExerciseFileUpload';
import { ExerciseTextArea } from '@/components/exercises/display/ExerciseTextArea';
import { Card, CardBottom, CardSection } from '@/components/ui/Card';
import { useSubject } from '@/context/SubjectProvider';

import React from 'react';

export const EditExerciseView = ({ index }: { index: number }) => {
    const { subject, setSubject } = useSubject();

    if (!subject.exercises || subject.exercises.length === 0) return null;

    const exercise = subject.exercises.at(index);
    if (!exercise) return null;

    let questionComponent = null;
    let answerComponent = null;

    switch (exercise.question?.at(0)?.type) {
        case 'text':
            questionComponent = (
                <>
                    <label className="mt-2 w-full">Frage</label>
                    <ExerciseTextArea type="question" index={index} placeholder="Gib hier deine Frage ein" />
                </>
            );
            break;
        case 'image':
            questionComponent = (
                <>
                    <label className="mt-2 w-full">Frage</label>
                    <ExerciseFileUpload index={index} />
                </>
            );
            break;
    }

    switch (exercise.answer?.at(0)?.type) {
        case 'text':
            answerComponent = (
                <>
                    <label className="mt-2 w-full">Antwort</label>
                    <ExerciseTextArea type="answer" index={index} placeholder="Gib hier deine Antwort ein" />
                </>
            );
            break;
    }

    const handleChangeDocumentationUrl = (url: string) => {
        const temp = [...subject.exercises];
        temp[index] = { ...exercise, documentationUrl: url };
        setSubject({ ...subject, exercises: temp });
    };

    return (
        <Card>
            <CardSection>
                {questionComponent}
                {answerComponent}
            </CardSection>
            <CardBottom>
                <input
                    onChange={(e) => handleChangeDocumentationUrl(e.target.value)}
                    value={exercise.documentationUrl}
                    className="pl-1 rounded-md w-40 h-10 border border-borderColor_default"
                    placeholder="Doku Link"
                />
            </CardBottom>
        </Card>
    );
};
