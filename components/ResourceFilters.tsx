"use client";

import { ResrouceTypeFilter } from "./ResourceTypeFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type TypeFilter = "all" | "article" | "video";

export type TypeFilterOption = {
  name: string;
  value: TypeFilter;
};

const typeFilterOptions: TypeFilterOption[] = [
  { name: "All", value: "all" },
  { name: "Articles", value: "article" },
  { name: "Videos", value: "video" },
];

const schema = z.object({
  type: z.enum(["all", "article", "video"]),
});

export const ResourceFilters = () => {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedTypeFilter = searchParams.get("filter.type");
  const defautlTypeFilter = typeFilterOptions.find(
    (option) => option.value === selectedTypeFilter
  );

  const onSubmit = (data: any) => {
    const params = new URLSearchParams(searchParams);
    params.set("filter.type", data.type);
    router.replace("/" + "?" + params.toString());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ResrouceTypeFilter
        control={control}
        defaultValue={defautlTypeFilter || typeFilterOptions[0]}
        name="type"
        values={typeFilterOptions}
      />
      <input type="submit" />
    </form>
  );
};
