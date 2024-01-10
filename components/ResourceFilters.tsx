"use client";

import { Select } from "./Select";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./Input";
import { InputLabel } from "./InputLabel";

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
  title: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

// TODO: Prefill filters based on query params
export const ResourceFilters = () => {
  const { handleSubmit, control, register } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: typeFilterOptions[0].value,
      durationComparisonOperator: durationComparisonOperatorOptions[0].value,
      duration: undefined,
      title: undefined,
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
    if (data.type) {
      params.set("filter.type", data.type);
    }

    if (data.duration) {
      const durationComparisonOperator = data.durationComparisonOperator;
      const duration = data.duration;
      params.set("filter.duration", (duration * 60).toString());
      params.set("filter.durationMode", durationComparisonOperator);
    }

    if (data.title) {
      params.set("filter.title", data.title);
    }

    router.replace("/" + "?" + params.toString());
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-row gap-6 w-full "
    >
      <Select
        control={control}
        defaultValue={defautlTypeFilter || typeFilterOptions[0]}
        name="type"
        values={typeFilterOptions}
        label={<InputLabel>Type</InputLabel>}
      />
      <div className="gap-2 flex flex-row">
        <Select
          control={control}
          defaultValue={durationComparisonOperatorOptions[0]}
          name="durationComparisonOperator"
          values={durationComparisonOperatorOptions}
          label={<InputLabel>Duration</InputLabel>}
        />
        <Input
          {...register("duration", {
            setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
          })}
        />
      </div>

      <Input {...register("title")} label={<InputLabel>Title</InputLabel>} />
      <input
        type="submit"
        value="Apply Filters"
        className="flex-grow-0 self-end py-2 px-4 bg-transparent border border-slate-500 text-slate-300 rounded-lg"
      />
    </form>
  );
};
