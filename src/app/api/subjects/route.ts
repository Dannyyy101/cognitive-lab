import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { BaseSubjectWithChildren, BaseSubjectWithExercises, Subject } from '@/types/models/subject'
import { BaseLearnedExercise, Learned } from '@/types/models/exercise'

export async function GET() {
    const supabase = await createClient()
    const userResponse = await supabase.auth.getUser()
    const user = userResponse.data.user

    if (!user) return NextResponse.json({ message: 'No valid user session' }, { status: 401 })

    const { data, error } = await supabase
        .from('subjects')
        .select(
            `
    *,
    children:subjects(*, exercises:exercises(*, learned:learnedExercises(*)))
  `
        )
        .filter('parent', 'is', null)

    if (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

    if (!data) {
        return NextResponse.json({ message: 'Not found', status: 404 })
    }

    const filteredData = data?.map((subject: BaseSubjectWithChildren) => ({
        ...subject,
        children: subject.children?.map((child: BaseSubjectWithExercises) => ({
            ...child,
            exercises: child.exercises?.map((exercise: BaseLearnedExercise) => ({
                ...exercise,
                learned: exercise.learned?.filter((l: Learned) => l.userId === user?.id).length > 0,
            })),
        })),
    }))

    return NextResponse.json(filteredData)
}

export async function POST(req: NextRequest) {
    const { children: _children, exercises: _exercises, id: _id, ...subject } = (await req.json()) as Subject

    const supabase = await createClient()
    const { data, error } = await supabase.from('subjects').insert({ ...subject, created_at: new Date().toDateString() }).select().single()

    if (!data || error) {
        return NextResponse.json({ error: error?.message }, { status: 500 })
    }
    return NextResponse.json({ id: data.id, status: 201 })
}
