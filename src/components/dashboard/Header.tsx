import React, { useState } from "react";
import AnalyticRow from "./AnalyticRow";

type HeaderProps = {
  sessions: { today: number; yesterday: number; last7Days: number };
  users: { today: number; yesterday: number; last7Days: number };
  leads: { today: number; yesterday: number; last7Days: number };
};

export default function Header({ sessions, users, leads }: HeaderProps) {
  const [tab, selectTab] = useState("TODAY");

  const notSelected =
    "px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-indigo-600 focus:bg-indigo-50";
  const selected =
    "px-3 py-2 font-medium text-sm leading-5 rounded-md text-indigo-700 bg-indigo-100 focus:outline-none focus:text-indigo-800 focus:bg-indigo-200";

  return (
    <div>
      <div>
        <div className="sm:hidden">
          <select
            aria-label="Selected tab"
            className="form-select block w-full"
          >
            <option selected={tab === "TODAY"}>Today</option>
            <option selected={tab === "YESTERDAY"}>Yesterday</option>
            <option selected={tab === "7DAYS"}>Last 7 Days</option>
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
        <AnalyticRow
          sessions={sessions.last7Days}
          users={users.last7Days}
          leads={leads.last7Days}
        />
      )}
    </div>
  );
}
