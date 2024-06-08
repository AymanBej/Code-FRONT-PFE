import { Fragment } from "react";
import { Card, Grid, styled, useTheme } from "@mui/material";
import RowCards from "./shared/RowCards";
import StatCards from "./shared/StatCards";
import StatCards2 from "./shared/StatCards2";
import TabDemandeAdmin from "./shared/TabDemandeAdmin";

import TabUsersADmins from "./shared/TabUsersAdmin";
import LineChartUsersPages from "../charts/echarts/LineChartUsersPages";
import LineChartFiles from "../charts/echarts/LineChartFiles";
import LineChartStorage from "../charts/echarts/LineChartStockage";
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

export default function Analytics() {
  const theme = useTheme();

  const { palette } = useTheme();

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <StatCards2 />
            <TabUsersADmins />
            <TabDemandeAdmin />

            <StatCards />

            <H4>Ongoing Projects</H4>
            <RowCards />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 4, mb: 3 }}>
              <Title>Trafic des données</Title>
              <SubTitle>Les 30 derniers jours</SubTitle>

              <LineChartUsersPages
                height="450px"
                color={[theme.palette.primary.main, theme.palette.primary.light]}
              />
            </Card>
            <Card sx={{ px: 3, py: 4, mb: 3 }}>
              <Title>Trafic des fichiers</Title>
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

            {/* <DoughnutChart
                height="300px"
                color={[
                  palette.primary.dark,
                  palette.primary.main,
                  palette.primary.light,
                  palette.primary.light
                ]}
              /> */}

            {/* <Campaigns /> */}
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
}
