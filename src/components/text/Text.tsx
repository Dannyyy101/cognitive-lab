import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
    children: string;
}

export const Text: React.FC<TextProps> = ({ children, ...props }) => {
    return (
        <></>
    );
};