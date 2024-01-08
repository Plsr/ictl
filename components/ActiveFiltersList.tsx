"use client";

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

  // TODO: Refactor this ugly piece of trash, my god
  return (
    <>
      {Object.entries(filters).map((activeFilter) => {
        if (activeFilter[0] === "duration" && activeFilter[1]) {
          const durationTimeValue = Object.values(activeFilter[1])[0];

          if (!durationTimeValue) {
            return;
          }

          const durationComparisonOperator = Object.values(activeFilter[1])[1];

          let durationComparisonSymbol: string;
          switch (durationComparisonOperator) {
            case "gte":
              durationComparisonSymbol = ">=";
              break;
            case "gt":
              durationComparisonSymbol = ">";
              break;
            case "lte":
              durationComparisonSymbol = "<=";
              break;
            case "lt":
              durationComparisonSymbol = "<";
              break;
            default:
              durationComparisonSymbol = "=";
          }

          return (
            <ActiveFilter
              name={activeFilter[0]}
              value={
                durationComparisonSymbol +
                " " +
                parseInt(durationTimeValue) / 60 +
                "min"
              }
            />
          );
        }

        if (!activeFilter[1]) {
          return null;
        }

        return (
          <ActiveFilter
            name={activeFilter[0]}
            value={activeFilter[1] as string}
          />
        );
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
