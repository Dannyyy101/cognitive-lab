import Image from "next/image";
import React from "react";
import {useTheme} from "@/components/Theme";

interface ImageIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string,
    alt: string
}

export const ImageIcon: React.FC<ImageIconProps> = ({src, alt, ...props}) => {
    const {theme} = useTheme()
    return <Image {...props} src={src} alt={alt} className={`${theme === "dark" && "filter invert"}`} width={24}
                  height={24}/>
}