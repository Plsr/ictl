const allowedDurationFilterModes = ["eq", "lte", "gte", "gt", "lt"] as const;
const allowedTypeFilters = ["article", "video"] as const;

type TypeFilterParams = (typeof allowedTypeFilters)[number];
type DurationFilterMode = (typeof allowedDurationFilterModes)[number];

export type BookmarksFilter = ReturnType<typeof getFilterFromSearchParams>;

export const getFilterFromSearchParams = (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  if (!searchParams) {
    return null;
  }

  const typeFilterParam = searchParams["filter.type"];

  const typeFilter = typeFilterParam
    ? allowedTypeFilters.find((typeFilter) => typeFilter === typeFilterParam)
    : undefined;

  const titleFilter = searchParams["filter.title"] as string;

  const durationFilterTime = searchParams["filter.duration"] as string;
  const durationFilterMode = searchParams["filter.durationMode"]
    ? allowedDurationFilterModes.find((el) => {
        return el == (searchParams["filter.durationMode"] as string);
      })
    : "eq";

  return {
    type: typeFilter,
    title: titleFilter,
    duration: durationFilterTime
      ? {
          time: durationFilterTime,
          mode: durationFilterMode,
        }
      : undefined,
  };
};
