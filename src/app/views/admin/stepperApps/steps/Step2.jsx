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
// Définition du composant Step2
function Step2() {
  return (
    <Box style={{ overflowY: "auto", maxHeight: "55vh" }}>
      <Typography style={{ fontFamily: "DM Sans", fontSize: "25px" }} variant="h4" gutterBottom>
        Inscrire une application
      </Typography>
      <Typography
        style={{ width: "95%", textAlign: "justify", fontFamily: "DM Sans", fontSize: "18px" }}
        variant="body1"
        paragraph
        gutterBottom
      >
        L’inscription de votre application établit une relation d’approbation entre votre
        application et la plateforme d’identités Microsoft. L’approbation est unidirectionnelle :
        votre application approuve la plateforme d’identités Microsoft, et non le contraire. Une
        fois créé, l’objet d’application ne peut pas être déplacé entre différents locataires.
        Effectuez les étapes suivantes pour créer l’inscription d’application :<br></br>
        <strong>1.</strong> Connectez-vous au Centre d’administration de Microsoft Entra au minimum
        en tant qu’Administrateur d’application cloud.<br></br>
        <strong>2.</strong> Si vous avez accès à plusieurs tenants, utilisez l’icône Paramètres dans
        le menu supérieur pour basculer vers le tenant dans lequel vous voulez inscrire
        l’application à partir du menu Répertoires + abonnements.<br></br>
        <strong>3.</strong> Accédez à Identité
      </Typography>
      <ImageZoomable src="/assets/images/CreateAppsStepper/Step2.1.png" />
      <Typography
        style={{ textAlign: "justify", fontFamily: "DM Sans", fontSize: "18px" }}
        variant="body1"
        paragraph
        gutterBottom
      >
        <strong>4.</strong> Accéedez à Applications / Inscription des applications
      </Typography>
      <ImageZoomable src="/assets/images/CreateAppsStepper/Step2.2.png" />
      <Typography
        style={{ textAlign: "justify", fontFamily: "DM Sans", fontSize: "18px" }}
        variant="body1"
        paragraph
        gutterBottom
      >
        <strong>5.</strong> Cliquez sur Nouvelle inscription
      </Typography>
      <img width={"95%"} src="/assets/images/CreateAppsStepper/Step2.3.png" alt="" />
      <Typography
        style={{ textAlign: "justify", fontFamily: "DM Sans", fontSize: "18px" }}
        variant="body1"
        paragraph
        gutterBottom
      >
        <strong>6.</strong> Entrez un nom d’affichage pour votre application. Les utilisateurs de
        votre application peuvent voir le nom d’affichage lorsqu’ils l’utilisent, par exemple lors
        de la connexion. Vous pouvez modifier le nom d’affichage à tout moment, et plusieurs
        inscriptions d’applications peuvent partager le même nom. L’ID d’application (client) généré
        automatiquement par l’inscription de l’application, et non son nom d’affichage, identifie de
        manière unique votre application au sein de la plateforme d’identités.<br></br>
        <strong>7.</strong> Sélectionnez S'inscrire pour procéder à l’inscription d’application
        initiale.
      </Typography>
      <ImageZoomable src="/assets/images/CreateAppsStepper/Step2.4.png" />
      <Typography
        style={{ textAlign: "justify", fontFamily: "DM Sans", fontSize: "18px" }}
        variant="body1"
        paragraph
        gutterBottom
      >
        <strong>8.</strong> Une fois l’inscription terminée, le Centre d’administration Microsoft
        Entra affiche le volet Vue d’ensemble de l’inscription de l’application. Vous voyez l’ID
        d’application (client) . Aussi appelée ID client, cette valeur identifie de manière unique
        votre application dans la plateforme d’identités Microsoft.
      </Typography>
      <ImageZoomable src="/assets/images/CreateAppsStepper/Step2.5.png" />
    </Box>
  );
}

export default Step2;
