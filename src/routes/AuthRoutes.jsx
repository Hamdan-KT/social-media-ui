import { lazy } from "react";
import Loadable from "components/common/Loadable";
import { RoutePath } from "src/utils/routes";
import MinimalLayout from "../layouts/MinimalLayout";

// routes
const AuthLayout = Loadable(lazy(() => import("views/Auth")));
const Login = Loadable(lazy(() => import("views/Auth/Login")));
const Register = Loadable(lazy(() => import("views/Auth/Register")));

const AuthRoutes = () => {
	return {
		path: RoutePath.HOME,
		element: <MinimalLayout />,
		children: [
			// auth routes
			{
				path: RoutePath.AUTH,
				element: <AuthLayout />,
				children: [
					{
						path: RoutePath.LOGIN,
						element: <Login />,
					},
					{
						path: RoutePath.REGISTER,
						element: <Register />,
					},
				],
			},
		],
	};
};

export default AuthRoutes;
