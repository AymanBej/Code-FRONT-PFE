import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SimpleCard, MatxProgressBar } from "app/components";

export default function Campaigns() {
  const [statusCounts, setStatusCounts] = useState({
    acceptée: 0,
    refusée: 0,
    enAttente: 0
  });
  const accessToken = localStorage.getItem("authToken");

  useEffect(() => {
    fetch("https://localhost:7048/api/Demande_SharePoint", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const counts = data.reduce(
          (acc, demande) => {
            if (demande.statut === "Acceptée") {
              acc.acceptée += 1;
            } else if (demande.statut === "Refusée") {
              acc.refusée += 1;
            } else if (demande.statut === "En attente") {
              acc.enAttente += 1;
            }
            return acc;
          },
          { acceptée: 0, refusée: 0, enAttente: 0 }
        );
        setStatusCounts(counts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const total = statusCounts.acceptée + statusCounts.refusée + statusCounts.enAttente;

  const calculatePercentage = (count) => (total > 0 ? (count / total) * 100 : 0);

  return (
    <Box mt={2}>
       
      
        <MatxProgressBar
          value={calculatePercentage(statusCounts.acceptée)}
          color="success"
          text={
            <Typography style={{ fontFamily: "DM Sans" }}>
              Acceptée ({statusCounts.acceptée})
            </Typography>
          }
        />
        <MatxProgressBar
          value={calculatePercentage(statusCounts.refusée)}
          color="error"
          text={
            <Typography style={{ fontFamily: "DM Sans" }}>
              Refusée ({statusCounts.refusée})
            </Typography>
          }
        />
        <MatxProgressBar
          value={calculatePercentage(statusCounts.enAttente)}
          color="secondary"
          text={
            <Typography style={{ fontFamily: "DM Sans" }}>
              En attente ({statusCounts.enAttente})
            </Typography>
          }
        />
    </Box>
  );
}
