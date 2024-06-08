import React, { useState } from "react";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Alert,
  Typography,
  styled,
  Card
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import ReviewForm from "./ReviewForm";
import SiteForm from "./SiteForm";
import { MatxLoading } from "app/components";

const getSteps = () =>
  ["Informations site", "Revue de la demande"].map((step) => (
    <Typography key={step} sx={{ fontFamily: "DM Sans" }}>
      <strong>{step}</strong>
    </Typography>
  ));

const stepsFields = [
  [
    "Title",
    "objectif",
    "Template",
    "catégorie",
    "Description",
    "Url",
    "Owner",
    "StorageQuota",
    "StorageQuotaWarningLevel"
  ],
  [] // Add an empty array for the review step to avoid errors
];

const getStepContent = (step, formData, methods) => {
  const UnknownStep = () => <Typography sx={{ fontFamily: "DM Sans" }}>Unknown step</Typography>;
  switch (step) {
    case 0:
      return <SiteForm formData={formData} methods={methods} />;
    case 1:
      return <ReviewForm formData={formData} />;
    default:
      return <UnknownStep />;
  }
};

export default function StepperForm() {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm();
  const { reset } = methods;

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    const currentStepFields = stepsFields[activeStep];
    if (currentStepFields) {
      const areFieldsValid = currentStepFields.every((fieldId) => {
        const fieldValue = methods.getValues(fieldId);
        return !!fieldValue;
      });

      if (areFieldsValid) {
        setShowErrorAlert(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setShowErrorAlert(true);
        setErrorAlertMessage(
          "Il faut remplir tous les champs avant de passer à l'étape suivante !"
        );
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => {
    setActiveStep(0);
    reset();
    setSubmissionSuccess(false);
    setIsLoading(false);
  };

  const onSubmit = async () => {
    const userId = "08dc6e82-7e49-49a6-8d5c-12ea5970df0e";
    const statut = ["En attente", "Acceptée", "Refusée"];

    const formData = methods.getValues();
    const accessToken = localStorage.getItem("authToken");

    setIsLoading(true);

    try {
      const response = await fetch("https://localhost:7048/api/Demande_SharePoint", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...formData, statut: statut[0], userId })
      });

      if (response.ok) {
        setSubmissionSuccess(true);
        handleNext();
      } else if (response.status === 409) {
        const errorData = await response.json();
        setShowErrorAlert(true);
        setErrorAlertMessage(
          errorData.message || "Un site similaire existe déjà !  Merci de consulter vos sites "
        );
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit the form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setShowErrorAlert(true);
      setErrorAlertMessage("Une erreur est survenue lors de la soumission du formulaire.");
    } finally {
      setIsLoading(false);
    }
  };

  const CardHeader = styled(Box)(() => ({
    display: "flex",
    paddingLeft: "24px",
    paddingRight: "24px",
    marginBottom: "12px",
    alignItems: "center",
    justifyContent: "center"
  }));

  const Title = styled("span")(() => ({
    fontSize: "1.25rem",
    fontWeight: "550",
    textAlign: "center",
    fontFamily: "DM Sans"
  }));

  return (
    <FormProvider {...methods}>
      <Card
        style={{
          marginBottom: "2%",
          padding: "30px"
        }}
      >
        <CardHeader>
          <Title>Formulaire de création d'un site SharePoint</Title>
        </CardHeader>
        <Box>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box mt={4}>
            {submissionSuccess ? (
              <Box>
                <Alert variant="filled" severity="success" sx={{ fontFamily: "DM Sans" }}>
                  Merci ! Votre demande a été soumise avec succès
                </Alert>
                <Button
                  style={{ marginTop: "2%" }}
                  sx={{ fontFamily: "DM Sans" }}
                  variant="contained"
                  color="inherit"
                  onClick={handleReset}
                >
                  Demander un autre site
                </Button>
              </Box>
            ) : (
              <div>
                <Typography sx={{ fontFamily: "DM Sans" }}>
                  {getStepContent(activeStep, methods.getValues(), methods)}
                </Typography>

                <Box mt={4}>
                  <Button
                    variant="contained"
                    color="inherit"
                    disabled={activeStep === 0 || isLoading}
                    onClick={handleBack}
                    sx={{ fontFamily: "DM Sans" }}
                  >
                    Retour
                  </Button>

                  <Button
                    sx={{ ml: 2, fontFamily: "DM Sans" }}
                    type={activeStep === steps.length - 1 ? "submit" : "button"}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (activeStep === steps.length - 1) {
                        onSubmit();
                      } else {
                        handleNext();
                      }
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <MatxLoading />
                    ) : activeStep === steps.length - 1 ? (
                      "Soumettre"
                    ) : (
                      "Suivant"
                    )}
                  </Button>
                </Box>
                {showErrorAlert && (
                  <Alert
                    variant="filled"
                    severity="error"
                    sx={{ fontFamily: "DM Sans", marginTop: "1rem" }}
                  >
                    {errorAlertMessage}
                  </Alert>
                )}
              </div>
            )}
          </Box>
        </Box>
      </Card>
    </FormProvider>
  );
}
