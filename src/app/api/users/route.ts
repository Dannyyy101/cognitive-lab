import { NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
    const supabaseAdmin = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabaseAdmin.auth.admin.listUsers()
    const users = data.users.map((user) => user.user_metadata)
    const userIds = users.map((user) => user.sub)

    const supabase = await createClient()

    const { data: roles, error: rolesError } = await supabase
        .from('userWithRoles')
        .select()
        .filter('userId', 'in', `(${userIds.join(', ')})`)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!roles || rolesError)
        return NextResponse.json({ message: `Error loading roles ${rolesError?.message}` }, { status: 500 })

    const userWithRoles = users.map((user) => ({
        ...user,
        roles: roles.filter((role) => role.userId === user.sub).map((item) => item.role),
    }))

    return NextResponse.json(userWithRoles)
}
