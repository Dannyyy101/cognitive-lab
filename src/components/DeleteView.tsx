import React, {useState} from "react";
import {usePopUpClose} from "@/context/PopUpContext";

interface DeleteViewProps {
    correctAnswer: string
    children?: React.ReactNode
    handleDelete: () => void
}

export const DeleteView: React.FC<DeleteViewProps> = ({correctAnswer, handleDelete, children}) => {
    const [userInput, setUserInput] = useState<string>("")
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)
    const handleClosePopUp = usePopUpClose()

    const handleCompareAnswers = () => {
        if (userInput === correctAnswer) {
            handleDelete()
        }else{
            setShowErrorMessage(true)
        }
    }

    const handleUserInput = (value:string) =>{
        setUserInput(value)
        if(showErrorMessage){
            setShowErrorMessage(false)
        }
    }

    return <section className="relative w-96 h-96 p-4 bg-bgColor_default rounded-md">
        <h1 className="text-2xl font-bold text-fgColor_default">{correctAnswer} endgültig löschen?</h1>
        {children}
        <p className="text-fgColor_default mt-2">Bitte geben Sie <strong>{correctAnswer}</strong> ein. Dadurch wird es
            endgültige gelöscht.</p>
        <input className="text-fgColor_default mt-2 pl-1 w-full h-8 border-borderColor_default border rounded-md bg-transparent" value={userInput}
               onChange={(e) => handleUserInput(e.target.value)}/>
        {showErrorMessage && <p className="text-fgColor_danger">Ihre Eingabe stimmt nicht überein</p>}
        <button onClick={handleClosePopUp}
                className="text-fgColor_default rounded-md w-32 h-10 border-borderColor_default border absolute bottom-4 left-4">Zurück
        </button>
        <button onClick={handleCompareAnswers}
                className="absolute bottom-4 right-4 bg-bgColor_danger_muted text-fgColor_danger w-32 h-10 rounded-md">Löschen
        </button>
    </section>
}