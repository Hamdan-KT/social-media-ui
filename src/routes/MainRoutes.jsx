import { lazy } from "react";
import Loadable from "components/common/Loadable";
import MainLayout from "layouts/MainLayout";
import { RoutePath } from "src/utils/routes";
import AuthProvider from "src/components/auth/AuthProvider";
import { useMediaQuery, useTheme } from "@mui/material";

// testroute
const Test = Loadable(lazy(() => import("views/Test")));

// MAIN ROUTES
const Home = Loadable(lazy(() => import("views/Home")));
const Explore = Loadable(lazy(() => import("views/Explore")));
const ExploreSearch = Loadable(lazy(() => import("views/Explore/Search")));
const Messages = Loadable(lazy(() => import("views/Messages")));
const Reels = Loadable(lazy(() => import("views/Reels")));
const Profile = Loadable(lazy(() => import("views/Profile")));
const ProfilePosts = Loadable(lazy(() => import("views/Profile/Posts")));
const ProfileSavedPosts = Loadable(
	lazy(() => import("views/Profile/SavedPosts"))
);
const ProfileTaggedPosts = Loadable(
	lazy(() => import("views/Profile/TaggedPosts"))
);
const Notifications = Loadable(lazy(() => import("views/Notifications")));
const ViewPostMobile = Loadable(lazy(() => import("views/ViewPost")));
// Sub windows
const ChatLayout = Loadable(lazy(() => import("views/Messages/ChatLayout")));
const Settings = Loadable(lazy(() => import("views/Settings")));
// settings windows
const EditProfile = Loadable(lazy(() => import("views/Settings/EditProfile")));
const AccountPrivacy = Loadable(
	lazy(() => import("views/Settings/AccountPrivacy"))
);
const BlockedAccounts = Loadable(lazy(() => import("views/Settings/Blocked")));
const CommentSettings = Loadable(lazy(() => import("views/Settings/Comments")));
const LikeAndShareCountSettings = Loadable(
	lazy(() => import("views/Settings/LikeAndShareCount"))
);
const MessageAndReplySettings = Loadable(
	lazy(() => import("views/Settings/MessagesAndReply"))
);
const NotificationSettings = Loadable(
	lazy(() => import("views/Settings/Notifications"))
);
const SavedPosts = Loadable(lazy(() => import("views/Settings/Saved")));
const Relation = Loadable(lazy(() => import("views/Profile/Relation")));
const FollowingRel = Loadable(
	lazy(() => import("views/Profile/Relation/Following"))
);
const FollowersRel = Loadable(
	lazy(() => import("views/Profile/Relation/Followers"))
);
const MutualRel = Loadable(lazy(() => import("views/Profile/Relation/Mutual")));

const MainRoutes = () => {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return {
		path: RoutePath.HOME,
		element: (
			<AuthProvider>
				<MainLayout />
			</AuthProvider>
		),
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
				path: RoutePath.EXPLORE_SEARCH,
				element: <ExploreSearch />,
			},
			{
				path: RoutePath.MESSAGES,
				element: <Messages />,
				children: [
					{
						path: ":chatId",
						element: <ChatLayout />,
					},
				],
			},
			{
				path: RoutePath.REELS,
				element: <Reels />,
			},
			{
				path: `/${RoutePath.PROFILE}/:uid`,
				element: <Profile />,
				children: [
					{
						path: `/${RoutePath.PROFILE}/:uid`,
						element: <ProfilePosts />,
					},
					{
						path: `/${RoutePath.PROFILE}/:uid/${RoutePath.PROFILE_SAVED}`,
						element: <ProfileSavedPosts />,
					},
					{
						path: `/${RoutePath.PROFILE}/:uid/${RoutePath.PROFILE_TAGGED}`,
						element: <ProfileTaggedPosts />,
					},
				],
			},
			{
				path: `/${RoutePath.PROFILE}/:uid/rel`,
				element: <Relation />,
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
			{
				path: RoutePath.NOTIFICATIONS,
				element: <Notifications />,
			},
			{
				path: `${RoutePath.POST}/:pId`,
				element: <ViewPostMobile />,
			},
			{
				path: RoutePath.ACCOUNT,
				element: <Settings />,
				children: [
					{
						path: `/${RoutePath.SETTINGS_EDIT_PROFILE}`,
						element: <EditProfile />,
					},
					{
						path: `/${RoutePath.SETTINGS_NOTIFICATIONS}`,
						element: <NotificationSettings />,
					},
					{
						path: `/${RoutePath.SETTINGS_SAVED_POSTS}`,
						element: <SavedPosts />,
					},
					{
						path: `/${RoutePath.SETTINGS_ACCOUNT_PRIVACY}`,
						element: <AccountPrivacy />,
					},
					{
						path: `/${RoutePath.SETTINGS_BLOCKED_ACCOUNTS}`,
						element: <BlockedAccounts />,
					},
					{
						path: `/${RoutePath.SETTINGS_MESSAGES_AND_STORY_REPLY}`,
						element: <MessageAndReplySettings />,
					},
					{
						path: `/${RoutePath.SETTINGS_COMMENTS}`,
						element: <CommentSettings />,
					},
					{
						path: `/${RoutePath.SETTINGS_LIKE_AND_SHARE_COUNT}`,
						element: <LikeAndShareCountSettings />,
					},
				],
			},
			{
				path: RoutePath.SETTINGS,
				element: <Settings />,
			},
		],
	};
};

export default MainRoutes;
