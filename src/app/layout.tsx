import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Theme } from "@/components/Theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home101",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        data-color-mode="light"
        data-light-theme="light"
        data-dark-theme="dark"
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background_default`}
      >
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}