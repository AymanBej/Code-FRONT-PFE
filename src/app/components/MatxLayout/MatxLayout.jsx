import { MatxSuspense } from "app/components";
import useSettings from "app/hooks/useSettings";
import {
  LayoutTeamsUser,
  LayoutSharePointUser,
  LayoutPowerAutomateUser,
  LayoutAccueilAdmin,
  LayoutSharePointAdmin,
  LayoutExchangeAdmin,
  LayoutTeamsAdmin,
  LayoutPowerAutomateAdmin,
  LayoutAccueilUser,
  LayoutExchangeUser
} from "./index";

export default function MatxLayout(props) {
  const { settings } = useSettings();

  // Mapping des layouts
  const layouts = {
    layoutAccueilAdmin: LayoutAccueilAdmin.layoutAccueilAdmin,
    layoutAccueilUser: LayoutAccueilUser.layoutAccueilUser,
    layoutSharePointAdmin: LayoutSharePointAdmin.layoutSharePointAdmin,
    layoutExchangeAdmin: LayoutExchangeAdmin.layoutExchangeAdmin,
    layoutTeamsAdmin: LayoutTeamsAdmin.layoutTeamsAdmin,
    layoutPowerAutomateAdmin: LayoutPowerAutomateAdmin.layoutPowerAutomateAdmin,
    layoutExchangeUser: LayoutExchangeUser.layoutExchangeUser,
    layoutPowerAutomateUser: LayoutPowerAutomateUser.layoutPowerAutomateUser,
    layoutSharePointUser: LayoutSharePointUser.layoutSharePointUser,
    layoutTeamsUser: LayoutTeamsUser.layoutTeamsUser
  };

  // Sélectionnez le layout en fonction de settings.activeLayout
  const Layout = layouts[settings.activeLayout];

  return (
    <MatxSuspense>{Layout ? <Layout {...props} /> : <div>Layout non trouvé</div>}</MatxSuspense>
  );
}
