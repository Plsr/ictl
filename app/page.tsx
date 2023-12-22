import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { CreateResourceForm } from "@/components/CreateResourceForm";
import { Database } from "@/types/supabase";
import { format } from "date-fns";

const getData = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { data } = await supabase.from("resource").select("*");

  return data;
};

export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  const data = await getData();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      <CreateResourceForm />
      <div className="flex flex-col gap-y-8 justify-start">
        {data?.map((resource) => (
          <div key={resource.id}>
            <p>{resource.type}</p>
            <p>
              <a target="_blank" href={resource.link}>
                {resource.title}
              </a>
            </p>
            <p>
              {format(resource.created_at, "do MMM, yyyy")} -{" "}
              {resource.consume_time_seconds
                ? resource.consume_time_seconds / 60.0
                : ""}
              min
            </p>
            <p>{resource.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
