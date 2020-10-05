import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AnalyticRow from "./AnalyticRow";
import GraphPropertyAnalytics from "./GraphPropertyAnalytics";
import GraphPropertyAnalyticsBars from "./GraphPropertyAnalyticsBars";
import { parseISO, isToday, isYesterday, differenceInDays } from "date-fns";

type AnalyticRaw = {
  day: string;
  count: number;
};

type AnalyticRawDate = {
  day: Date;
  count: number;
};

type AnalyticRow = {
  today: number;
  yesterday: number;
  last7Days: number;
  last15Days: number;
  last30Days: number;
  last180Days: number;
};

type AnalyticTabsProps = {
  sessions: AnalyticRow;
  users: AnalyticRow;
  leads: AnalyticRow;
  visitsRaw: AnalyticRaw[];
  leadsRaw: AnalyticRaw[];
  usersRaw: AnalyticRaw[];
};

const splitRawData = (raw: AnalyticRaw[]) => {
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

export default function AnalyticTabs({
  sessions,
  users,
  leads,
  visitsRaw,
  leadsRaw,
  usersRaw,
}: AnalyticTabsProps) {
  let location: { state: { tab: string | undefined } } = useLocation();
  let initialTab = location.state && location.state.tab;
  const [tab, selectTab] = useState(initialTab || "7DAYS");

  const notSelected =
    "px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-indigo-600 focus:bg-indigo-50";
  const selected =
    "px-3 py-2 font-medium text-sm leading-5 rounded-md text-indigo-700 bg-indigo-100 focus:outline-none focus:text-indigo-800 focus:bg-indigo-200";

  const [
    visitsRawToday,
    visitsRawYesterday,
    visitsRawLast7Days,
    visitsRawLast15Days,
    visitsRawLast30Days,
    visitsRawLast180Days,
  ] = splitRawData(visitsRaw);

  const [
    leadsRawToday,
    leadsRawYesterday,
    leadsRawLast7Days,
    leadsRawLast15Days,
    leadsRawLast30Days,
    leadsRawLast180Days,
  ] = splitRawData(leadsRaw);

  const [
    usersRawToday,
    usersRawYesterday,
    usersRawLast7Days,
    usersRawLast15Days,
    usersRawLast30Days,
    usersRawLast180Days,
  ] = splitRawData(usersRaw);

  return (
    <div>
      <div>
        <div className="sm:hidden">
          <select
            aria-label="Selected tab"
            className="form-select block w-full"
          >
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 Days</option>
            <option>Last 15 Days</option>
            <option>Last 30 Days</option>
            <option>Last 6 Months</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex">
            <button
              className={`${tab === "TODAY" ? selected : notSelected}`}
              onClick={() => selectTab("TODAY")}
            >
              Today
            </button>
            <button
              className={`ml-4 ${tab === "YESTERDAY" ? selected : notSelected}`}
              onClick={() => selectTab("YESTERDAY")}
            >
              Yesterday
            </button>
            <button
              className={`ml-4 ${tab === "7DAYS" ? selected : notSelected}`}
              aria-current="page"
              onClick={() => selectTab("7DAYS")}
            >
              Last 7 Days
            </button>
            <button
              className={`ml-4 ${tab === "15DAYS" ? selected : notSelected}`}
              aria-current="page"
              onClick={() => selectTab("15DAYS")}
            >
              Last 15 Days
            </button>
            <button
              className={`ml-4 ${tab === "30DAYS" ? selected : notSelected}`}
              aria-current="page"
              onClick={() => selectTab("30DAYS")}
            >
              Last 30 Days
            </button>
            <button
              className={`ml-4 ${tab === "180DAYS" ? selected : notSelected}`}
              aria-current="page"
              onClick={() => selectTab("180DAYS")}
            >
              Last 6 Months
            </button>
          </nav>
        </div>
      </div>

      {tab === "TODAY" && (
        <>
          <AnalyticRow
            sessions={sessions.today}
            users={users.today}
            leads={leads.today}
          />
          <GraphPropertyAnalyticsBars
            visitsRaw={visitsRawToday}
            leadsRaw={leadsRawToday}
            usersRaw={usersRawToday}
            days={1}
          />
        </>
      )}
      {tab === "YESTERDAY" && (
        <>
          <AnalyticRow
            sessions={sessions.yesterday}
            users={users.yesterday}
            leads={leads.yesterday}
          />
          <GraphPropertyAnalytics
            visitsRaw={visitsRawYesterday}
            leadsRaw={leadsRawYesterday}
            usersRaw={usersRawYesterday}
            days={2}
          />
        </>
      )}
      {tab === "7DAYS" && (
        <>
          <AnalyticRow
            sessions={sessions.last7Days}
            users={users.last7Days}
            leads={leads.last7Days}
          />
          <GraphPropertyAnalytics
            visitsRaw={visitsRawLast7Days}
            leadsRaw={leadsRawLast7Days}
            usersRaw={usersRawLast7Days}
            days={7}
          />
        </>
      )}
      {tab === "15DAYS" && (
        <>
          <AnalyticRow
            sessions={sessions.last15Days}
            users={users.last15Days}
            leads={leads.last15Days}
          />
          <GraphPropertyAnalytics
            visitsRaw={visitsRawLast15Days}
            leadsRaw={leadsRawLast15Days}
            usersRaw={usersRawLast15Days}
            days={15}
          />
        </>
      )}
      {tab === "30DAYS" && (
        <>
          <AnalyticRow
            sessions={sessions.last30Days}
            users={users.last30Days}
            leads={leads.last30Days}
          />
          <GraphPropertyAnalytics
            visitsRaw={visitsRawLast30Days}
            leadsRaw={leadsRawLast30Days}
            usersRaw={usersRawLast30Days}
            days={30}
          />
        </>
      )}
      {tab === "180DAYS" && (
        <>
          <AnalyticRow
            sessions={sessions.last180Days}
            users={users.last180Days}
            leads={leads.last180Days}
          />
          <GraphPropertyAnalytics
            visitsRaw={visitsRawLast180Days}
            leadsRaw={leadsRawLast180Days}
            usersRaw={usersRawLast180Days}
            days={180}
          />
        </>
      )}
    </div>
  );
}
