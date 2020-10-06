import { parseISO, isToday, isYesterday, differenceInDays } from "date-fns";
import { AnalyticRaw, AnalyticRawDate } from "../types";

export const splitRawData = (raw: AnalyticRaw[]) => {
  const today = new Date();

  let rawToday: AnalyticRawDate[] = [];
  let rawYesterday: AnalyticRawDate[] = [];
  let rawLast7Days: AnalyticRawDate[] = [];
  let rawLast15Days: AnalyticRawDate[] = [];
  let rawLast30Days: AnalyticRawDate[] = [];
  let rawLast180Days: AnalyticRawDate[] = [];

  raw.forEach((a) => {
    const d = parseISO(a.day.slice(0, 10));
    const newObj = { day: d, count: a.count };

    rawLast180Days.push(newObj);
    if (isToday(d)) {
      rawToday.push(newObj);
      rawYesterday.push(newObj);
    }
    if (isYesterday(d)) {
      rawYesterday.push(newObj);
    }
    if (differenceInDays(today, d) <= 7) {
      rawLast7Days.push(newObj);
    }
    if (differenceInDays(today, d) <= 15) {
      rawLast15Days.push(newObj);
    }
    if (differenceInDays(today, d) <= 30) {
      rawLast30Days.push(newObj);
    }
  });

  return [
    rawToday,
    rawYesterday,
    rawLast7Days,
    rawLast15Days,
    rawLast30Days,
    rawLast180Days,
  ];
};
