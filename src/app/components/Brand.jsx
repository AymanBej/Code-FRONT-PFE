import { Box, styled } from "@mui/material";

import { Span } from "./Typography";
import { MatxLogo } from "app/components";
import useSettings from "app/hooks/useSettings";

// STYLED COMPONENTS
const BrandRoot = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "25px 20px 25px 32px"
}));

const StyledSpan = styled(Span)(({ mode }) => ({
  fontSize: 25,
  display: mode === "compact" ? "none" : "block",
  fontFamily: "DM Sans",
  cursor: "default"
}));

export default function Brand({ children }) {
  const { settings } = useSettings();
  const leftSidebar = settings.layoutAccueilAdminSettings.leftSidebar;
  const { mode } = leftSidebar;

  return (
    <BrandRoot>
        <Box display="flex" alignItems="center">
          <MatxLogo  />
          <StyledSpan mode={mode} className="sidenavHoverShow">
            Governet
          </StyledSpan>
        </Box>

      <Box className="sidenavHoverShow" sx={{ display: mode === "compact" ? "none" : "block" }}>
        {children || null}
      </Box>
    </BrandRoot>
  );
}
