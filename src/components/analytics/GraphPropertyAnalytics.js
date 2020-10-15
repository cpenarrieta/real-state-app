import React, { useRef, useState, useEffect } from "react";
import { format, isSameDay, subDays } from "date-fns";
import Chartjs from "chart.js";

const config = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Sessions",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        data: [],
        fill: false,
      },
      {
        label: "Users",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        data: [],
        fill: false,
      },
      {
        label: "Leads",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        data: [],
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: false,
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Day",
          },
        },
      ],
      yAxes: [
        // TODO begin at 0 ??
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value",
          },
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            min: 0,
          },
        },
      ],
    },
  },
};

export default function GraphPropertyAnalytics({
  visitsRaw,
  leadsRaw,
  usersRaw,
  days = 7,
}) {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, config);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  useEffect(() => {
    if (chartInstance && visitsRaw) {

      console.log(visitsRaw, days)

      const labels = [];
      const sessionsDataSet = [];
      const leadsDataSet = [];
      const usersDataSet = [];

      // TODO should I add + 1 here or check the lowest date from the array
      for (let i = 0; i < days + 1; i++) {
        const d = subDays(new Date(), i);

        // SESSIONS
        const visitData = visitsRaw.find((vr) => isSameDay(vr.day, d));
        if (visitData) {
          sessionsDataSet.unshift(visitData.count);
        } else {
          sessionsDataSet.unshift(0);
        }

        // LEADS
        const leadData = leadsRaw.find((vr) => isSameDay(vr.day, d));
        if (leadData) {
          leadsDataSet.unshift(leadData.count);
        } else {
          leadsDataSet.unshift(0);
        }

        // USERS
        const usersData = usersRaw.find((vr) => isSameDay(vr.day, d));
        if (usersData) {
          usersDataSet.unshift(usersData.count);
        } else {
          usersDataSet.unshift(0);
        }

        labels.unshift(format(d, "LLL d"));
      }

      chartInstance.data.datasets[0].data = sessionsDataSet;
      chartInstance.data.datasets[1].data = usersDataSet;
      chartInstance.data.datasets[2].data = leadsDataSet;

      chartInstance.data.labels = labels;
      chartInstance.update();
    }
  }, [chartInstance, visitsRaw, leadsRaw, usersRaw, days]);

  return (
    <div className="bg-white rounded-md mt-5">
      <canvas ref={chartContainer} />
    </div>
  );
}
