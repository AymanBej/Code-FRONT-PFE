import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import { useMsal, MsalProvider } from "@azure/msal-react";
import msalInstance from "../../../AuthConfig";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();
const bgimg = "/assets/images/Authentification/background.png";
const imagebg = "/assets/images/Authentification/governet_auth.png";
const scopes = [
  "user.read",
  "Sites.Manage.All",
  "Sites.ReadWrite.All",
  "Sites.FullControl.All",
  "Reports.Read.All",
  "User.Read.All",
  "User.ReadBasic.All"
];

export function SignInSide() {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup({scopes});
      if (loginResponse && loginResponse.account && loginResponse.accessToken) {
        console.log("User logged in:", loginResponse);
        console.log("Access token:", loginResponse.accessToken);
        console.log(loginResponse.account);
        localStorage.setItem("authToken", loginResponse.accessToken);
        navigate("/admin/accueil");

        //const isAdmin = await checkAdminRole();
        await UserProfile();
        // console.log("Is Admin:", isAdmin);

        //await fetchUserData(loginResponse.accessToken);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  const handleSign = async () => {
    navigate("/createApps");
  };

  // const fetchUserData = async (accessToken) => {
  //   try {
  //     await fetch("https://localhost:7048/api/Auth/user", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`
  //       },
  //       body: JSON.stringify({
  //         userId: instance.getActiveAccount().localAccountId,
  //         FirstName: instance.getActiveAccount().name,
  //         LastName: instance.getActiveAccount().name,
  //         Email: instance.getActiveAccount().username,
  //         Phone: "100000000",
  //         Avatar: "https://www.shajhbsd.com",
  //         Gender: "Male",
  //         isAdmin: await checkAdminRole() // Include isAdmin value in the user data
  //       })
  //     });
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  // const checkAdminRole = async () => {
  //   try {
  //     const accessToken = localStorage.getItem("authToken");
  //     const response = await fetch("https://graph.microsoft.com/v1.0/me/memberOf", {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch user group membership");
  //     }

  //     const data = await response.json();
  //     console.log("Group membership data:", data);

  //     const isAdmin = data.value.some(
  //       (group) => group.id === "82db7a95-6269-413c-a90e-175d766599fb"
  //     );

  //     return isAdmin;
  //   } catch (error) {
  //     console.error("Error checking admin role:", error);
  //     return false;
  //   }
  // };

  const UserProfile = async () => {
    try {
      const accessToken = localStorage.getItem("authToken");

      const graphResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const userData = await graphResponse.json();
      localStorage.setItem("UserInfo", userData);

      const photoResponse = await fetch("https://graph.microsoft.com/v1.0/me/photo", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const photoData = await photoResponse.json();
      localStorage.setItem("UserPhotoUrl", photoData?.value ?? null);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  React.useEffect(() => {
    const renewToken = async () => {
      try {
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
          const silentRequest = {
            scopes,
            account: accounts[0]
          };
          await instance.acquireTokenSilent(silentRequest);
        }
      } catch (error) {
        console.error("Error renewing token:", error);
      }
    };

    renewToken();
  }, [instance]); // Renew token when instance changes

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
          backgroundImage: `url(${imagebg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <Grid container component="main" sx={{ width: "70%", height: "50%" }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${bgimg})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: "80%",
              backgroundPosition: "center"
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={5} square>
            <Box
              sx={{
                my: 16,
                mx: 4,
                display: "flex",
                justifyConten: "center",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Typography
                color={"#181834"}
                fontFamily={"DM Sans"}
                fontSize={"30px"}
                variant="h3"
                align="center"
                mb={"5%"}
              >
                Bienvenue chez Governet
              </Typography>

              <Avatar sx={{ m: 1, bgcolor: "#0d5195" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Connexion
              </Typography>
              <Button
                onClick={handleLogin}
                variant="contained"
                startIcon={<MicrosoftIcon />}
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "#0d5195",
                  "&:hover": {
                    bgcolor: "#181834"
                  },
                  fontFamily: "DM Sans"
                }}
              >
                Se connecter avec Microsoft
              </Button>

              <Typography mt={"5%"} fontFamily="DM Sans" variant="subtitle1" align="center">
                Notre application offre des fonctionnalités de gouvernance des services Microsoft
                365 qui facilitent la gestion des tâches administratives.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

function Auth() {
  return (
    <MsalProvider instance={msalInstance}>
      <SignInSide />
    </MsalProvider>
  );
}

export default Auth;
