import React, { useState } from "react";
import AnalyticRow from "./AnalyticRow";
import { AnalyticTabsProps } from "../../types";
import { splitRawData } from "../../util/splitRawData";
import { formatNumber } from "../../util/formatNumber";
import { sumData } from '../../util/sumRawData'

export default function Header({
  visitsRaw,
  leadsRaw,
  usersRaw,
}: AnalyticTabsProps) {
  const [tab, selectTab] = useState("7DAYS");

  const notSelected =
    "px-3 py-2 font-medium text-sm leading-5 rounded-md text-logoFont hover:text-gray-700 focus:outline-none focus:text-logoFont focus:bg-logoPink";
  const selected =
    "px-3 py-2 font-medium text-sm leading-5 rounded-md text-logoFont bg-logoPink focus:outline-none focus:text-logoFont focus:bg-logoPink";

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
          sessions={formatNumber(sumData(visitsRawToday))}
          users={formatNumber(sumData(usersRawToday))}
          leads={formatNumber(sumData(leadsRawToday))}
          tab={tab}
        />
      )}
      {tab === "YESTERDAY" && (
        <AnalyticRow
          sessions={formatNumber(sumData(visitsRawYesterday))}
          users={formatNumber(sumData(usersRawYesterday))}
          leads={formatNumber(sumData(leadsRawYesterday))}
          tab={tab}
        />
      )}
      {tab === "7DAYS" && (
        <AnalyticRow
          sessions={formatNumber(sumData(visitsRawLast7Days))}
          users={formatNumber(sumData(usersRawLast7Days))}
          leads={formatNumber(sumData(leadsRawLast7Days))}
          tab={tab}
        />
      )}
    </div>
  );
}
