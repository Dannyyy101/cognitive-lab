import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'
import { Exercise } from '@/types/models/exercise'

export async function GET(req: NextRequest) {
    const supabase = await createClient()

    const { searchParams } = new URL(req.url)
    const subjectIds = searchParams.get('subjectIds')

    if (!subjectIds) return NextResponse.json({ message: 'Missing subject ids' }, { status: 400 })

    const formatedSubjectIds = '(' + subjectIds + ')'

    const { data, error } = await supabase.from('exercises').select().filter('subjectId', 'in', formatedSubjectIds)

    return NextResponse.json({ data, error })
}

export async function POST(req: NextRequest) {
    const supabase = await createClient()

    const body: Exercise = await req.json()

    if (!body) return NextResponse.json({ message: 'Missing exercise body' }, { status: 400 })

    const { id: _id, learned: _learned, ...exerciseWithoutId } = body

    const { data, error } = await supabase.from('exercises').insert(exerciseWithoutId).select().single()
    console.log(error)
    if (!data || error)
        return NextResponse.json({ message: `Error creating exercise ${error?.message}` }, { status: 500 })

    return NextResponse.json({ id: data.id }, { status: 201 })
}
