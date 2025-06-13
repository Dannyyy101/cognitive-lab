'use client'
import { HexColorPicker } from 'react-colorful'
import React, { useState } from 'react'
import { PopUpView } from '@/components/PopUpView'
import { Button } from '@/components/ui/button/Button'

interface ColorPickerProps {
    name: string
    color?: string
    onChange: (color: string) => void
}

export const ColorPicker = ({ name, onChange }: ColorPickerProps) => {
    const [color, setColor] = useState<string>('#aabbcc')
    const [show, setShow] = useState<boolean>(false)

    const handleColorChange = (color: string) => {
        setColor(color)
        onChange(color)
    }

    return (
        <div className={'flex flex-col'}>
            <label>{name}</label>
            <button
                className={`rounded-full h-8 w-8`}
                style={{ backgroundColor: color }}
                onClick={() => setShow(!show)}
            ></button>
            {show && (
                <PopUpView handlePopUpClose={() => setShow(false)}>
                    <div className={'flex flex-col p-4'}>
                        <HexColorPicker color={color} onChange={handleColorChange} />
                        <Button onClick={() => setShow(false)} className={'mt-4'} variant={'secondary'}>
                            Speichern
                        </Button>
                    </div>
                </PopUpView>
            )}
        </div>
    )
}
