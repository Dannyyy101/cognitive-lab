import { Loading } from '@/components/Loading'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Subject } from '@/types/models/subject'
import { useRefreshStore } from '@/hooks/useRefreshStore'
interface SubjectProviderProps {
    children: React.ReactNode
    subjectId?: string
}

interface SubjectContextType {
    subject: Subject
    setSubject: (subject: Subject) => void
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined)

export const SubjectProvider: React.FC<SubjectProviderProps> = ({ children, subjectId }) => {
    const [subject, setSubject] = useState<Subject | null>(null)
    const { shouldRefresh, clearRefresh } = useRefreshStore()

    useEffect(() => {
        if (subjectId) {
            try {
                fetch(`/api/subjects/${subjectId}`).then((response) => {
                    if (response.ok) {
                        response.json().then((result) => {
                            setSubject(result)
                        })
                    } else {
                        response.json().then((error) => {
                            throw new Error(error.message)
                        })
                    }
                })
            } catch (error) {
                console.error('Failed to fetch subject:', error)
            } finally {
                if (shouldRefresh) {
                    clearRefresh()
                }
            }
        } else {
            setSubject({
                id: -1,
                parent: null,
                name: '',
                exercises: [],
                children: [],
                primaryColor: '#fff',
                secondaryColor: '#fff',
                created_at: new Date().toDateString(),
            })
        }
    }, [subjectId, shouldRefresh])

    if (!subject) return <Loading />

    return <SubjectContext.Provider value={{ subject, setSubject }}>{children}</SubjectContext.Provider>
}

export const useSubject = () => {
    const context = useContext(SubjectContext)
    if (context === undefined) {
        throw new Error('useSubject must be used within an SubjectProvider')
    }
    return context
}
