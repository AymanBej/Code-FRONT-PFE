import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";

export default function LineChartUsersPages({ height }) {
  const theme = useTheme();
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const accessToken = localStorage.getItem("authToken");
        const response = await fetch("https://localhost:7048/api/SharePointActivity/userdetail", {
          method: "GET",

          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        setChartData(processData(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const processData = (userData) => {
    const userCountData = {};
    const pageCountData = {};
    const fortyDaysAgo = new Date();
    fortyDaysAgo.setDate(fortyDaysAgo.getDate() - 40);

    userData.forEach((user) => {
      const lastActivityDate = user.LastActivityDate;
      if (lastActivityDate) {
        const activityDate = new Date(lastActivityDate);
        if (activityDate >= fortyDaysAgo) {
          const dateString = activityDate.toISOString().split("T")[0];
          if (dateString in userCountData) {
            userCountData[dateString]++;
            pageCountData[dateString] += parseInt(user.VisitedPageCount);
          } else {
            userCountData[dateString] = 1;
            pageCountData[dateString] = parseInt(user.VisitedPageCount);
          }
        }
      }
    });

    const sortedDates = Object.keys(userCountData).sort((a, b) => new Date(a) - new Date(b));
    const interval = Math.ceil(sortedDates.length / 4);
    const xAxisDates = sortedDates.filter((date, index) => index % interval === 0);

    const userCountSeries = xAxisDates.map((date) => userCountData[date] || 0);
    const pageCountSeries = xAxisDates.map((date) => pageCountData[date] || 0);

    return {
      xAxisDates,
      userCountSeries,
      pageCountSeries
    };
  };

  const { xAxisDates, userCountSeries, pageCountSeries } = chartData;

  const option = {
    grid: { top: "20%", bottom: "5%", left: "8%", right: "2%" },
    legend: {
      top: "5%",
      itemGap: 20,
      icon: "circle",
      textStyle: {
        fontSize: 13,
        color: theme.palette.text.secondary,
        fontFamily: theme.typography.fontFamily
      }
    },
    label: {
      fontSize: 13,
      color: theme.palette.text.secondary,
      fontFamily: theme.typography.fontFamily
    },
    xAxis: {
      type: "category",
      data: xAxisDates,
      axisLine: { show: true },
      axisTick: { show: true },
      axisLabel: {
        fontSize: 12,
        fontFamily: "DM Sans",
        color: theme.palette.text.secondary
      }
    },
    yAxis: {
      type: "value",
      axisLine: { show: true },
      axisTick: { show: true },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 }
      },
      axisLabel: {
        color: theme.palette.text.secondary,
        fontSize: 12,
        fontFamily: "DM Sans"
      }
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br />{a0}: {c0}<br />{a1}: {c1}"
    },
    series: [
      {
        data: userCountSeries,
        type: "line",
        name: "Nombre d'utilisateurs actifs",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 }
      },
      {
        data: pageCountSeries,
        type: "line",
        name: "Nombre de pages consultées",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
        itemStyle: {
          color: "#0099bc"
        }
      }
    ]
  };

  return <ReactEcharts style={{ height }} option={option} />;
}
