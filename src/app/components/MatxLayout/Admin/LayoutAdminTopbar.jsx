import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, styled, Avatar, Hidden, MenuItem, IconButton } from "@mui/material";

import { NotificationProvider } from "app/contexts/NotificationContext";

import useAuth from "app/hooks/useAuth";

import { Span } from "app/components/Typography";
import { MatxMenu, MatxSearchBox } from "app/components";
import { NotificationBar } from "app/components/NotificationBar";
import { themeShadows } from "app/components/MatxTheme/themeColors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { topBarHeight } from "app/utils/constant";

import { PowerSettingsNew } from "@mui/icons-material";
import HelpIcon from "@mui/icons-material/Help";
// STYLED COMPONENTS

const TopbarRoot = styled("div")({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: "all 0.3s ease"
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "20px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: { paddingLeft: 16, paddingRight: 16 },
  [theme.breakpoints.down("xs")]: { paddingLeft: 14, paddingRight: 16 }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: "flex",
  borderRadius: 24,
  cursor: "pointer",
  alignItems: "center",
  "& span": { margin: "0 8px" }
});

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

const LayoutAdminTopbar = ({ imageUrl }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("");
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
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {}, [data]);
  useEffect(() => {
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
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex" alignItems="center" sx={{ gap: "150px" }}>
          <img width={"15%"} src={imageUrl} alt="" />
          <MatxSearchBox />
        </Box>

        <Box display="flex" alignItems="center" sx={{ gap: "15px" }}>
          <Link to="/aide">
            <IconButton>
              <HelpIcon />
            </IconButton>
          </Link>
          <NotificationProvider>
            <NotificationBar />
          </NotificationProvider>

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

                <Span style={{ fontFamily: "DM Sans", fontSize: "15px" }}>
                  <strong>{data.displayName}</strong>
                </Span>
              </UserMenu>
            }
          >
            <StyledItem>
              <AccountCircleIcon style={{ marginRight: "8%" }} />
              <Link to="/profil">
                <Span style={{ fontFamily: "DM Sans", fontSize: "15px" }}>Profil</Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <PowerSettingsNew style={{ marginRight: "8%" }} />
              <Link to="/auth">
                <Span style={{ fontFamily: "DM Sans", fontSize: "15px" }}>Déconnexion</Span>
              </Link>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(LayoutAdminTopbar);
