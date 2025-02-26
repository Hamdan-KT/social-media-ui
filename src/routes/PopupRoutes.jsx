import { lazy } from "react";
import Loadable from "components/common/Loadable";
import { RoutePath } from "src/utils/routes";
const RelationPopUp = Loadable(
	lazy(() => import("components/ui-components/Popups/Relation"))
);
const MutualRel = Loadable(lazy(() => import("views/Profile/Relation/Mutual")));
const FollowersRel = Loadable(
	lazy(() => import("views/Profile/Relation/Followers"))
);
const FollowingRel = Loadable(
	lazy(() => import("views/Profile/Relation/Following"))
);

// testroute
const Test = Loadable(lazy(() => import("views/Test")));

// MAIN ROUTES
const ViewPost = Loadable(
	lazy(() => import("components/ui-components/Popups/ViewPost"))
);

const PopupRoutes = () => {
	return {
		path: `${RoutePath.HOME}`,
		// element: <ViewPost />,
		children: [
			{
				path: `${RoutePath.POST}/:pId`,
				element: <ViewPost />,
			},
			{
				path: `/${RoutePath.PROFILE}/:uid/rel`,
				element: <RelationPopUp />,
				children: [
					{
						path: `/${RoutePath.PROFILE}/:uid/rel/${RoutePath.MUTUAL}`,
						element: <MutualRel />,
					},
					{
						path: `/${RoutePath.PROFILE}/:uid/rel/${RoutePath.FOLLOWERS}`,
						element: <FollowersRel />,
					},
					{
						path: `/${RoutePath.PROFILE}/:uid/rel/${RoutePath.FOLLOWING}`,
						element: <FollowingRel />,
					},
				],
			},
		],
	};
};

export default PopupRoutes;
