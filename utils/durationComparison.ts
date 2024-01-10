export const convertDurationComparisonOperatorToSymbol = (operator: string) => {
  switch (operator) {
    case "gte":
      return ">=";
    case "gt":
      return ">";
    case "lte":
      return "<=";
    case "lt":
      return "<";
    default:
      return "=";
  }
};
