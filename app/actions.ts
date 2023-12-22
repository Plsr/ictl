"use server";

import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export const createResource = async (payload: any) => {
  const supabase = createServerActionClient<Database>({ cookies });

  const { consumeTime, ...rest } = payload;
  const { data, error } = await supabase
    .from("resource")
    .insert({ consume_time_seconds: consumeTime, ...rest })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
