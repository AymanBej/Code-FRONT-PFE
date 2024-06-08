import { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { MatxLoading } from "app/components";
import PropTypes from "prop-types";

const ReviewForm = ({ formData }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        setUserData({
          Nom: fetchedData.displayName || "-",
          departement: fetchedData.department || "-",
          Fonction: fetchedData.jobTitle || "-",
          Email: fetchedData.mail || "-",
          Téléphone: fetchedData.mobilePhone || "-",
          Société: fetchedData.companyName || "-"
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Site data:", formData);
    console.log("User data:", userData);
  }, [formData, userData]);
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontFamily: "DM Sans" }}>
          Informations utilisateur (Compte du tenant):
        </Typography>
      </Grid>
      {loading ? (
        <MatxLoading></MatxLoading>
      ) : (
        <>
          {Object.keys(userData).map((key) => (
            <Grid item xs={4} key={key}>
              <TextField
                id={`outlined-read-only-input-${key}`}
                label={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize the first letter of the key
                defaultValue={userData[key]}
                InputProps={{
                  readOnly: true,
                  sx: {
                    fontFamily: "DM Sans",
                    width: "150%"
                  }
                }}
                InputLabelProps={{
                  sx: {
                    fontFamily: "DM Sans"
                  }
                }}
              />
            </Grid>
          ))}
        </>
      )}

      {/* Information du site */}
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontFamily: "DM Sans" }}>
          Informations site:
        </Typography>
      </Grid>
      {Object.keys(formData).map((key) => (
        <Grid item xs={4} key={key}>
          <TextField
            id={`outlined-read-only-input-${key}`}
            label={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize the first letter of the key
            defaultValue={formData[key]}
            InputProps={{
              readOnly: true,
              sx: {
                fontFamily: "DM Sans",
                width: "150%", // Adjust width for description field
                overflowY: key === "Description" ? "auto" : "visible" // Enable vertical scrolling only for description field
              }
            }}
            InputLabelProps={{
              sx: {
                fontFamily: "DM Sans"
              }
            }}
            multiline={key === "Description"} // Enable multiline only for description field
            rows={4} // Set the initial number of rows for description field
          />
        </Grid>
      ))}
    </Grid>
  );
};

ReviewForm.propTypes = {
  formData: PropTypes.object.isRequired // Specify the type for formData prop
};

export default ReviewForm;
