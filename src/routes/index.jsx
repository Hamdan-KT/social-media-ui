import { useLocation, useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import HelperRoutes from "./HelperRoutes";
import PopupRoutes from "./PopupRoutes";

// ==============================|| ROUTING RENDER ||============================== //

export default function AppRouting() {
	const location = useLocation();
	const previousLocation = location.state?.previousLocation;
	// routes
	const AppRoutes = useRoutes(
		[MainRoutes(), HelperRoutes()],
		previousLocation || location
	);
	const PopuRoutes = useRoutes(PopupRoutes(), location);

	return (
		<>
			{AppRoutes}
			{previousLocation && PopuRoutes}
		</>
	);
}
