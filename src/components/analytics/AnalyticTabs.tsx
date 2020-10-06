import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AnalyticRow from "./AnalyticRow";
import GraphPropertyAnalytics from "./GraphPropertyAnalytics";
import GraphPropertyAnalyticsBars from "./GraphPropertyAnalyticsBars";
import { AnalyticRawDate, AnalyticTabsProps } from "../../types";
import { splitRawData } from "../../util/splitRawData";
import { formatNumber } from '../../util/formatNumber'

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

export default function AnalyticTabs({
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
              Last 2 Days
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
            sessions={formatNumber(sumData(visitsRawToday))}
            users={formatNumber(sumData(usersRawToday))}
            leads={formatNumber(sumData(leadsRawToday))}
          />
          <GraphPropertyAnalyticsBars
            visitsRaw={visitsRawToday}
            usersRaw={usersRawToday}
            leadsRaw={leadsRawToday}
            days={1}
          />
        </>
      )}
      {tab === "YESTERDAY" && (
        <>
          <AnalyticRow
            sessions={formatNumber(sumData(visitsRawYesterday))}
            users={formatNumber(sumData(usersRawYesterday))}
            leads={formatNumber(sumData(leadsRawYesterday))}
          />
          <GraphPropertyAnalytics
            visitsRaw={visitsRawYesterday}
            usersRaw={usersRawYesterday}
            leadsRaw={leadsRawYesterday}
            days={2}
          />
        </>
      )}
      {tab === "7DAYS" && (
        <>
          <AnalyticRow
            sessions={formatNumber(sumData(visitsRawLast7Days))}
            users={formatNumber(sumData(usersRawLast7Days))}
            leads={formatNumber(sumData(leadsRawLast7Days))}
          />
          <GraphPropertyAnalytics
            visitsRaw={visitsRawLast7Days}
            usersRaw={usersRawLast7Days}
            leadsRaw={leadsRawLast7Days}
            days={7}
          />
        </>
      )}
      {tab === "15DAYS" && (
        <>
          <AnalyticRow
            sessions={formatNumber(sumData(visitsRawLast15Days))}
            users={formatNumber(sumData(usersRawLast15Days))}
            leads={formatNumber(sumData(leadsRawLast15Days))}
          />
          <GraphPropertyAnalytics
            visitsRaw={visitsRawLast15Days}
            usersRaw={usersRawLast15Days}
            leadsRaw={leadsRawLast15Days}
            days={15}
          />
        </>
      )}
      {tab === "30DAYS" && (
        <>
          <AnalyticRow
            sessions={formatNumber(sumData(visitsRawLast30Days))}
            users={formatNumber(sumData(usersRawLast30Days))}
            leads={formatNumber(sumData(leadsRawLast30Days))}
          />
          <GraphPropertyAnalytics
            visitsRaw={visitsRawLast30Days}
            usersRaw={usersRawLast30Days}
            leadsRaw={leadsRawLast30Days}
            days={30}
          />
        </>
      )}
      {tab === "180DAYS" && (
        <>
          <AnalyticRow
            sessions={formatNumber(sumData(visitsRawLast180Days))}
            users={formatNumber(sumData(usersRawLast180Days))}
            leads={formatNumber(sumData(leadsRawLast180Days))}
          />
          <GraphPropertyAnalytics
            visitsRaw={visitsRawLast180Days}
            usersRaw={usersRawLast180Days}
            leadsRaw={leadsRawLast180Days}
            days={180}
          />
        </>
      )}
    </div>
  );
}
