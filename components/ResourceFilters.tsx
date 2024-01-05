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

type DurationComparisonOperatorOption = {
  name: string;
  value: z.infer<typeof schema>["durationComparisonOperator"];
};

const typeFilterOptions: TypeFilterOption[] = [
  { name: "All", value: "all" },
  { name: "Articles", value: "article" },
  { name: "Videos", value: "video" },
];

const durationComparisonOperatorOptions: DurationComparisonOperatorOption[] = [
  { name: "=", value: "eq" },
  { name: "<", value: "lt" },
  { name: "<=", value: "lte" },
  { name: ">", value: "gt" },
  { name: ">", value: "gte" },
];

const schema = z.object({
  type: z.enum(["all", "article", "video"]),
  durationComparisonOperator: z.enum(["eq", "gt", "gte", "lt", "lte"]),
  duration: z.number().optional(),
});

type FormData = z.infer<typeof schema>;

export const ResourceFilters = () => {
  const { handleSubmit, control, register } = useForm<FormData>({
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

  const onSubmit = (data: FormData) => {
    const params = new URLSearchParams(searchParams);
    params.set("filter.type", data.type);

    if (data.duration) {
      const durationComparisonOperator = data.durationComparisonOperator;
      const duration = data.duration;
      params.set("filter.duration", (duration * 60).toString());
      params.set("filter.durationMode", durationComparisonOperator);
    }

    router.replace("/" + "?" + params.toString());
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
      <input
        className="text-black"
        {...register("duration", {
          valueAsNumber: true,
        })}
      />
      <input type="submit" />
    </form>
  );
};
