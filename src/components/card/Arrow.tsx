import React from 'react';
import Image from "next/image";

import leftArrow from "../../media/chevron-left.svg";
import rightArrow from "../../media/chevron-right.svg";

interface ArrowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    direction: "left" | "right"
}

export const Arrow: React.FC<ArrowProps> = ({direction, ...props}) => {
    return <button {...props}>
        <Image src={direction === "right" ? rightArrow : leftArrow} alt={`${direction}-arrow`}/>
    </button>;
};