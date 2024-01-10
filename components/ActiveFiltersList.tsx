"use client";

import { convertDurationComparisonOperatorToSymbol } from "@/utils/durationComparison";
import { BookmarksFilter } from "@/utils/getFilterFromSearchParams";

type Props = {
  filters: BookmarksFilter;
};

// TODO: On click, remove the selected filter from the query params
// Should this be done here or in the page?
export const ActiveFiltersList = ({ filters }: Props) => {
  if (!filters) {
    return null;
  }

  return (
    <>
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
              durationTimeValue={parseInt(durationTimeValue)}
              durationComparisonOperator={durationComparisonOperator}
            />
          );
        }

        return <ActiveFilter name={filterName} value={filterValue as string} />;
      })}
    </>
  );
};

type ActiveFilterProps = {
  name: string;
  value: string;
};

// TODO: Styling
const ActiveFilter = ({ name, value }: ActiveFilterProps) => {
  return (
    <div>
      {name}: {value}
    </div>
  );
};

type DurationActiveFilterProps = {
  durationTimeValue: number;
  durationComparisonOperator: string;
};

const DurationActiveFilter = ({
  durationTimeValue,
  durationComparisonOperator,
}: DurationActiveFilterProps) => {
  const durationComparisonSymbol = convertDurationComparisonOperatorToSymbol(
    durationComparisonOperator
  );

  return (
    <ActiveFilter
      name="Duration"
      value={durationComparisonSymbol + " " + durationTimeValue / 60 + "min"}
    />
  );
};
