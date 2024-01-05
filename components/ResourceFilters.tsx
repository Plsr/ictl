"use client";

import { Select } from "./Select";
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

const durationComparisonOperatorOptions = [
  { name: "=", value: "eq" },
  { name: "<", value: "lt" },
  { name: "<=", value: "lte" },
  { name: ">", value: "gt" },
  { name: ">", value: "gte" },
];

const schema = z.object({
  type: z.enum(["all", "article", "video"]),
  durationComparisonOperator: z.enum(["eq", "gt", "gte", "lt", "lte"]),
  duration: z.string().optional(),
});

export const ResourceFilters = () => {
  const { handleSubmit, control, register } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      type: typeFilterOptions[0].value,
      durationComparisonOperator: durationComparisonOperatorOptions[0].value,
      duration: undefined,
    },
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

    if (data.duration) {
      console.log("have duration");
      // TODO: Handle duration filtering
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select
        control={control}
        defaultValue={defautlTypeFilter || typeFilterOptions[0]}
        name="type"
        values={typeFilterOptions}
      />
      <Select
        control={control}
        defaultValue={durationComparisonOperatorOptions[0]}
        name="durationComparisonOperator"
        values={durationComparisonOperatorOptions}
      />
      <input {...register("duration")} />
      <input type="submit" />
    </form>
  );
};
