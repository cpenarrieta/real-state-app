import { AnalyticRawDate } from "../types";

export const sumData = (raw: AnalyticRawDate[]) => {
  let sum = 0;
  if (raw && raw.length >= 0) {
    raw.forEach((r) => {
      sum += r.count;
    });

    return sum;
  }

  return 0;
};
