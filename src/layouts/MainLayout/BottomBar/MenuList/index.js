// icons
import { RoutePath } from "utils/routes";
import ReactIcons from "utils/ReactIcons";

export const BottomBarMenuList = [
	{
		id: "",
		title: "Home",
		icon: ReactIcons.RiHome4Fill,
		outLinedIcon: ReactIcons.RiHome4Line,
		url: RoutePath.HOME,
	},
	{
		id: "explore",
		title: "Explore",
		icon: ReactIcons.IoSearchSharp,
		outLinedIcon: ReactIcons.IoSearchOutline,
		url: RoutePath.EXPLORE,
	},

	{
		id: "create",
		title: "Create",
		icon: ReactIcons.RiAddBoxFill,
		outLinedIcon: ReactIcons.RiAddBoxLine,
		popup: true,
	},
	{
		id: "reels",
		title: "Reels",
		icon: ReactIcons.BiSolidMoviePlay,
		outLinedIcon: ReactIcons.BiMoviePlay,
		url: RoutePath.REELS,
	},
	{
		id: "profile",
		title: "Profile",
		icon: ReactIcons.RiAccountCircleFill,
		outLinedIcon: ReactIcons.RiAccountCircleLine,
		url: RoutePath.PROFILE,
		avatar: true
	},
];
