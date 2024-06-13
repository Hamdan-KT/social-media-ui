import { useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import HelperRoutes from "./HelperRoutes";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes(), HelperRoutes()]);
}
