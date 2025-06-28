
import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: Promise<{ exerciseId: string }> }) {
    const exerciseId = parseInt((await params).exerciseId)
    const body = await request.json()
    const supabase = await createClient()
    const currentUser = await supabase.auth.getUser()

    if (!currentUser.data.user) return NextResponse.json({ message: "Invalid auth session" }, { status: 400 })

    const learned = { userId: currentUser.data.user.id, exerciseId: exerciseId, correct: body.correct }

    const exist = await supabase.from("learnedExercises").select().eq("userId", currentUser.data.user.id).eq("exerciseId", exerciseId).maybeSingle()

    if (exist.data) {
        await supabase.from("learnedExercises").update({ correct: body.correct }).eq("id", exist.data?.id)
        return NextResponse.json({ message: 'Updatet' }, { status: 200 })
    }

    const { error } = await supabase.from('learnedExercises').insert(learned)

    if (error) return NextResponse.json({ message: error.message }, { status: 500 })

    return NextResponse.json({ message: 'Created' }, { status: 201 })
}