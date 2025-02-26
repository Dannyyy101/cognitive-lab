'use client'
import React, {useEffect} from "react";

interface ThemeProps {
    children: React.ReactNode
}

export const Theme: React.FC<ThemeProps> = ({children}) => {

    useEffect(() => {
        let theme = localStorage.getItem("theme")

        if (!theme) {
            localStorage.setItem("theme", "white")
            theme = "white"
        }
        document.body.setAttribute("data-color-mode", theme)
    }, []);

    return children
}