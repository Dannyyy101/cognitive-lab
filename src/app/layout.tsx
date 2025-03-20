import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Header} from "@/components/header/Header";
import React from "react";
import {getAuthenticatedAppForUser} from "@/lib/firebase/serverApp";
import {ThemeProvider} from "@/components/Theme";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "cognitive lab",
    description: "",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const { currentUser } = await getAuthenticatedAppForUser();
    return (
        <html lang="en">
        <body
            data-color-mode="light"
            data-light-theme="light"
            data-dark-theme="dark"
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background_default`}
        >
        <ThemeProvider>

                <Header initialUser={currentUser}/>
                {children}

        </ThemeProvider>
        </body>
        </html>
    );
}