import { Card, Grid, styled, useTheme } from "@mui/material";
import StatCards2 from "./components/StatCards2";
import TabDemandeAdmin from "./components/TabDemandeAdmin";

import TabUsersADmins from "./components/TabUsersAdmin";
import LineChartUsersPages from "app/views/charts/echarts/LineChartUsersPages";
import LineChartFiles from "app/views/charts/echarts/LineChartFiles";
import LineChartStorage from "app/views/charts/echarts/LineChartStockage";
import TabSitesAccueil from "./components/TabSitesAccueil";
import Campaigns from "./components/Campaigns";
// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  fontFamily: "DM Sans"
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  fontFamily: "DM Sans"
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary
}));

export default function SharePointAdminAccueil() {
  const theme = useTheme();

  return (
    <ContentBox className="analytics">
      <Grid container spacing={3}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <StatCards2 />
          <TabUsersADmins />
          <TabDemandeAdmin />
          <TabSitesAccueil></TabSitesAccueil>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Card sx={{ px: 3, py: 2, mb: 3 }}>
            <Title>Les demandes</Title>
            <SubTitle>Statistiques des statuts</SubTitle>

            <Campaigns></Campaigns>
          </Card>
          <Card sx={{ px: 3, py: 4, mb: 3 }}>
            <Title>Trafic des données</Title>
            <SubTitle>Les 30 derniers jours</SubTitle>

            <LineChartUsersPages
              height="450px"
              color={[theme.palette.primary.main, theme.palette.primary.light]}
            />
          </Card>
          <Card sx={{ px: 3, py: 4, mb: 3 }}>
            <Title>Les demandes</Title>
            <SubTitle>Les 30 derniers jours</SubTitle>

            <LineChartFiles
              height="450px"
              color={[theme.palette.primary.main, theme.palette.primary.light]}
            />
          </Card>

          <Card sx={{ px: 3, py: 2, mb: 3 }}>
            <Title>Stockage (MB)</Title>
            <SubTitle>Les 30 derniers jours</SubTitle>

            <LineChartStorage
              height="450px"
              color={[theme.palette.primary.main, theme.palette.primary.light]}
            />
          </Card>
        </Grid>
      </Grid>
    </ContentBox>
  );
}
