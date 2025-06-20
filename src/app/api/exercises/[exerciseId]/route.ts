import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ exerciseId: string }> }) {
    const exerciseId = parseInt((await params).exerciseId)
    const supabase = await createClient()

    const { error } = await supabase.from('exercises').delete().eq('id', exerciseId)

    if (error) return NextResponse.json({ message: error.message }, { status: 500 })

    return NextResponse.json({ message: 'Deleted' }, { status: 200 })
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ exerciseId: string }> }) {
    const exerciseId = parseInt((await params).exerciseId)
    const body = await request.json()
    const supabase = await createClient()

    const { error } = await supabase.from('exercises').update(body).eq('id', exerciseId)

    if (error) return NextResponse.json({ message: error.message }, { status: 500 })

    return NextResponse.json({ message: 'Updated' }, { status: 200 })
}