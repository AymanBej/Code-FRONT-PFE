import { lazy } from "react";

export const LayoutAccueilAdmin = { layoutAccueilAdmin: lazy(() => import("./Admin/LayoutAccueil/LayoutAccueilAdmin")) };
export const LayoutSharePointAdmin = { layoutSharePointAdmin: lazy(() => import("./Admin/LayoutSharePoint/LayoutSharePointAdmin")) };
export const LayoutExchangeAdmin= { layoutExchangeAdmin: lazy(() => import("./Admin/LayoutExchange/LayoutExchangeAdmin")) };
export const LayoutTeamsAdmin = { layoutTeamsAdmin: lazy(() => import("./Admin/LayoutTeams/LayoutTeamsAdmin")) };
export const LayoutPowerAutomateAdmin = { layoutPowerAutomateAdmin: lazy(() => import("./Admin/LayoutPowerAutomate/LayoutPowerAutomateAdmin")) };
export const LayoutAccueilUser= { layoutAccueilUser: lazy(() => import("./User/LayoutAccueil/LayoutAccueilUser")) };
export const LayoutExchangeUser= { layoutExchangeUser: lazy(() => import("./User/LayoutExchange/LayoutExchangeUser")) };
export const LayoutPowerAutomateUser= { layoutPowerAutomateUser: lazy(() => import("./User/LayoutPowerAutomate/LayoutPowerAutomateUser")) };
export const LayoutSharePointUser= { layoutSharePointUser: lazy(() => import("./User/LayoutSharePoint/LayoutSharePointUser")) };
export const LayoutTeamsUser= { layoutTeamsUser: lazy(() => import("./User/LayoutTeams/LayoutTeamsUser")) };


