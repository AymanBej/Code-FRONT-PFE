import React, { useState } from "react";
import { Typography, Box,Button } from "@mui/material";

// Composant ImageZoomable réutilisable
const ImageZoomable = ({ src }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <Button
      style={{
        padding: 0,
        border: "none",
        background: "none",
        cursor: isZoomed ? "zoom-out" : "zoom-in" // Change cursor based on zoom state
      }}
      onClick={handleZoom}
    >
      <img
        style={{
          position: isZoomed ? "fixed" : "static",
          top: "50%",
          left: "50%",
          transform: isZoomed ? "translate(-50%, -50%)" : "none",
          width: isZoomed ? "80vw" : "95%",
          height: isZoomed ? "90vh" : "auto",
          zIndex: isZoomed ? 9999 : "auto"
        }}
        src={src}
        alt=""
      />
    </Button>
  );
};

// Définition du composant Step3
function Step3() {
  return (
    <Box style={{ overflowY: "auto", maxHeight: "55vh" }}>
      <Typography style={{ fontFamily: "DM Sans", fontSize: "25px" }} variant="h4" gutterBottom>
        Configurer les paramètres de plateforme
      </Typography>
      <Typography
        style={{ width: "95%", textAlign: "justify", fontFamily: "DM Sans", fontSize: "18px" }}
        variant="body1"
        paragraph
        gutterBottom
      >
        Les paramètres de chaque type d’application, dont les URI de redirection, sont configurés
        dans Configurations de plateforme dans le portail Azure. Certaines plateformes, comme le web
        et les applications monopages, nécessitent de spécifier manuellement un URI de redirection.
        Pour les autres plateformes, comme les plateformes mobiles et de bureau, vous pouvez
        sélectionner des URI de redirection générés automatiquement quand vous configurez leurs
        autres paramètres. Pour configurer des paramètres d’application en fonction de la plateforme
        ou de l’appareil ciblé, procédez comme suit :<br></br>
        <strong>1.</strong> Dans le Centre d’administration Microsoft Entra, dans Inscriptions
        d’applications, sélectionnez votre application.<br></br>
        <strong>2.</strong> Sous Gérer, sélectionnez Authentification.<br></br>
      </Typography>
      <ImageZoomable src="/assets/images/CreateAppsStepper/Step3.1.png" />
      <Typography
        style={{ textAlign: "justify", fontFamily: "DM Sans", fontSize: "18px" }}
        variant="body1"
        paragraph
        gutterBottom
      >
        <strong>3.</strong> Sous Configurations de plateformes, sélectionnez Ajouter une plateforme.
      </Typography>
      <ImageZoomable src="/assets/images/CreateAppsStepper/Step3.2.png" />
      <Typography
        style={{ textAlign: "justify", fontFamily: "DM Sans", fontSize: "18px" }}
        variant="body1"
        paragraph
        gutterBottom
      >
        <strong>4.</strong>Sous Configurer des plateformes, sélectionnez la vignette correspondant à
        votre type d’application (plateforme) pour configurer ses paramètres.
      </Typography>
      <ImageZoomable src="/assets/images/CreateAppsStepper/Step3.3.png" />
      <Typography
        style={{ textAlign: "justify", fontFamily: "DM Sans", fontSize: "18px" }}
        variant="body1"
        paragraph
        gutterBottom
      >
        <strong>5.</strong> Sélectionnez Configurer pour effectuer la configuration de la
        plateforme.
      </Typography>
      <Typography
        style={{ textAlign: "justify", fontFamily: "DM Sans", fontSize: "20px" }}
        variant="body1"
        paragraph
        gutterBottom
      >
        Après avoir terminé les étapes, il est recommandé de fournir les valeurs des champs dans la
        fenêtre suivante. Cliquez sur "Suivant" pour poursuivre le processus.
      </Typography>
    </Box>
  );
}

export default Step3;
