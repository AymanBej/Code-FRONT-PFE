import { memo } from "react";
import { Hidden, Switch, Box, styled, useTheme } from "@mui/material";

import useSettings from "app/hooks/useSettings";

import Brand from "app/components/Brand";
import Sidenav from "app/components/Sidenav";
import { themeShadows } from "app/components/MatxTheme/themeColors";

import { convertHexToRGB } from "app/utils/utils";
import { sidenavCompactWidth, sideNavWidth } from "app/utils/constant";

// STYLED COMPONENTS
const SidebarNavRoot = styled(Box)(({ theme, width, bg, image }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: width,
  boxShadow: themeShadows[8],
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top",
  backgroundSize: "cover",
  zIndex: 111,
  overflow: "hidden",
  color: theme.palette.text.primary,
  transition: "all 250ms ease-in-out",
  backgroundImage: `linear-gradient(to bottom, rgba(${bg}, 0.96), rgba(${bg}, 0.96)), url(${image})`,
  "&:hover": {
    width: sideNavWidth,
    "& .sidenavHoverShow": { display: "block" },
    "& .compactNavItem": {
      width: "100%",
      maxWidth: "100%",
      "& .nav-bullet": { display: "block" },
      "& .nav-bullet-text": { display: "none" }
    }
  }
}));

const NavListBox = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column"
});

const LayoutExchangeUserSidenav = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const leftSidebar = settings.layoutExchangeUserSettings.leftSidebar;
  const { mode, bgImgURL } = leftSidebar;

  const getSidenavWidth = () => {
    switch (mode) {
      case "compact":
        return sidenavCompactWidth;

      default:
        return sideNavWidth;
    }
  };

  const primaryRGB = convertHexToRGB(theme.palette.primary.main);

  // const updateSidebarMode = (sidebarSettings) => {
  //   updateSettings({ layoutExchangeUserSettings: { leftSidebar: { ...sidebarSettings } } });
  // };

  // const handleSidenavToggle = () => {
  //   updateSidebarMode({ mode: mode === "full" ? "compact" : "full" });
  // };

  return (
    <SidebarNavRoot image={bgImgURL} bg={primaryRGB} width={getSidenavWidth()}>
      <NavListBox>
        <Brand>
          <Hidden smDown>
            {/* <Switch
              onChange={handleSidenavToggle}
              checked={leftSidebar.mode !== "compact"}
              color="secondary"
              size="small"
            /> */}
          </Hidden>
        </Brand>
        <Sidenav />
      </NavListBox>
    </SidebarNavRoot>
  );
};

export default memo(LayoutExchangeUserSidenav);
