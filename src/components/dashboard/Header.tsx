import React, { useState } from "react";
import AnalyticRow from "./AnalyticRow";
import { AnalyticTabsProps, AnalyticRawDate } from "../../types";
import { splitRawData } from "../../util/splitRawData";

const sumData = (raw: AnalyticRawDate[]) => {
  let sum = 0;
  if (raw && raw.length >= 0) {
    raw.forEach((r) => {
      sum += r.count;
    });

    return sum;
  }

  return 0;
};

export default function Header({
  visitsRaw,
  leadsRaw,
  usersRaw,
}: AnalyticTabsProps) {
  const [tab, selectTab] = useState("7DAYS");

  const notSelected =
    "px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-indigo-600 focus:bg-indigo-50";
  const selected =
    "px-3 py-2 font-medium text-sm leading-5 rounded-md text-indigo-700 bg-indigo-100 focus:outline-none focus:text-indigo-800 focus:bg-indigo-200";

  const [visitsRawToday, visitsRawYesterday, visitsRawLast7Days] = splitRawData(
    visitsRaw
  );

  const [leadsRawToday, leadsRawYesterday, leadsRawLast7Days] = splitRawData(
    leadsRaw
  );

  const [usersRawToday, usersRawYesterday, usersRawLast7Days] = splitRawData(
    usersRaw
  );

  return (
    <div>
      <div>
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
              Last 2 Days
            </button>
            <button
              className={`ml-4 ${tab === "7DAYS" ? selected : notSelected}`}
              aria-current="page"
              onClick={() => selectTab("7DAYS")}
            >
              Last 7 Days
            </button>
          </nav>
        </div>
      </div>

      {tab === "TODAY" && (
        <AnalyticRow
          sessions={sumData(visitsRawToday)}
          users={sumData(usersRawToday)}
          leads={sumData(leadsRawToday)}
          tab={tab}
        />
      )}
      {tab === "YESTERDAY" && (
        <AnalyticRow
          sessions={sumData(visitsRawYesterday)}
          users={sumData(usersRawYesterday)}
          leads={sumData(leadsRawYesterday)}
          tab={tab}
        />
      )}
      {tab === "7DAYS" && (
        <AnalyticRow
          sessions={sumData(visitsRawLast7Days)}
          users={sumData(usersRawLast7Days)}
          leads={sumData(leadsRawLast7Days)}
          tab={tab}
        />
      )}
    </div>
  );
}
