import React from "react";

export const ExerciseTextArea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ ...props }) => {
  return (
    <textarea
      {...props}
      className="bg-transparent text-fgColor_default resize-none w-full h-32 border border-borderColor_default pl-2 rounded-md"
    />
  );
};
