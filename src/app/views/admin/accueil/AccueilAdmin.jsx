import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import { Box } from "@mui/material";
import { Breadcrumb } from "app/components";
import useSettings from "app/hooks/useSettings";

export default function Accueil() {
  const Nft1 = "/assets/images/Accueil/SharePoint.jpg";
  const Nft2 = "/assets/images/Accueil/Teams.jpg";
  const Nft3 = "/assets/images/Accueil/Automate.jpg";
  const Nft4 = "/assets/images/Accueil/Exchange.jpg";
  const { settings, updateSettings } = useSettings();

  const handleLayout2Change = () => {
    const newLayout = "layoutSharePointAdmin"; // Assurez-vous de définir le layout souhaité ici
    updateSettings({ ...settings, activeLayout: newLayout });
  };
  const handleLayout3Change = () => {
    const newLayout = "layoutExchangeAdmin"; // Assurez-vous de définir le layout souhaité ici
    updateSettings({ ...settings, activeLayout: newLayout });
  };
  const handleLayout4Change = () => {
    const newLayout = "layoutTeamsAdmin"; // Assurez-vous de définir le layout souhaité ici
    updateSettings({ ...settings, activeLayout: newLayout });
  };
  const handleLayout5Change = () => {
    const newLayout = "layoutPowerAutomateAdmin"; // Assurez-vous de définir le layout souhaité ici
    updateSettings({ ...settings, activeLayout: newLayout });
  };
  const layoutChangeFunctions = [
    handleLayout2Change,
    handleLayout3Change,
    handleLayout4Change,
    handleLayout5Change
  ];

  useEffect(() => {
    // Mettre à jour la mise en page uniquement lorsque le composant est monté
    const newLayout = "layoutAccueilAdmin";
    if (settings.activeLayout !== newLayout) {
      updateSettings({ ...settings, activeLayout: newLayout });
    }
  }, [settings.activeLayout, updateSettings]);

  return (
    <div
      style={{
        margin: "auto",
        width: "80%",
        fontFamily: "DM Sans",
        padding: "2%",
        marginBottom: "3%"
      }}
    >
      <Box marginBottom={"2%"} className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Accueil" }]} />
      </Box>
      <Grid container spacing={4} sx={{ pt: { xs: "180px", md: "20px" } }}>
        <ImgButton
          image={Nft1}
          hoverColor="#38c6d0"
          routing={"/admin/sharepoint/accueil"}
          handleLayoutChange={layoutChangeFunctions[0]}
        />
        <ImgButton
          image={Nft4}
          hoverColor="#0178d4"
          routing={"/charts/echarts"}
          handleLayoutChange={layoutChangeFunctions[1]}
        />
        <ImgButton
          image={Nft3}
          hoverColor="#3689f2"
          routing={"/material/autocomplete"}
          handleLayoutChange={layoutChangeFunctions[3]}
        />
        <ImgButton
          image={Nft2}
          hoverColor="#7c83eb"
          routing={"/material/checkbox"}
          handleLayoutChange={layoutChangeFunctions[2]}
        />
      </Grid>
    </div>
  );
}

function ImgButton({ image, hoverColor, routing, handleLayoutChange }) {
  return (
    <Grid item xs={12} md={6}>
      <div style={{ position: "relative" }}>
        <img src={image} style={{ borderRadius: "20px", width: "100%", height: "auto" }} />
        <Link to={routing} style={{ textDecoration: "none" }}>
          <Button
            onClick={handleLayoutChange}
            sx={{
              position: "absolute",
              bottom: "8%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "25%",
              bgcolor: "#636370",
              fontFamily: "DM Sans",
              fontSize: "17px",
              opacity: "0.85",
              color: "white",
              borderRadius: "20px",
              "&:hover": {
                bgcolor: hoverColor,
                opacity: 1
              }
            }}
          >
            Gérer
          </Button>
        </Link>
      </div>
    </Grid>
  );
}
