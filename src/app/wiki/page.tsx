'use client'
import { useEffect, useState } from 'react'

export default function Wiki() {
    const [rows, setRows] = useState<string[]>([''])
    const [inputFields, setInputFields] = useState([<input className="border border-black" id="0" />])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            //console.log(`Key pressed: ${event.key}`)

            if (event.key === 'Escape') {
                //console.log('Escape key pressed!')
                // Add your logic here
            }

            if (event.key === 'Enter') {
                const rowsLength = rows.length
                setRows((prev) => [...prev, ''])

                const temp = <input className="border border-black" autoFocus id={inputFields.length.toString()} />
                setInputFields((prev) => {
                    console.log([...prev, temp])
                    return [...prev, temp]
                })
                console.log(temp, inputFields)
            }

            if (event.key === 'Backspace') {
                const focusedElement = document.activeElement
                console.log(focusedElement)
                if (focusedElement) {
                    const index = focusedElement.id
                    setInputFields(inputFields.toSpliced(parseInt(index), 1))
                }
            }
        }

        // Add event listener on mount
        window.addEventListener('keydown', handleKeyDown)

        // Clean up on unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, []) // Empty dependency array means this runs once on mount

    const updateRow = (value: string, index: number) => {
        const temp = [...rows]
        temp[index] = value
        setRows(temp)
        console.log(temp)
    }

    return (
        <main className="w-screen mt-32">
            {inputFields.map((row, index: number) => (
                <div key={index}>{row}</div>
            ))}
        </main>
    )
}
