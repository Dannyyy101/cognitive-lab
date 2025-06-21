import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { BaseLearnedExercise, Learned } from '@/types/models/exercise'
import { BaseSubjectWithExercises, Subject } from '@/types/models/subject'

export async function GET(request: NextRequest, { params }: { params: Promise<{ subjectId: string }> }) {
    const subjectId = parseInt((await params).subjectId)
    const supabase = await createClient()
    const userResponse = await supabase.auth.getUser()
    const user = userResponse.data.user

    if (!user) return NextResponse.json({ message: 'No valid user session' }, { status: 401 })

    const { data, error } = await supabase
        .from('subjects')
        .select(
            `
    *,exercises:exercises(*, learned:learnedExercises(*)),
    children:subjects(*, exercises:exercises(*, learned:learnedExercises(*)))
  `
        )
        .eq('id', subjectId)
        .single()

    if (error) return NextResponse.json({ message: error.message, status: 500 })

    const filteredData = {
        ...data,
        exercises: data.exercises?.map((exercise: BaseLearnedExercise) => ({
            ...exercise,
            learned: exercise.learned?.filter((l: Learned) => l.userId === user?.id).length > 0,
        })),
        children: data.children?.map((child: BaseSubjectWithExercises) => ({
            ...child,
            exercises: child.exercises?.map((exercise: BaseLearnedExercise) => ({
                ...exercise,
                learned: exercise.learned?.filter((l: Learned) => l.userId === user?.id).length > 0,
            })),
        })),
    }
    return NextResponse.json(filteredData)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ subjectId: string }> }) {
    const subjectId = parseInt((await params).subjectId)
    const { children: _children, exercises: _exercises, id: _id, ...subject } = (await request.json()) as Subject
    const supabase = await createClient()

    const { error } = await supabase.from('subjects').update(subject).eq('id', subjectId)
    if (error) return NextResponse.json({ message: error.message }, { status: 500 })

    return NextResponse.json({ message: 'Updated' }, { status: 200 })
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ subjectId: string }> }) {
    const subjectId = parseInt((await params).subjectId)
    const supabase = await createClient()

    const { data } = await supabase.from('exercises').select().eq('subjectId', subjectId)

    if (data && data.length > 0)
        return NextResponse.json({ message: 'Cant delete Subjects still has exercises' }, { status: 409 })

    const { error } = await supabase.from('subjects').delete().eq('id', subjectId)

    if (error) return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json({ message: 'Deleted' }, { status: 200 })
}
