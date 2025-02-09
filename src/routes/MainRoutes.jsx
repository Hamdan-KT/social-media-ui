import { lazy } from "react";
import Loadable from "components/common/Loadable";
import MainLayout from "layouts/MainLayout";
import { RoutePath } from "src/utils/routes";
import { Box, Typography } from "@mui/material";
import { IoChatbubblesOutline } from "react-icons/io5";

// testroute
const Test = Loadable(lazy(() => import("views/Test")));

// MAIN ROUTES
const Home = Loadable(lazy(() => import("views/Home")));
const Explore = Loadable(lazy(() => import("views/Explore")));
const Messages = Loadable(lazy(() => import("views/Messages")));
const Reels = Loadable(lazy(() => import("views/Reels")));
const Profile = Loadable(lazy(() => import("views/Profile")));
const Notifications = Loadable(lazy(() => import("views/Notifications")));

// Sub windows
const ChatLayout = Loadable(lazy(() => import("views/Messages/chatLayout")));

const MainRoutes = () => {
  return {
		path: RoutePath.HOME,
		element: <MainLayout />,
		children: [
			{
				path: "test",
				element: <Test />,
			},
			{
				path: RoutePath.HOME,
				element: <Home />,
			},
			{
				path: RoutePath.EXPLORE,
				element: <Explore />,
			},
			{
				path: RoutePath.MESSAGES,
				element: <Messages />,
				children: [
					{
						path: ":id",
						element: <ChatLayout />,
					},
				],
			},
			{
				path: RoutePath.REELS,
				element: <Reels />,
			},
			{
				path: RoutePath.PROFILE,
				element: <Profile />,
			},
			{
				path: RoutePath.NOTIFICATIONS,
				element: <Notifications />,
			},
		],
	};
};

export default MainRoutes;
