import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import materialRoutes from "app/views/material-kit/MaterialRoutes";

// SESSION PAGES
const NotFound = Loadable(lazy(() => import("app/views/authentification/NotFound")));
const Authentification = Loadable(lazy(() => import("app/views/authentification/Auth")));
// const JwtRegister = Loadable(lazy(() => import("app/views/authentification/JwtRegister")));
// const ForgotPassword = Loadable(lazy(() => import("app/views/authentification/ForgotPassword")));
// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import("app/views/charts/echarts/AppEchart")));

// SahrePoint Admin
const SharePointAdminAccueil = Loadable(
  lazy(() => import("app/views/admin/sharePoint/accueilSharePoint/Dashboard"))
);
const UsersTab = Loadable(lazy(() => import("app/views/admin/sharePoint/users/UsersTab")));
const DemandeTabAdmin = Loadable(
  lazy(() => import("app/views/admin/sharePoint/demandes/DemandeTab"))
);
const SitesTabAdmin = Loadable(lazy(() => import("app/views/admin/sharePoint/sites/SitesTab")));

// SahrePoint User
const UserSharePointAccueil = Loadable(
  lazy(() => import("app/views/user/sharepoint/accueil/AccueilSP"))
);
const DemandeTabUser = Loadable(
  lazy(() => import("app/views/user/sharepoint/demandes/DemandeTabUser"))
);

// Home Page
const AccueilAdmin = Loadable(lazy(() => import("app/views/admin/accueil/AccueilAdmin")));
const AccueilUser = Loadable(lazy(() => import("app/views/user/accueil/AccueilUser")));

const Calendar = Loadable(lazy(() => import("app/views/calendrier/Calendrier")));
const Profil = Loadable(lazy(() => import("app/views/profil/Profil")));
const Help = Loadable(lazy(() => import("app/views/aide/Aide")));
const StepsApps = Loadable(lazy(() => import("app/views/admin/stepperApps/StepperApps")));

const routes = [
  // session pages route
  { path: "/auth", element: <Authentification /> },
  { path: "/createApps", element: <StepsApps /> },
  // { path: "/session/forgot-password", element: <ForgotPassword /> },
  { path: "/session/404", element: <NotFound /> },

  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,

      // e-chart route
      { path: "/charts/echarts", element: <AppEchart />, auth: authRoles.editor },
      // accueil route
      { path: "/admin/accueil", element: <AccueilAdmin />, auth: authRoles.admin },
      { path: "/user/accueil", element: <AccueilUser />, auth: authRoles.admin },

      // SharePoint Admin Route
      {
        path: "/admin/sharepoint/accueil",
        element: <SharePointAdminAccueil />,
        auth: authRoles.admin
      },
      { path: "/demandes", element: <DemandeTabAdmin />, auth: authRoles.admin },
      { path: "/sites", element: <SitesTabAdmin />, auth: authRoles.admin },
      { path: "/utilisateurs", element: <UsersTab />, auth: authRoles.admin },

      // SharePoint User Route
      {
        path: "/user/sharepoint/accueil",
        element: <UserSharePointAccueil />,
        auth: authRoles.admin
      },
      { path: "/demandesUser", element: <DemandeTabUser />, auth: authRoles.admin },

      // Routes Standard
      { path: "/calendrier", element: <Calendar />, auth: authRoles.admin },
      { path: "/profil", element: <Profil />, auth: authRoles.admin },
      { path: "/aide", element: <Help />, auth: authRoles.admin }
    ]
  },

  { path: "/", element: <Navigate to="/auth" /> }, // Redirection vers la page de connexion
  { path: "*", element: <NotFound /> }
];

export default routes;
