import { Fragment } from "react";
import { Card, Grid, styled, useTheme } from "@mui/material";
import StatCards from "app/views/dashboard/shared/StatCards";
import DoughnutChart from "./Doughnut";
import StepperForm from "app/views/material-kit/forms/stepperform/StepperForm";
import DemandeTabUserAccueil from "./DemandeTabUserAccueil";
import TabSitesAccueil from "./FollowedSitesTab";
// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));
const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize"
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary
}));
export default function UserSharePointAccueil() {
  const { palette } = useTheme();

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <DemandeTabUserAccueil></DemandeTabUserAccueil>
            <TabSitesAccueil></TabSitesAccueil>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <StatCards />
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Stockage utilisé</Title>

              <DoughnutChart
                height="300px"
                color={[
                  palette.primary.dark,
                  palette.primary.main,
                  palette.primary.light,
                  palette.primary.light
                ]}
              />
            </Card>
          </Grid>
        </Grid>
      </ContentBox>
      <Grid style={{ width: "85%", margin: "auto", marginBottom: "5%" }}>
        <StepperForm></StepperForm>
      </Grid>
    </Fragment>
  );
}
