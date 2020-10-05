import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AnalyticRow from "./AnalyticRow";
import GraphSevenDays from "./GraphSevenDays";
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

  const today = new Date();

  let visitsRawToday: AnalyticRawDate[] = [];
  let visitsRawYesterday: AnalyticRawDate[] = [];
  let visitsRawLast7Days: AnalyticRawDate[] = [];
  let visitsRawLast15Days: AnalyticRawDate[] = [];
  let visitsRawLast30Days: AnalyticRawDate[] = [];
  let visitsRawLast180Days: AnalyticRawDate[] = [];

  visitsRaw.forEach((a) => {
    const d = parseISO(a.day.slice(0, 10));
    const newObj = { day: d, count: a.count };

    visitsRawLast180Days.push(newObj);
    if (isToday(d)) {
      visitsRawToday.push(newObj);
      visitsRawYesterday.push(newObj);
    }
    if (isYesterday(d)) {
      visitsRawYesterday.push(newObj);
    }
    if (differenceInDays(today, d) <= 7) {
      visitsRawLast7Days.push(newObj);
    }
    if (differenceInDays(today, d) <= 15) {
      visitsRawLast15Days.push(newObj);
    }
    if (differenceInDays(today, d) <= 30) {
      visitsRawLast30Days.push(newObj);
    }
  });

  let leadsRawToday: AnalyticRawDate[] = [];
  let leadsRawYesterday: AnalyticRawDate[] = [];
  let leadsRawLast7Days: AnalyticRawDate[] = [];
  let leadsRawLast15Days: AnalyticRawDate[] = [];
  let leadsRawLast30Days: AnalyticRawDate[] = [];
  let leadsRawLast180Days: AnalyticRawDate[] = [];

  leadsRaw.forEach((a) => {
    const d = parseISO(a.day.slice(0, 10));
    const newObj = { day: d, count: a.count };

    leadsRawLast180Days.push(newObj);
    if (isToday(d)) {
      leadsRawToday.push(newObj);
      leadsRawYesterday.push(newObj);
    }
    if (isYesterday(d)) {
      leadsRawYesterday.push(newObj);
    }
    if (differenceInDays(today, d) <= 7) {
      leadsRawLast7Days.push(newObj);
    }
    if (differenceInDays(today, d) <= 15) {
      leadsRawLast15Days.push(newObj);
    }
    if (differenceInDays(today, d) <= 30) {
      leadsRawLast30Days.push(newObj);
    }
  });


  let usersRawToday: AnalyticRawDate[] = [];
  let usersRawYesterday: AnalyticRawDate[] = [];
  let usersRawLast7Days: AnalyticRawDate[] = [];
  let usersRawLast15Days: AnalyticRawDate[] = [];
  let usersRawLast30Days: AnalyticRawDate[] = [];
  let usersRawLast180Days: AnalyticRawDate[] = [];

  usersRaw.forEach((a) => {
    const d = parseISO(a.day.slice(0, 10));
    const newObj = { day: d, count: a.count };

    usersRawLast180Days.push(newObj);
    if (isToday(d)) {
      usersRawToday.push(newObj);
      usersRawYesterday.push(newObj);
    }
    if (isYesterday(d)) {
      usersRawYesterday.push(newObj);
    }
    if (differenceInDays(today, d) <= 7) {
      usersRawLast7Days.push(newObj);
    }
    if (differenceInDays(today, d) <= 15) {
      usersRawLast15Days.push(newObj);
    }
    if (differenceInDays(today, d) <= 30) {
      usersRawLast30Days.push(newObj);
    }
  });

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
        <AnalyticRow
          sessions={sessions.today}
          users={users.today}
          leads={leads.today}
        />
      )}
      {tab === "YESTERDAY" && (
        <AnalyticRow
          sessions={sessions.yesterday}
          users={users.yesterday}
          leads={leads.yesterday}
        />
      )}
      {tab === "7DAYS" && (
        <>
          <AnalyticRow
            sessions={sessions.last7Days}
            users={users.last7Days}
            leads={leads.last7Days}
          />
          <GraphSevenDays
            visitsRaw={visitsRawLast7Days}
            leadsRaw={leadsRawLast7Days}
            usersRaw={usersRawLast7Days}
          />
        </>
      )}
      {tab === "15DAYS" && (
        <AnalyticRow
          sessions={sessions.last15Days}
          users={users.last15Days}
          leads={leads.last15Days}
        />
      )}
      {tab === "30DAYS" && (
        <AnalyticRow
          sessions={sessions.last30Days}
          users={users.last30Days}
          leads={leads.last30Days}
        />
      )}
      {tab === "180DAYS" && (
        <AnalyticRow
          sessions={sessions.last180Days}
          users={users.last180Days}
          leads={leads.last180Days}
        />
      )}
    </div>
  );
}
