'use client'

import { supabase } from '@/lib/supabase/client'
import { BACKEND_URL } from '@/utils/constants'

export const SignOutButton = () => {
    const handleSignOut = async () => {
        console.log('dadadad', BACKEND_URL)
        const response = await fetch(BACKEND_URL + '/auth/signout', { method: 'POST' })
        await supabase.auth.signOut()
        if (response.ok) {
            window.location.href = '/'
        }
    }

    return (
        <button onClick={handleSignOut} className="w-32 h-10 bg-bgColor_danger_muted text-fgColor_danger rounded-md">
            Sign out
        </button>
    )
}
