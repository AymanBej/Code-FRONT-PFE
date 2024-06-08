import { Link } from "react-router-dom";

export default function MatxLogo({ className }) {
  return (
    <Link to="/admin/accueil">
      <img className={className} width={"80%"} src="/assets/images/logos/logob.png" alt="" />
    </Link>
  );
}
