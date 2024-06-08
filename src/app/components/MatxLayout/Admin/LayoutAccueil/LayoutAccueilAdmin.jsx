import { useEffect, useRef, memo } from "react";
import { ThemeProvider, useMediaQuery, Box, styled, useTheme } from "@mui/material";
import Scrollbar from "react-perfect-scrollbar";
import { Outlet } from "react-router-dom";

import useSettings from "app/hooks/useSettings";

import LayoutAccueilAdminTopbar from "./LayoutAccueilAdminTopbar";
import LayoutAccueilAdminSidenav from "./LayoutAccueilAdminSidenav";

import Footer from "app/components/Footer";
import { MatxSuspense } from "app/components";
import SidenavTheme from "app/components/MatxTheme/SidenavTheme/SidenavTheme";

import { sidenavCompactWidth, sideNavWidth } from "app/utils/constant";

// STYLED COMPONENTS

const LayoutAccueilAdminRoot = styled(Box)(({ theme }) => ({
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

const LayoutAccueilAdmin = () => {
  const { settings, updateSettings } = useSettings();
  const { layoutAccueilAdminSettings, secondarySidebar } = settings;
  const topbarTheme = settings.themes[layoutAccueilAdminSettings.topbar.theme];
  const {
    leftSidebar: { mode: sidenavMode, show: showSidenav }
  } = layoutAccueilAdminSettings;

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
    let sidebarMode = settings.layoutAccueilAdminSettings.leftSidebar.mode;
    if (settings.layoutAccueilAdminSettings.leftSidebar.show) {
      let mode = isMdScreen ? "close" : sidebarMode;
      updateSettings({ layoutAccueilAdminSettings: { leftSidebar: { mode } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdScreen]);

  return (
    <LayoutAccueilAdminRoot className={layoutClasses}>
      {showSidenav && sidenavMode !== "close" && (
        <SidenavTheme>
          <LayoutAccueilAdminSidenav />
        </SidenavTheme>
      )}

      <LayoutContainer width={sidenavWidth} open={secondarySidebar.open}>
        {layoutAccueilAdminSettings.topbar.show && layoutAccueilAdminSettings.topbar.fixed && (
          <ThemeProvider theme={topbarTheme}>
            <LayoutAccueilAdminTopbar fixed={true} className="elevation-z8" />
          </ThemeProvider>
        )}

        {settings.perfectScrollbar && (
          <StyledScrollBar>
            {layoutAccueilAdminSettings.topbar.show && !layoutAccueilAdminSettings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <LayoutAccueilAdminTopbar />
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
            {layoutAccueilAdminSettings.topbar.show && !layoutAccueilAdminSettings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <LayoutAccueilAdminTopbar />
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
    </LayoutAccueilAdminRoot>
  );
};

export default memo(LayoutAccueilAdmin);
