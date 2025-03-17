import React from "react";

export const ExerciseFileUpload: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }) => {
  return <input {...props} type="file" />;
};
