"use client";

import { convertDurationComparisonOperatorToSymbol } from "@/utils/durationComparison";
import { BookmarksFilter } from "@/utils/getFilterFromSearchParams";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  filters: BookmarksFilter;
};

// TODO: Optimistic UI updates for removing the filter
export const ActiveFiltersList = ({ filters }: Props) => {
  if (!filters) {
    return null;
  }

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterClick = (filterName: string) => {
    const params = new URLSearchParams(searchParams);
    const paramFilterName = `filter.${filterName}`;

    if (!params.has(paramFilterName)) {
      return;
    }

    params.delete(paramFilterName);

    if (filterName === "duration") {
      params.delete("filter.durationMode");
    }

    router.replace("/?" + params.toString());
  };

  return (
    <div className="gap-2 flex">
      {Object.entries(filters).map((activeFilter) => {
        const filterName = activeFilter[0];
        const filterValue = activeFilter[1];

        if (!filterValue) {
          return null;
        }

        if (filterName === "duration" && filterValue) {
          const durationTimeValue = Object.values(filterValue)[0];
          const durationComparisonOperator = Object.values(filterValue)[1];

          if (!durationTimeValue || !durationComparisonOperator) {
            return;
          }

          return (
            <DurationActiveFilter
              onClick={() => handleFilterClick("duration")}
              durationTimeValue={parseInt(durationTimeValue)}
              durationComparisonOperator={durationComparisonOperator}
            />
          );
        }

        return (
          <ActiveFilter
            onClick={() => handleFilterClick(filterName)}
            name={filterName}
            value={filterValue as string}
          />
        );
      })}
    </div>
  );
};

type ActiveFilterProps = {
  name: string;
  value: string;
  onClick: () => void;
};

const ActiveFilter = ({ name, value, onClick }: ActiveFilterProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-neutral-900 borderf flex items-center gap-1 border-neutral-700 border rounded-lg px-4 py-1 group hover:border-neutral-600 hover:bg-neutral-800"
    >
      <span>
        {name}: {value}
      </span>
      <span className="hidden group-hover:block">
        <XMarkIcon className="h-3 w-3" />
      </span>
    </div>
  );
};

type DurationActiveFilterProps = {
  durationTimeValue: number;
  durationComparisonOperator: string;
  onClick: () => void;
};

const DurationActiveFilter = ({
  durationTimeValue,
  durationComparisonOperator,
  onClick,
}: DurationActiveFilterProps) => {
  const durationComparisonSymbol = convertDurationComparisonOperatorToSymbol(
    durationComparisonOperator
  );

  return (
    <ActiveFilter
      name="Duration"
      value={durationComparisonSymbol + " " + durationTimeValue / 60 + "min"}
      onClick={onClick}
    />
  );
};
