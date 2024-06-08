import React from "react";
import { Typography, Box } from "@mui/material";

// Définition du composant Step1
function Step1() {
  return (
    <Box style={{ overflowY: "auto", maxHeight: "55vh" }}>
      <Typography style={{ fontFamily: "DM Sans", fontSize: "25px" }} variant="h4" gutterBottom>
        Introduction
      </Typography>
      <Typography
        style={{ textAlign: "justify", fontFamily: "DM Sans", fontSize: "18px" }}
        variant="body1"
        paragraph
        gutterBottom
      >
        Pour créer des applications qui utilisent la plateforme d'identité Microsoft pour la gestion
        des identités et des accès, vous devez accéder à un locataire Microsoft Entra. C'est dans le
        locataire Microsoft Entra que vous enregistrez et gérez vos applications, configurez leur
        accès aux données dans Microsoft 365 et d'autres API Web, et activez des fonctionnalités
        telles que l'accès conditionnel. Un locataire représente une organisation. Il s'agit d'une
        instance dédiée de Microsoft Entra ID qu'une organisation ou un développeur d'applications
        reçoit au début d'une relation avec Microsoft. Cette relation peut commencer par
        l’inscription à Azure, Microsoft Intune ou Microsoft 365, par exemple. Chaque locataire
        Microsoft Entra est distinct et distinct des autres locataires Microsoft Entra. Il dispose
        de sa propre représentation d’identités professionnelles et scolaires, d’identités de
        consommateurs (dans le cas d’un locataire Azure AD B2C) et d’inscriptions d’applications.
        Dans votre locataire, une inscription d’application peut autoriser des authentifications
        uniquement à partir de comptes situés dans votre locataire ou dans tous les locataires.
      </Typography>
      <Typography style={{ fontFamily: "DM Sans", fontSize: "25px" }} variant="h4" gutterBottom>
        Prérequis
      </Typography>
      <Typography
        style={{ textAlign: "justify", fontFamily: "DM Sans", fontSize: "18px" }}
        variant="body1"
        paragraph
        gutterBottom
      >
        Avant de débuter, il est important de disposer des conditions suivantes : <br></br>* Un
        compte Azure disposant d’un abonnement actif.<br></br>* Le compte Azure doit être au minimum
        Administrateur d’application cloud.
      </Typography>
      <Typography style={{ fontFamily: "DM Sans", fontSize: "20px" }} variant="h4" gutterBottom>
        Aprés la vérification de vos prérequis . Pour commencer la création des applications avec la plateforme d’identités Microsoft il suffit
        de suivre le guide
      </Typography>
    </Box>
  );
}

export default Step1;
