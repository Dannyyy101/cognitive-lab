'use client'

import { useState } from 'react'
import { usePopUpClose } from '@/context/PopUpContext'
import { ColorPicker } from '@/components/ColorPicker'
import { Button } from '@/components/ui/button/Button'
import { Subject } from '@/types/models/subject'
import { DEFAULT_SUBJECT } from '@/utils/constants'

interface CreateSubjectViewProps {
    selectColor?: boolean
    defaultColor?: { primaryColor: string; secondaryColor: string }
    parentId?: number | null
    handleAddSubject: (subject: Subject) => void
}

export const CreateSubjectView: React.FC<CreateSubjectViewProps> = ({
    parentId = null,
    handleAddSubject,
    defaultColor,
    selectColor = true,
}) => {
    const [subject, setSubject] = useState<Subject>({
        ...DEFAULT_SUBJECT,
        parent: parentId,
        primaryColor: defaultColor?.primaryColor || '#fff',
        secondaryColor: defaultColor?.secondaryColor || '#fff',
    })
    const handlePopClose = usePopUpClose()

    const handleCreateSubject = async () => {
        const response = await fetch('/api/subjects', { method: 'POST', body: JSON.stringify(subject) })
        if (response.ok) {
            const data = await response.json()
            handleAddSubject({ ...subject, id: data.id })
            handlePopClose()
        }
    }

    return (
        <div className={'w-96 h-[500px] p-6 flex flex-col'}>
            <h1 className={'text-3xl text-fgColor_default'}>Create Curriculum</h1>
            <label className={'mt-4'}>Name</label>
            <input
                className={'w-full h-10 pl-2 rounded-md border border-black'}
                value={subject.name}
                onChange={(e) => setSubject({ ...subject, name: e.target.value })}
            />
            <label className={'mt-2'}>Beschreibung</label>
            <textarea className={'border border-black rounded-md resize-none pl-2'}></textarea>
            {selectColor && (
                <section className={'mt-2'}>
                    <ColorPicker
                        name={'PrimaryColor'}
                        onChange={(e) => setSubject({ ...subject, primaryColor: e })}
                    ></ColorPicker>
                    <ColorPicker
                        name={'SecondaryColor'}
                        onChange={(e) => setSubject({ ...subject, secondaryColor: e })}
                    ></ColorPicker>
                </section>
            )}
            <Button onClick={handleCreateSubject} variant={'primary'} className={'mt-4'}>
                Erstellen
            </Button>
        </div>
    )
}
