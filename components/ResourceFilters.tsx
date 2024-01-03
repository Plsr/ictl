"use client";

import { useState } from "react";
import { ResrouceTypeFilter } from "./ResourceTypeFilter";
import { useRouter, useSearchParams } from "next/navigation";

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

// TODO: Should be a react-hook-form
export const ResourceFilters = () => {
  const [selectedType, setSelectedType] = useState(typeFilterOptions[0]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTypeFilterChange = (type: TypeFilterOption) => {
    // TODO: Should be unnecessary when filter is inferred from searchParams
    setSelectedType(type);
    const params = new URLSearchParams(searchParams);
    params.set("filter.type", type.value);
    router.replace("/" + "?" + params.toString());
  };

  // TODO: Prefill based on existing params
  return (
    <ResrouceTypeFilter
      onChange={handleTypeFilterChange}
      value={selectedType}
      values={typeFilterOptions}
    />
  );
};
