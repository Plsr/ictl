import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { CreateResourceForm } from "@/components/CreateResourceForm";
import { Database } from "@/types/supabase";
import { ResourceListItem } from "@/components/ResourceListItem";
import React from "react";
import { AddNewResourceButton } from "@/components/AddNewResourceButton";
import Link from "next/link";
import {
  BookmarksFilter,
  getFilterFromSearchParams,
} from "@/utils/getFilterFromSearchParams";
import { ResourceFilters } from "@/components/ResourceFilters";

type TypeFilterParams = "article" | "video" | "all";

const getData = async (filter: BookmarksFilter) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  let query = supabase.from("resource").select("*").eq("consumed", false);

  if (filter?.type) {
    query = query.eq("type", filter.type);
  }

  if (filter?.title) {
    query = query.textSearch("title", `${filter.title}`);
  }

  if (filter?.duration) {
    switch (filter.duration.mode) {
      case "eq":
        query = query.eq("consume_time_seconds", filter.duration.time);
        break;
      case "lt":
        query = query.lt("consume_time_seconds", filter.duration.time);
        break;
      case "gt":
        query = query.gt("consume_time_seconds", filter.duration.time);
        break;
      case "lte":
        query = query.lte("consume_time_seconds", filter.duration.time);
        break;
      case "gte":
        query = query.gte("consume_time_seconds", filter.duration.time);
        break;
    }
  }

  const { data } = await query;

  return data;
};

export default async function Index({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const showModal = Object.hasOwn(searchParams, "showAddModal");
  const resourceTypeFilter = (searchParams["filterType"] ||
    "all") as TypeFilterParams;
  const cookieStore = cookies();

  const filter = getFilterFromSearchParams(searchParams);

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

  const data = await getData(filter);

  return (
    <div className="flex-1 w-[800px] flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      <div className="mt-6 mb-12 flex flex-row w-full justify-between">
        <ResourceFilters />
        <AddNewResourceButton />
      </div>
      {showModal && <CreateResourceForm />}
      <div className="flex flex-col gap-y-8 justify-start w-full">
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
