import { useEffect, useRef, memo } from "react";
import { ThemeProvider, useMediaQuery, Box, styled, useTheme } from "@mui/material";
import Scrollbar from "react-perfect-scrollbar";
import { Outlet } from "react-router-dom";

import useSettings from "app/hooks/useSettings";

import LayoutSharePointUserTopbar from "./LayoutSharePointUserTopbar";
import LayoutSharePointUserSidenav from "./LayoutSharePointUserSidenav";

import Footer from "app/components/Footer";
import { MatxSuspense } from "app/components";
import SidenavTheme from "app/components/MatxTheme/SidenavTheme/SidenavTheme";

import { sidenavCompactWidth, sideNavWidth } from "app/utils/constant";



// STYLED COMPONENTS

const LayoutSharePointUserRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  background: theme.palette.background.default
}));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  overflowY: "auto",
  overflowX: "hidden",
  flexDirection: "column",
  justifyContent: "space-between"
}));

const StyledScrollBar = styled(Scrollbar)(() => ({
  height: "100%",
  position: "relative",
  display: "flex",
  flexGrow: "1",
  flexDirection: "column"
}));

const LayoutContainer = styled(Box)(({ width, open }) => ({
  height: "100vh",
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
  verticalAlign: "top",
  marginLeft: width,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  marginRight: open ? 50 : 0
}));

const LayoutSharePointUser = () => {
  const { settings, updateSettings } = useSettings();
  const { layoutSharePointUserSettings, secondarySidebar } = settings;
  const topbarTheme = settings.themes[layoutSharePointUserSettings.topbar.theme];
  const {
    leftSidebar: { mode: sidenavMode, show: showSidenav }
  } = layoutSharePointUserSettings;

  const getSidenavWidth = () => {
    switch (sidenavMode) {
      case "full":
        return sideNavWidth;

      case "compact":
        return sidenavCompactWidth;

      default:
        return "0px";
    }
  };

  const sidenavWidth = getSidenavWidth();
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const ref = useRef({ isMdScreen, settings });
  const layoutClasses = `theme-${theme.palette.type}`;

  useEffect(() => {
    let { settings } = ref.current;
    let sidebarMode = settings.layoutSharePointUserSettings.leftSidebar.mode;
    if (settings.layoutSharePointUserSettings.leftSidebar.show) {
      let mode = isMdScreen ? "close" : sidebarMode;
      updateSettings({ layoutSharePointUserSettings: { leftSidebar: { mode } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdScreen]);

  return (
    <LayoutSharePointUserRoot className={layoutClasses}>
      {showSidenav && sidenavMode !== "close" && (
        <SidenavTheme>
          <LayoutSharePointUserSidenav />
        </SidenavTheme>
      )}

      <LayoutContainer width={sidenavWidth} open={secondarySidebar.open}>
        {layoutSharePointUserSettings.topbar.show && layoutSharePointUserSettings.topbar.fixed && (
          <ThemeProvider theme={topbarTheme}>
            <LayoutSharePointUserTopbar fixed={true} className="elevation-z8" />
          </ThemeProvider>
        )}

        {settings.perfectScrollbar && (
          <StyledScrollBar>
            {layoutSharePointUserSettings.topbar.show && !layoutSharePointUserSettings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <LayoutSharePointUserTopbar />
              </ThemeProvider>
            )}
            <Box flexGrow={1} position="relative">
              <MatxSuspense>
                <Outlet />
              </MatxSuspense>
            </Box>

            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </StyledScrollBar>
        )}

        {!settings.perfectScrollbar && (
          <ContentBox>
            {layoutSharePointUserSettings.topbar.show && !layoutSharePointUserSettings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <LayoutSharePointUserTopbar />
              </ThemeProvider>
            )}

            <Box flexGrow={1} position="relative">
              <MatxSuspense>
                <Outlet />
              </MatxSuspense>
            </Box>

            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </ContentBox>
        )}

        {settings.footer.show && settings.footer.fixed && <Footer />}
      </LayoutContainer>

    </LayoutSharePointUserRoot>
  );
};

export default memo(LayoutSharePointUser);
