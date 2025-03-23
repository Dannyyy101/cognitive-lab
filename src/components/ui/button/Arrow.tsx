import React from 'react';

import leftArrow from "../../../media/chevron-left.svg";
import rightArrow from "../../../media/chevron-right.svg";
import {ImageIcon} from "@/components/ui/image/ImageIcon";

interface ArrowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    direction: "left" | "right"
}

export const Arrow: React.FC<ArrowProps> = ({direction, ...props}) => {
    return <button {...props}>
        <ImageIcon src={direction === "right" ? rightArrow : leftArrow} alt={`${direction}-arrow`}/>
    </button>;
};