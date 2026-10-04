import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import { ProfileEditor } from "@/components/ProfileEditor";
import { SignOutButton } from "@/components/SignOutButton";

export const metadata = { title: "Your profile · For a Reason" };

export default async function ProfilePage() {
  let user: any = null, profile: any = null;
  try {
    const supabase = await supabaseServer();
    const { data } = await supabase.auth.getUser();
    user = data.user;
    if (user) {
      const { data: p } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      profile = p;
    }
  } catch {}

  if (!user) {
    return (
      <section className="mx-auto max-w-md space-y-4 text-center">
        <h1 className="font-read text-2xl font-bold">You&apos;re not signed in</h1>
        <Link href="/signin" className="inline-block rounded-lg bg-delft px-4 py-2 font-semibold text-white">Sign in</Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-read text-2xl font-bold">Your profile</h1>
        <SignOutButton />
      </div>
      <ProfileEditor userId={user.id} email={user.email ?? ""} initial={profile} />
    </section>
  );
}
