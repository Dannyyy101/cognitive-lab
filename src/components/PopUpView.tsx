"use client";
import React, { useState, useEffect, useRef } from "react";

interface PopUpViewProps {
  children: React.ReactNode;
  handlePopUpClose: () => void;
}

export const PopUpView: React.FC<PopUpViewProps> = ({
  children,
  handlePopUpClose,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        handlePopUpClose();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 bg-bgColor_inverse opacity-50 z-40"
        onClick={handlePopUpClose}
      ></div>
      <section
        ref={inputRef}
        className="shadow-xl z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit rounded-lg bg-white flex flex-col items-center"
      >
        {children}
      </section>
    </>
  );
};
