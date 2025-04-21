import React, { ChangeEvent } from 'react';
import { uploadFile } from '@/actions/fileActions';
import { ExerciseImageComponent } from '@/types/dtos/exerciseDTO';
import { IMAGE_URL } from '@/utils/constants';
import { useSubject } from '@/context/SubjectProvider';

interface ExerciseFileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
    index: number;
}

export const ExerciseFileUpload: React.FC<ExerciseFileUploadProps> = ({ index, ...props }) => {
    const { subject, setSubject } = useSubject();

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const { data, error: _error } = await uploadFile(file);
            if (data) {
                const updatedExercises = [...subject.exercises];
                (updatedExercises[index].question[0] as ExerciseImageComponent).imageUrl = IMAGE_URL + data.fullPath;
                console.log('PATH', IMAGE_URL + data.fullPath);
                console.log('exercises', updatedExercises);
                setSubject({ ...subject, exercises: updatedExercises });
            }
        }
    };

    return <input onChange={handleFileChange} className="text-fgColor_default" {...props} type="file" />;
};
