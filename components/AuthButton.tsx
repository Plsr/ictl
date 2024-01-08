import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  createServerComponentClient,
  createServerActionClient,
} from "@supabase/auth-helpers-nextjs";

export default async function AuthButton() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
