import React from "react";

export const ExerciseTextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({...props}) => {
    return <textarea {...props}
                     className="resize-none w-96 h-32 border border-borderColor_default pl-2 rounded-md"/>
}