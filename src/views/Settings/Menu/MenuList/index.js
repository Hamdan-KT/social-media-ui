// icons
import { RoutePath } from "src/utils/routes";
import ReactIcons from "src/utils/ReactIcons";

export const menuList = [
	{
		id: "",
		title: "Edit Profile",
		outLinedIcon: ReactIcons.RiAccountCircleLine,
		url: `/${RoutePath.SETTINGS_EDIT_PROFILE}`,
	},
	{
		id: "search",
		title: "Notification",
		outLinedIcon: ReactIcons.IoNotificationsOutline,
		url: `/${RoutePath.SETTINGS_NOTIFICATIONS}`,
	},
	{
		id: "reels",
		title: "Saved",
		outLinedIcon: ReactIcons.RiBookmarkLine,
		url: `/${RoutePath.SETTINGS_SAVED_POSTS}`,
	},
	{
		id: "explore",
		title: "Account Privacy",
		outLinedIcon: ReactIcons.FiLock,
		url: `/${RoutePath.SETTINGS_ACCOUNT_PRIVACY}`,
	},
	{
		id: "messages",
		title: "Blocked",
		outLinedIcon: ReactIcons.MdBlockFlipped,
		url: `/${RoutePath.SETTINGS_BLOCKED_ACCOUNTS}`,
	},
	{
		id: "messages",
		title: "Messages and story reply",
		outLinedIcon: ReactIcons.IoChatbubblesOutline,
		url: `/${RoutePath.SETTINGS_MESSAGES_AND_STORY_REPLY}`,
	},
	{
		id: "messages",
		title: "Comments",
		outLinedIcon: ReactIcons.RiChat1Line,
		url: `/${RoutePath.SETTINGS_COMMENTS}`,
	},
	{
		id: "messages",
		title: "Like and share counts",
		outLinedIcon: ReactIcons.RiDislikeLine,
		url: `/${RoutePath.SETTINGS_LIKE_AND_SHARE_COUNT}`,
	},
];
