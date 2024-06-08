import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";

export default function LineChartFiles({ height }) {
  const theme = useTheme();
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const accessToken = localStorage.getItem("authToken");
        const response = await fetch("https://localhost:7048/api/ActifFiles/filedetails", {
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

  const processData = (fileDetails) => {
    const totalFilesSeries = fileDetails.map((file) => parseInt(file.Total));
    const activeFilesSeries = fileDetails.map((file) => parseInt(file.Active));
    const lastActivityDates = fileDetails.map((file) => file.LastActivityDate).reverse();

    return {
      lastActivityDates,
      totalFilesSeries,
      activeFilesSeries
    };
  };

  const { lastActivityDates, totalFilesSeries, activeFilesSeries } = chartData;

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
      data: lastActivityDates,
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
        fontSize: 12,
        fontFamily: "DM Sans",
        color: theme.palette.text.secondary
      }
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br />Total: {c0}<br />Actifs: {c1}"
    },
    series: [
      {
        data: totalFilesSeries,
        type: "line",
        name: "Nombre total de fichiers",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 }
      },
      {
        data: activeFilesSeries,
        type: "line",
        name: "Nombre de fichiers actifs",
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
