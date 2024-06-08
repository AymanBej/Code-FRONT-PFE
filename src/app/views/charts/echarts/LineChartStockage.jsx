import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { format, subDays } from "date-fns";
import { useTheme } from "@mui/material/styles";

export default function LineChartStorage({ height }) {
  const theme = useTheme();

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const accessToken = localStorage.getItem("authToken");

        // Déterminer la date actuelle
        const today = new Date();

        // Calculer la date d'il y a 40 jours
        const fortyDaysAgo = subDays(today, 40);

        const response = await fetch("https://localhost:7048/api/SitesStockage/sitesstockage", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();

        // Filtrer les données pour les 40 derniers jours
        const filteredData = data.filter((site) => {
          const lastActivityDate = new Date(site["Last Activity Date"]);
          return lastActivityDate >= fortyDaysAgo && lastActivityDate <= today;
        });

        setChartData(processData(filteredData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const processData = (storageData) => {
    // Trier les données par date
    storageData.sort(
      (a, b) => new Date(a["Last Activity Date"]) - new Date(b["Last Activity Date"])
    );

    // Accumuler les valeurs de stockage utilisé
    let cumulativeStorage = 0;
    const cumulativeStorageSeries = storageData.map((site) => {
      cumulativeStorage += parseFloat(site["Storage Used (MB)"]);
      return cumulativeStorage;
    });

    // Extraire les dates formatées
    const lastActivityDates = storageData.map((site) =>
      format(new Date(site["Last Activity Date"]), "yyyy-MM-dd")
    ); // Formatage de la date

    return {
      lastActivityDates,
      cumulativeStorageSeries
    };
  };

  const { lastActivityDates, cumulativeStorageSeries } = chartData;

  const option = {
    grid: { top: "10%", bottom: "5%", left: "8%", right: "2%" },
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
      axisLabel: {
        formatter: "{value}",
        fontSize: 12,
        fontFamily: "DM Sans",
        color: theme.palette.text.secondary
      }
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br />Stockage utilisé: {c} MB"
    },
    series: [
      {
        data: cumulativeStorageSeries,
        type: "line",
        name: "Stockage utilisé (accumulé)",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 }
      }
    ]
  };

  return <ReactEcharts style={{ height }} option={option} />;
}
