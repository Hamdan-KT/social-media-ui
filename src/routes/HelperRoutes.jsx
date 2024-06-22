import { lazy } from "react";
import Loadable from "components/common/Loadable";
import { RoutePath } from "src/utils/routes";
import MinimalLayout from "../layouts/MinimalLayout";

// testroute

// MAIN ROUTES
const StoryPopUp = Loadable(
	lazy(() => import("components/ui-components/StoryPopUp"))
);
const CropPostMobile = Loadable(lazy(() => import("views/CreatePost/Crop")));
const EditPostMobile = Loadable(
	lazy(() => import("views/CreatePost/FilterAdjustment"))
);
const SharePostMobile = Loadable(lazy(() => import("views/CreatePost/Share")));
const PostTaggingMobile = Loadable(
	lazy(() => import("views/CreatePost/Tagging"))
);

const HelperRoutes = () => {
	return {
		path: RoutePath.HOME,
		element: <MinimalLayout />,
		children: [
			{
				path: RoutePath.STORY,
				element: <StoryPopUp />,
			},
			{
				path: RoutePath.CREATE,
				children: [
					{
						path: RoutePath.CROP,
						element: <CropPostMobile />,
					},
					{
						path: RoutePath.EDIT,
						element: <EditPostMobile />,
					},
					{
						path: RoutePath.SHARE,
						element: <SharePostMobile />,
					},
					{
						path: RoutePath.TAG,
						element: <PostTaggingMobile />,
					},
				],
			},
		],
	};
};

export default HelperRoutes;
