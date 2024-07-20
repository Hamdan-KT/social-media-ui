import { lazy } from "react";
import Loadable from "components/common/Loadable";
import { RoutePath } from "src/utils/routes";

// testroute
const Test = Loadable(lazy(() => import("views/Test")));

// MAIN ROUTES
const ViewPost = Loadable(
	lazy(() => import("components/ui-components/Popups/ViewPost"))
);

const PopupRoutes = () => {
	return [
		{
			path: `${RoutePath.HOME}`,
			element: <ViewPost />,
			children: [
				{
					path: `${RoutePath.POST}/:pId`,
					element: <ViewPost />,
				},
			],
		},
	];
};

export default PopupRoutes;
