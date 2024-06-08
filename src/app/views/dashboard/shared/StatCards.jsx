import React, { useEffect, useState } from "react";
import { Grid, Box, Card, styled } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Small } from "app/components/Typography";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import FindInPageIcon from "@mui/icons-material/FindInPage";

// STYLED COMPONENTS
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "24px !important",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: { padding: "16px !important" }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  "& small": { color: theme.palette.text.secondary },
  "& .icon": { opacity: 0.6, fontSize: "44px", color: theme.palette.primary.main }
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  marginTop: "4px",
  fontSize: "14px",
  fontWeight: "500",
  color: theme.palette.primary.main
}));

export default function StatCards() {
  const [lastActivityDate, setLastActivityDate] = useState(null);
  const [viewedOrEditedFileCount, setViewedOrEditedFileCount] = useState(null);
  const [visitedPageCount, setVisitedPageCount] = useState(null);

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
        fetch("https://localhost:7048/api/SharePointActivity/userdetail", {
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
              setLastActivityDate(userActivity.LastActivityDate);
              setViewedOrEditedFileCount(userActivity.ViewedOrEditedFileCount);
              setVisitedPageCount(userActivity.VisitedPageCount);
            }
          });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const cardList = [
    { name: "Votre dernière activité", value: lastActivityDate || "-", Icon: AccessTimeIcon },
    {
      name: "Fichiers consultés ou modifiés ",
      value: viewedOrEditedFileCount || "0",
      Icon: FileCopyIcon
    },
    {
      name: "Pages visitées",
      value: visitedPageCount || "0",
      Icon: FindInPageIcon
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: "24px" }}>
      {cardList.map(({ value, Icon, name }) => (
        <Grid item xs={12} key={name}>
          <StyledCard elevation={6} style={{ width: "100%" }}>
            <ContentBox>
              <Icon className="icon" />

              <Box ml="12px">
                <Small>{name}</Small>
                <Heading>{value}</Heading>
              </Box>
            </ContentBox>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
}
