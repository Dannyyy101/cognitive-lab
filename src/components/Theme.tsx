'use client';
import React, { useEffect, useState, createContext, useContext } from "react";

interface ThemeProps {
    children: React.ReactNode;
}

const ThemeContext = createContext<{ theme: "light" | "dark"; toggleTheme: () => void } | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProps> = ({ children }) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        let storedTheme = localStorage.getItem("theme");
        if (!storedTheme) {
            storedTheme = "light";
            localStorage.setItem("theme", "light");
        }
        if(storedTheme !== "light" &&storedTheme!== "dark"){
            throw new Error("invalid theme pls use light or dark")
        }
        setTheme(storedTheme);
        document.body.setAttribute("data-color-mode", storedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.body.setAttribute("data-color-mode", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
