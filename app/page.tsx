import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { CreateResourceForm } from "@/components/CreateResourceForm";
import { Database } from "@/types/supabase";
import { ResourceListItem } from "@/components/ResourceListItem";
import React from "react";
import { AddNewResourceButton } from "@/components/AddNewResourceButton";

const getData = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { data } = await supabase
    .from("resource")
    .select("*")
    .eq("consumed", false);

  return data;
};

export default async function Index({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const showModal = Object.hasOwn(searchParams, "showAddModal");
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
      <AddNewResourceButton />
      {/* TODO: Should be in a modal */}
      {showModal && <CreateResourceForm />}
      <div className="flex flex-col gap-y-8 justify-start">
        {data?.map((resource) => (
          <React.Fragment key={resource.id}>
            <ResourceListItem resource={resource} />
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
