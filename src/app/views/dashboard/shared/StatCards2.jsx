import React, { useState, useEffect } from "react";
import { TrendingUp, ArrowUpward, ArrowDownward, QueryStats } from "@mui/icons-material";
import { Card, Fab, Grid, lighten, styled, useTheme } from "@mui/material";

// STYLED COMPONENTS
const ContentBox = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center"
}));

const FabIcon = styled(Fab)(() => ({
  width: "44px !important",
  height: "44px !important",
  boxShadow: "none !important"
}));

const H3 = styled("h3")(() => ({
  margin: 0,
  fontWeight: "500",
  marginLeft: "12px"
}));

const H1 = styled("h1")(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  fontSize: "25px",
  color: theme.palette.text.secondary
}));

const Span = styled("span")(() => ({
  fontSize: "13px",
  marginLeft: "4px"
}));

const IconBox = styled("div")(() => ({
  width: 16,
  height: 16,
  color: "#fff",
  display: "flex",
  overflow: "hidden",
  borderRadius: "300px ",
  justifyContent: "center",
  "& .icon": { fontSize: "14px" }
}));

const StatCards2 = () => {
  const { palette } = useTheme();
  const bgError = lighten(palette.error.main, 0.85);
  const [activeUsersCount, setActiveUsersCount] = useState(null);
  const [siteCount, setSiteCount] = useState(null);

  useEffect(() => {
    const fetchSiteCount = async () => {
      try {
        const accessToken = localStorage.getItem("authToken");

        // Remplacez cet endpoint par l'URL de votre API Microsoft Graph
        const response = await fetch("https://localhost:7048/api/AllSites/sites", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        const numberOfSites = data.value.length;
        setSiteCount(numberOfSites);
      } catch (error) {
        console.error("Error fetching site count:", error);
      }
    };

    fetchSiteCount();
  }, []);

  useEffect(() => {
    const fetchActiveUsersCount = async () => {
      try {
        const accessToken = localStorage.getItem("authToken");
        const response = await fetch("https://localhost:7048/api/ActifUsers/activeuserscount", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        setActiveUsersCount(data.activeUsersCount);
      } catch (error) {
        console.error("Error fetching active users count:", error);
      }
    };

    fetchActiveUsersCount();
  }, []);

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{ p: 2 }}>
          <ContentBox>
            <FabIcon
              style={{ zIndex: "1" }}
              size="medium"
              sx={{ background: "rgba(9, 182, 109, 0.15)" }}
            >
              <TrendingUp color="success" />
            </FabIcon>
            <H3 color="#08ad6c">Nombre des utilisateurs actifs</H3>
          </ContentBox>
          <ContentBox sx={{ pt: 2 }}>
            <H1>{activeUsersCount !== null ? activeUsersCount + " utilisateurs" : "-"}</H1>
            <IconBox sx={{ backgroundColor: "success.main" }}>
              {activeUsersCount !== null && activeUsersCount > 0 ? (
                <ArrowUpward className="icon" />
              ) : null}
            </IconBox>
          </ContentBox>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{ p: 2 }}>
          <ContentBox>
            <FabIcon size="medium" sx={{ backgroundColor: bgError, overflow: "hidden" }}>
              <QueryStats color="error" />
            </FabIcon>
            <H3 color="error.main">Nombre des sites</H3>
          </ContentBox>
          <ContentBox sx={{ pt: 2 }}>
            <H1>{siteCount !== null ? siteCount + " sites" : "-"}</H1>
            <IconBox sx={{ backgroundColor: "error.main" }}>
              <ArrowUpward className="icon" />
            </IconBox>
          </ContentBox>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatCards2;
