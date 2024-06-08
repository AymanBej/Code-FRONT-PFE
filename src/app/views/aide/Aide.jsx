import React from "react";
import { Typography } from "@mui/material";

import ContactForm from "../material-kit/forms/ContactForm";
import { Box } from "@mui/material";
import { Breadcrumb } from "app/components";
import CardsAide from "app/components/CardsAide";

const HelpPage = () => {
  return (
    <div style={{ margin: "auto", width: "80%", fontFamily: "DM Sans", padding: "2%" }}>
      <Box marginBottom={"2%"} className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Aide" }]} />
      </Box>
      <Typography style={{ fontFamily: "DM Sans" }} variant="h4" sx={{ mb: 2 }}>
        Besoin d'aide ?
      </Typography>
      <CardsAide></CardsAide>

      <Typography style={{ marginTop: "4%", fontFamily: "DM Sans" }} variant="h4" sx={{ mb: 2 }}>
        Contactez nous !
      </Typography>
      <ContactForm></ContactForm>
    </div>
  );
};

export default HelpPage;
