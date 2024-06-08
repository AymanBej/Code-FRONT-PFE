import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Avatar,
  CircularProgress,
  Container,
  Paper,
  Grid,
  TextField,
  CssBaseline
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Breadcrumb } from "app/components";

const defaultAvatarUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png";

const useStyles = {
  container: {
    marginBottom: "5%",
    padding: "2%"
  },

  avatar: {
    width: "80px",
    height: "80px",
    marginRight: "2%"
  }
};

const theme = createTheme({
  typography: {
    fontFamily: "DM Sans, sans-serif"
  }
});

const Profil = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatarUrl);

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Data has been updated:", data);
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

  return (
    <div style={{ margin: "auto", width: "85%", fontFamily: "DM Sans", padding: "2%" }}>
      <Box marginBottom={"2%"} className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Profil" }]} />
      </Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={useStyles.container}>
          <Paper elevation={3}>
            <Grid container spacing={2}>
              <Box display="flex" margin="auto" alignItems="center" justifyContent="center" p={2}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Avatar src={avatarUrl} alt="User Avatar" sx={useStyles.avatar} />
                )}
                <Box ml={2} textAlign="left">
                  <Typography variant="h6">{data.displayName}</Typography>
                  <Typography variant="body1">{data.mail}</Typography>
                </Box>
              </Box>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Box width="100%" maxWidth="600px" mb={10}>
                  <TextField
                    label="Nom Société"
                    value={data.companyName || "-"}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Métier"
                    value={data.jobTitle || "-"}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Département"
                    value={data.department || "-"}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Pays"
                    value={data.officeLocation || "-"}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Téléphone"
                    value={data.mobilePhone || "-"}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Profil;
