import React from "react";
import { useEffect, useState } from "react";

import {
  MenuItem,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Alert,
  Typography,
  styled,
  Avatar,
  Grid,
  Hidden,
  Paper
} from "@mui/material";
import { Span } from "app/components/Typography";
import { Link } from "react-router-dom";

import { useForm, FormProvider, Controller } from "react-hook-form";
import Step1 from "./steps/Step1";

import { MatxMenu } from "app/components";

import { PowerSettingsNew } from "@mui/icons-material";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";

// Define the getSteps function
const getSteps = () =>
  ["1ére Étape", "2éme Étape", "3éme Étape", "Dernière Étape "].map((step) => (
    <Typography sx={{ fontFamily: "DM Sans" }}>
      <strong>{step}</strong>
    </Typography>
  ));

const FormField = ({ id, label, ...props }) => (
  <Controller
    name={id}
    render={({ field }) => (
      <TextField
        id={id}
        label={label}
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ fontFamily: "DM Sans" }}
        InputLabelProps={{
          sx: {
            fontFamily: "DM Sans"
          }
        }}
        InputProps={{
          sx: {
            fontFamily: "DM Sans"
          }
        }}
        {...field}
        {...props}
      />
    )}
  />
);

const SiteForm = () => {
  return (
    <Box>
      <Typography style={{ fontFamily: "DM Sans", fontSize: "25px" }} variant="h4" gutterBottom>
        Remplir les champs suivants
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <FormField id="clientid" label="ClientID" required />
        </Grid>
        <Grid item xs={10}>
          <FormField id="tenantid" label="TenantID" required />
        </Grid>
      </Grid>
    </Box>
  );
};

// Define your step content function
const getStepContent = (step, formData) => {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return <Step3 />;
    case 3:
      return <SiteForm />;
    default:
      return "unknown step";
  }
};

export default function StepperApps() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [setuserid] = useState();
  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    console.log("Fetching data...");
    const fetchData = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("authToken");

        const url = "https://graph.microsoft.com/beta/me";
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });

        const fetchedData = await response.json();
        console.log("Fetched data:", fetchedData); // Log the fetched data
        setData(fetchedData);
        setuserid(fetchedData.id);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("topbar data updated:", data);
  }, [data]);
  useEffect(() => {
    console.log("Data has been updated:", data);
    if (data.id) {
      fetchAvatar(data.id);
    }
  }, [data]);
  const fetchAvatar = async (userId) => {
    try {
      const accessToken = localStorage.getItem("authToken");
      const url = `https://graph.microsoft.com/v1.0/users/${userId}/photo/$value`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.ok) {
        const blob = await response.blob();
        const avatarUrl = URL.createObjectURL(blob);
        setAvatarUrl(avatarUrl);
      } else {
        console.error("Failed to fetch avatar:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching avatar:", error);
    }
  };
  const methods = useForm(); // Initialize the useForm hook
  const { handleSubmit, reset } = methods; // Destructure reset method

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps(); // Use the getSteps function to get step labels

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleReset = () => {
    setActiveStep(0);
    reset(); // Reset form fields to their default values
  };
  const UserMenu = styled(Box)({
    padding: 4,
    display: "flex",
    borderRadius: 24,
    cursor: "pointer",
    alignItems: "center",
    "& span": { margin: "0 8px" }
  });

  const onSubmit = (data) => {
    console.log("Formulaire data :", data); // Handle form submission data
    handleNext(); // Move to the next step after successful submission
  };
  const StyledItem = styled(MenuItem)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    minWidth: 185,
    "& a": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      textDecoration: "none"
    },
    "& span": { marginRight: "10px", color: theme.palette.text.primary }
  }));

  return (
    <div>
      <Box
        sx={{
          position: "relative",
          backgroundImage: "url('/assets/images/Authentification/governet_auth.png')", // Remplacez '/path/to/your/image.jpg' par le chemin de votre image
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <Box style={{ position: "absolute", top: 10, right: 10 }}>
          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown></Hidden>
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <Avatar
                    src={avatarUrl || "https://via.placeholder.com/150"}
                    sx={{ cursor: "pointer" }}
                  />
                )}
                <Span style={{ fontFamily: "DM Sans", fontSize: "15px", color: "#b2b1bb" }}>
                  <strong>{data.displayName}</strong>
                </Span>
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/auth">
                <PowerSettingsNew style={{ marginRight: "8%" }} />
                <Span style={{ fontFamily: "DM Sans", fontSize: "15px" }}>Déconnexion</Span>
              </Link>
            </StyledItem>
          </MatxMenu>
        </Box>

        <Paper
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "70%",
            marginTop: "2%",
            borderRadius: "20px"
          }}
        >
          <FormProvider {...methods}>
            <Box width={"80%"} marginBottom={"2%"} marginTop={"2%"}>
              <Typography
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "30px",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "2%"
                }}
                variant="h3"
                gutterBottom
              >
                Bienvenu dans notre guide de création de l'application
              </Typography>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box mt={4}>
                {activeStep === steps.length ? (
                  <Box>
                    <Alert variant="filled" severity="success" sx={{ fontFamily: "DM Sans" }}>
                      Merci ! Votre création est effectuée avec succès
                    </Alert>

                    <Button
                      style={{ marginTop: "2%" }}
                      sx={{ fontFamily: "DM Sans" }}
                      variant="contained"
                      color="inherit"
                      onClick={handleReset}
                    >
                      Essayer de nouveau
                    </Button>
                  </Box>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                      <Typography sx={{ fontFamily: "DM Sans" }}>
                        {getStepContent(activeStep, methods.getValues())}
                      </Typography>

                      <Box mt={4}>
                        <Button
                          variant="contained"
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ fontFamily: "DM Sans" }}
                        >
                          Retour
                        </Button>

                        <Button
                          sx={{ ml: 2, fontFamily: "DM Sans" }}
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          {activeStep === steps.length - 1 ? "Soumettre" : "Suivant"}
                        </Button>
                      </Box>
                    </Box>
                  </form>
                )}
              </Box>
            </Box>
          </FormProvider>
        </Paper>
      </Box>
    </div>
  );
}
