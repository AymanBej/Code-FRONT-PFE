export const navigations = [
  /////// Page d'accueil Admin //////
  { name: "Page d'accueil", path: "/admin/accueil", icon: "home", layout: "layoutAccueilAdmin" },
  { name: "Profil", path: "/profil", icon: "assignment_ind", layout: "layoutAccueilAdmin" },
  {
    name: "Déconnexion",
    iconText: "SI",
    path: "/auth",
    icon: "power_settings_new",
    layout: "layoutAccueilAdmin"
  },
  { name: "Aide", path: "/aide", icon: "info", layout: "layoutAccueilAdmin" },

  /////// Page SharePoint Admin //////
  {
    name: "Tableau de bord",
    path: "/admin/sharepoint/accueil",
    icon: "dashboard",
    layout: "layoutSharePointAdmin"
  },
  { name: "Utilisateurs", path: "/utilisateurs", icon: "people", layout: "layoutSharePointAdmin" },
  {
    name: "Demandes",
    path: "/demandes",
    icon: "format_list_bulleted",
    layout: "layoutSharePointAdmin"
  },
  {
    name: "Sites",
    path: "/sites",
    icon: "web",
    layout: "layoutSharePointAdmin"
  },
  { name: "Profil", path: "/profil", icon: "assignment_ind", layout: "layoutSharePointAdmin" },

  {
    name: "Déconnexion",
    iconText: "SI",
    path: "/auth",
    icon: "power_settings_new",
    layout: "layoutSharePointAdmin"
  },

  { name: "Aide", path: "/aide", icon: "info", layout: "layoutSharePointAdmin" },

  {
    name: "Charts",
    icon: "trending_up",
    children: [{ name: "Echarts", path: "/charts/echarts", iconText: "E" }],
    layout: "layoutExchangeAdmin"
  },

  {
    name: "Documentation",
    icon: "launch",
    type: "extLink",
    path: "http://demos.ui-lib.com/matx-react-doc/",
    layout: "layoutPowerAutomateAdmin"
  },

  { label: "Components", type: "label" },
  {
    name: "Components",
    icon: "favorite",
    badge: { value: "30+", color: "secondary" },
    children: [
      { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
      { name: "Buttons", path: "/material/buttons", iconText: "B" },
      { name: "Checkbox", path: "/material/checkbox", iconText: "C" },
      { name: "Dialog", path: "/material/dialog", iconText: "D" },
      { name: "Expansion Panel", path: "/material/expansion-panel", iconText: "E" },
      { name: "Form", path: "/material/form", iconText: "F" },
      { name: "Icons", path: "/material/icons", iconText: "I" },
      { name: "Menu", path: "/material/menu", iconText: "M" },
      { name: "Progress", path: "/material/progress", iconText: "P" },
      { name: "Radio", path: "/material/radio", iconText: "R" },
      { name: "Switch", path: "/material/switch", iconText: "S" },
      { name: "Slider", path: "/material/slider", iconText: "S" },
      { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
      { name: "Table", path: "/material/table", iconText: "T" }
    ],
    layout: "layoutTeamsAdmin"
  },

  {
    name: "Session/Auth",
    icon: "security",
    children: [{ name: "Error", iconText: "404", path: "/session/404" }],
    layout: "layoutPowerAutomateAdmin"
  },
  { name: "Create Apps", icon: "add", path: "/createApps", layout: "layoutSharePointAdmin" },

  { name: "Aide", path: "/aide", icon: "info", layout: "layoutExchangeAdmin" },
  { name: "Aide", path: "/aide", icon: "info", layout: "layoutTeamsAdmin" },
  { name: "Aide", path: "/aide", icon: "info", layout: "layoutPowerAutomateAdmin" },

  {
    name: "Accueil",
    path: "/user/accueil",
    icon: "home",
    layout: "layoutAccueilUser"
  },
  {
    name: "Tableau de bord",
    path: "/user/sharepoint/accueil",
    icon: "dashboard",
    layout: "layoutSharePointUser"
  },

  { name: "Profil", path: "/profil", icon: "assignment_ind", layout: "layoutAccueilUser" },

  {
    name: "Demandes",
    path: "/demandesUser",
    icon: "format_list_bulleted",
    layout: "layoutSharePointUser"
  },
  { name: "Profil", path: "/profil", icon: "assignment_ind", layout: "layoutSharePointUser" },

  {
    name: "Déconnexion",
    iconText: "SI",
    path: "/auth",
    icon: "power_settings_new",
    layout: "layoutSharePointUser"
  },
  {
    name: "Déconnexion",
    iconText: "SI",
    path: "/auth",
    icon: "power_settings_new",
    layout: "layoutAccueilUser"
  },
  { name: "Aide", path: "/aide", icon: "info", layout: "layoutAccueilUser" },

  { name: "Aide", path: "/aide", icon: "info", layout: "layoutSharePointUser" }

  // { name: "Calendrier", path: "/calendrier", icon: "event", layout: "layoutAccueilAdmin" },
];
