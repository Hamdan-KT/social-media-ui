import { useLocation, useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import HelperRoutes from "./HelperRoutes";
import PopupRoutes from "./PopupRoutes";
import AuthRoutes from "./AuthRoutes";
import AuthProvider from "src/components/auth/AuthProvider";

// ==============================|| ROUTING RENDER ||============================== //

export default function AppRouting() {
	const location = useLocation();
	const previousLocation = location.state?.previousLocation;

	// Main and Helper routes wrapped in AuthProvider
	const AppRoutes = useRoutes(
		[MainRoutes(), HelperRoutes()],
		previousLocation || location
	);
	// Authentication routes without AuthProvider
	const AuthenticationRoutes = useRoutes(
		[AuthRoutes()],
		previousLocation || location
	);
	const PopuRoutes = useRoutes([PopupRoutes()], location);

	return (
		<>
			{AuthenticationRoutes}
			{/* <AuthProvider> */}
			{AppRoutes}
			{previousLocation && PopuRoutes}
			{/* </AuthProvider> */}
		</>
	);
}
