import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ReactEcharts from "echarts-for-react";

export default function DoughnutChart({ height }) {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const accessToken = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch authenticated user data
    fetch("https://graph.microsoft.com/beta/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((authUserData) => {
        const userPrincipalName = authUserData.userPrincipalName;

        // Fetch SharePoint activity data
        fetch("https://localhost:7048/api/SitesStockage/sitesstockage", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        })
          .then((response) => response.json())
          .then((activityData) => {
            // Find matching user activity data
            const userActivity = activityData.find(
              (user) => user.userPrincipalName === userPrincipalName
            );

            if (userActivity) {
              const storageUsedMB = userActivity["Storage Used (MB)"] / (1024 * 1024); // Convert to MB
              const totalStorageMB = 26214400; // Total storage in MB (25GB)
              const usedStoragePercentage = ((storageUsedMB / totalStorageMB) * 100).toFixed(3);

              setChartData([
                {
                  value: usedStoragePercentage,
                  name: "Stockage utilisé",
                  itemStyle: { color: "#191934" }
                },
                {
                  value: 100 - usedStoragePercentage,
                  name: "Stockage Alloué",
                  itemStyle: { color: "#0d5195" }
                }
              ]);
            }
          });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [accessToken]);

  const option = {
    legend: {
      show: true,
      itemGap: 20,
      icon: "circle",
      bottom: 0,
      textStyle: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: "roboto" }
    },
    tooltip: { show: true, trigger: "item", formatter: "{a} <br/>{b}: {c} ({d}%)" },
    xAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],
    yAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],

    series: [
      {
        name: "Storage Usage",
        type: "pie",
        radius: ["45%", "72.55%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: "center", // shows the description data to center, turn off to show in right side
            textStyle: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: "roboto" },
            formatter: "{a}"
          },
          emphasis: {
            show: true,
            textStyle: { fontSize: "14", fontWeight: "normal" },
            formatter: "{b} \n{c} ({d}%)"
          }
        },
        labelLine: { normal: { show: false } },
        data: chartData,
        itemStyle: {
          emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: "rgba(0, 0, 0, 0.5)" }
        }
      }
    ]
  };

  return <ReactEcharts style={{ height: height }} option={option} />;
}
