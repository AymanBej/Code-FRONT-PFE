import { themes } from "../MatxTheme/initThemes";
import layoutAccueilAdminSettings from "./Admin/LayoutAccueil/LayoutAccueilAdminSettings";
import layoutSharePointAdminSettings from "./Admin/LayoutSharePoint/LayoutSharePointAdminSettings";
import layoutExchangeAdminSettings from "./Admin/LayoutExchange/LayoutExchangeAdminSettings";
import layoutTeamsAdminSettings from "./Admin/LayoutTeams/LayoutTeamsAdminSettings";
import layoutPowerAutomateAdminSettings from "./Admin/LayoutPowerAutomate/LayoutPowerAutomateAdminSettings";
import layoutAccueilUserSettings from "./User/LayoutAccueil/LayoutAccueilUserSettings";
import layoutExchangeUserSettings from "./User/LayoutExchange/LayoutExchangeUserSettings";
import layoutPowerAutomateUserSettings from "./User/LayoutPowerAutomate/LayoutPowerAutomateUserSettings";
import layoutSharePointUserSettings from "./User/LayoutSharePoint/LayoutSharePointUserSettings"; 
import layoutTeamsUser from "./User/LayoutTeams/LayoutTeamsUser";


import { navigations } from "app/navigations";

export const MatxLayoutSettings = {
  activeLayout: getDefaultLayout(),
  activeTheme: "blue",
  perfectScrollbar: false,

  themes: themes,
  layoutAccueilAdminSettings,
  layoutSharePointAdminSettings,
  layoutExchangeAdminSettings,
  layoutTeamsAdminSettings,
  layoutPowerAutomateAdminSettings,
  layoutAccueilUserSettings,
  layoutExchangeUserSettings,
  layoutPowerAutomateUserSettings,
  layoutSharePointUserSettings,
  layoutTeamsUser,

  secondarySidebar: {
    show: true,
    open: false,
    theme: "slateDark1"
  },
  footer: {
    show: true,
    fixed: false,
    theme: "slateDark1"
  }
};

function getDefaultLayout() {
  // Parcourez les éléments de navigation pour trouver le layout associé au chemin actuel
  const currentPath = window.location.pathname;
  for (const navItem of navigations) {
    if (navItem.path === currentPath) {
      return navItem.layout;
    }
  }
  return "layoutAccueilAdmin";
}
