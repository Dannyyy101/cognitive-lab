import { getUserById } from "@/actions/userActions";
import Image from "next/image";
import { SignOutButton } from "./SignOutButton";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  const user = await getUserById(userId);

  return (
    <main className="w-screen h-screen flex">
      <section className="mt-32 w-96 flex flex-col items-center">
        {user?.photoUrl && (
          <Image
            className="rounded-full "
            src={user?.photoUrl}
            width={64}
            height={64}
            alt="profile-image"
          />
        )}
        <h1 className="text-2xl font-semibold">{user?.displayName}</h1>
        <p className="text-fgColor_disabled">{user?.email}</p>
        <SignOutButton />
      </section>
    </main>
  );
}
