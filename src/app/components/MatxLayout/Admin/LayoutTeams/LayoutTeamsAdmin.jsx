import { useEffect, useRef, memo } from "react";
import { ThemeProvider, useMediaQuery, Box, styled, useTheme } from "@mui/material";
import Scrollbar from "react-perfect-scrollbar";
import { Outlet } from "react-router-dom";

import useSettings from "app/hooks/useSettings";

import LayoutTeamsAdminTopbar from "./LayoutTeamsAdminTopbar";
import LayoutTeamsAdminSidenav from "./LayoutTeamsAdminSidenav";

import Footer from "app/components/Footer";
import { MatxSuspense } from "app/components";
import SidenavTheme from "app/components/MatxTheme/SidenavTheme/SidenavTheme";

import { sidenavCompactWidth, sideNavWidth } from "app/utils/constant";



// STYLED COMPONENTS

const LayoutTeamsAdminRoot = styled(Box)(({ theme }) => ({
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

const LayoutTeamsAdmin = () => {
  const { settings, updateSettings } = useSettings();
  const { layoutTeamsAdminSettings, secondarySidebar } = settings;
  const topbarTheme = settings.themes[layoutTeamsAdminSettings.topbar.theme];
  const {
    leftSidebar: { mode: sidenavMode, show: showSidenav }
  } = layoutTeamsAdminSettings;

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
    let sidebarMode = settings.layoutTeamsAdminSettings.leftSidebar.mode;
    if (settings.layoutTeamsAdminSettings.leftSidebar.show) {
      let mode = isMdScreen ? "close" : sidebarMode;
      updateSettings({ layoutTeamsAdminSettings: { leftSidebar: { mode } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdScreen]);

  return (
    <LayoutTeamsAdminRoot className={layoutClasses}>
      {showSidenav && sidenavMode !== "close" && (
        <SidenavTheme>
          <LayoutTeamsAdminSidenav />
        </SidenavTheme>
      )}

      <LayoutContainer width={sidenavWidth} open={secondarySidebar.open}>
        {layoutTeamsAdminSettings.topbar.show && layoutTeamsAdminSettings.topbar.fixed && (
          <ThemeProvider theme={topbarTheme}>
            <LayoutTeamsAdminTopbar fixed={true} className="elevation-z8" />
          </ThemeProvider>
        )}

        {settings.perfectScrollbar && (
          <StyledScrollBar>
            {layoutTeamsAdminSettings.topbar.show && !layoutTeamsAdminSettings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <LayoutTeamsAdminTopbar />
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
            {layoutTeamsAdminSettings.topbar.show && !layoutTeamsAdminSettings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <LayoutTeamsAdminTopbar />
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

    </LayoutTeamsAdminRoot>
  );
};

export default memo(LayoutTeamsAdmin);
