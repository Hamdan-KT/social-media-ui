import { lazy } from "react";
import Loadable from "components/common/Loadable";
import { RoutePath } from "src/utils/routes";
import MinimalLayout from "../layouts/MinimalLayout";
import AuthProvider from "src/components/auth/AuthProvider";

// MAIN ROUTES
const Story = Loadable(lazy(() => import("views/Stories")));
const CropPostMobile = Loadable(lazy(() => import("views/CreatePost/Crop")));
const EditPostMobile = Loadable(
	lazy(() => import("views/CreatePost/FilterAdjustment"))
);
const SharePostMobile = Loadable(lazy(() => import("views/CreatePost/Share")));
const NewMessage = Loadable(lazy(() => import("views/NewMessage")));
const MessageInfo = Loadable(lazy(() => import("views/MessageInfo")));
const PostTaggingMobile = Loadable(
	lazy(() => import("views/CreatePost/Tagging"))
);
const MessageInfoView = Loadable(lazy(() => import("views/MessageInfo/View")));
const MessagePrivacyAndSafety = Loadable(lazy(() => import("views/MessageInfo/PrivacyAndSafety")));
const MessageInfoPeoples = Loadable(lazy(() => import("views/MessageInfo/Peoples")));
const Call = Loadable(lazy(() => import("views/Call")));


const HelperRoutes = () => {
	return {
		path: RoutePath.HOME,
		element: (
			<AuthProvider>
				<MinimalLayout />
			</AuthProvider>
		),
		children: [
			{
				path: RoutePath.STORY,
				element: <Story />,
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
			{ path: RoutePath.NEW_MESSAGE, element: <NewMessage /> },
			{
				path: `${RoutePath.MESSAGE_INFO}`,
				element: <MessageInfo />,
				children: [
					{
						path: `/${RoutePath.MESSAGE_INFO_VIEW}/:chatId`,
						element: <MessageInfoView />,
					},
					{
						path: `/${RoutePath.MESSAGE_INFO_PEOPLES}/:chatId`,
						element: <MessageInfoPeoples />,
					},
					{
						path: `/${RoutePath.MESSAGE_INFO_PRIVACY_SAFETY}/:chatId`,
						element: <MessagePrivacyAndSafety />,
					},
				],
			},
			{
				path: `${RoutePath.CALL}`,
				element: <Call />,
			},
		],
	};
};

export default HelperRoutes;
