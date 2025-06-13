import Image from 'next/image'
import { SignOutButton } from './SignOutButton'
import { DeleteLearningProgress } from '@/app/users/[userId]/DeleteLearningProgress'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    const user = data.user

    if (!user) {
        redirect('/auth')
    }

    return (
        <main className="w-screen h-screen flex">
            <section className="mt-32 w-96 flex flex-col items-center">
                {user.user_metadata.profileImage && (
                    <Image
                        className="rounded-full "
                        src={user.user_metadata.profileImage}
                        width={64}
                        height={64}
                        alt="profile-image"
                    />
                )}
                <h1 className="text-2xl font-semibold">
                    {user.user_metadata.firstName} {user.user_metadata.lastName}
                </h1>
                <p className="text-fgColor_disabled">{user.email}</p>
                <SignOutButton />
                <DeleteLearningProgress />
            </section>
        </main>
    )
}
