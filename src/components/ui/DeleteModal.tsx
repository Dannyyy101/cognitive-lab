import React, { useState } from 'react'

interface DeleteModalProps {
    type: string
    name: string
    close?: () => void
    deleteItem: () => void
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ type, name, close, deleteItem }) => {
    const [userInput, setUserInput] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState('')
    const handleDelete = () => {
        if (userInput === name) {
            deleteItem()
            if (close) close()
        } else {
            setErrorMessage('Ungültige Eingabe')
        }
    }

    const handleUserInput = (e: string) => {
        setUserInput(e)
        if (errorMessage.length > 0) setErrorMessage('')
    }

    return (
        <div className={'w-96 h-64 flex p-4 flex-col relative'}>
            <h1 className={'text-2xl font-semibold'}>{type} löschen</h1>
            <p>
                Möchtest du {name} wirklich löschen? Gib dazu den Namen ein: <strong>{name}</strong>
            </p>
            <input
                value={userInput}
                onChange={(e) => handleUserInput(e.target.value)}
                className={'w-full h-10 mt-2 rounded-md border-borderColor_default border pl-2'}
            />
            <p className={'text-fgColor_danger'}>{errorMessage}</p>
            <button
                className={'absolute bottom-4 left-4 w-32 h-10 rounded-md border-borderColor_default border'}
                onClick={close}
            >
                Zurück
            </button>
            <button
                className={'absolute bottom-4 right-4 w-32 h-10 rounded-md bg-bgColor_danger_emphasis text-white'}
                onClick={handleDelete}
            >
                Löschen
            </button>
        </div>
    )
}
