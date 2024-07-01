// icons
import ReactIcons from "utils/ReactIcons";

export const BottomBarMenuList = [
	{
		id: "",
		title: "Home",
		icon: ReactIcons.RiHome4Fill,
		outLinedIcon: ReactIcons.RiHome4Line,
		url: "/",
	},
	{
		id: "explore",
		title: "Explore",
		icon: ReactIcons.IoSearchSharp,
		outLinedIcon: ReactIcons.IoSearchOutline,
		url: "/explore",
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
		url: "/reels",
	},
	{
		id: "profile",
		title: "Profile",
		icon: ReactIcons.RiAccountCircleFill,
		outLinedIcon: ReactIcons.RiAccountCircleLine,
		url: "/profile",
	},
];
