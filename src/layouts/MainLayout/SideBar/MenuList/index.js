// icons
import MUIicons from "utils/muiIcons";
import { RoutePath } from "src/utils/routes";
import ReactIcons from "utils/ReactIcons";
import { sidebarpopUps } from "utils/constants";

export const menuList = [
	{
		id: "",
		title: "Home",
		icon: ReactIcons.RiHome4Fill,
		outLinedIcon: ReactIcons.RiHome4Line,
		url: RoutePath.HOME,
	},
	{
		id: "search",
		title: "Search",
		icon: ReactIcons.IoSearchSharp,
		outLinedIcon: ReactIcons.IoSearchOutline,
		popup: true,
		popupType: sidebarpopUps.SEARCH,
	},
	{
		id: "explore",
		title: "Explore",
		icon: ReactIcons.MdExplore,
		outLinedIcon: ReactIcons.MdOutlineExplore,
		url: RoutePath.EXPLORE,
	},
	{
		id: "reels",
		title: "Reels",
		icon: ReactIcons.BiSolidMoviePlay,
		outLinedIcon: ReactIcons.BiMoviePlay,
		url: RoutePath.REELS,
	},
	{
		id: "messages",
		title: "Messages",
		icon: ReactIcons.RiChat3Fill,
		outLinedIcon: ReactIcons.RiChat3Line,
		url: RoutePath.MESSAGES,
		badge: true,
	},
	{
		id: "notifications",
		title: "Notifications",
		icon: ReactIcons.RiHeart3Fill,
		outLinedIcon: ReactIcons.RiHeart3Line,
		popup: true,
		popupType: sidebarpopUps.NOTIFICATION,
	},
	{
		id: "create",
		title: "Create",
		icon: ReactIcons.RiAddBoxFill,
		outLinedIcon: ReactIcons.RiAddBoxLine,
		popup: true,
		popupType: sidebarpopUps.CREATE,
	},
	{
		id: "profile",
		title: "Profile",
		icon: ReactIcons.AddCircleIcon,
		outLinedIcon: ReactIcons.AccountCircleOutlinedIcon,
		url: RoutePath.PROFILE,
		avatar: true,
	},
];


// export const menuList = [
//   {
//     id: "",
//     title: "Home",
//     icon: MUIicons.HomeIcon,
//     outLinedIcon: MUIicons.HomeOutlinedIcon,
//     url: RoutePath.HOME,
//   },
//   {
//     id: "search",
//     title: "Search",
//     icon: MUIicons.SearchIcon,
//     outLinedIcon: MUIicons.SearchOutlinedIcon,
//     popup: true,
//     popupType: "search",
//   },
//   {
//     id: "explore",
//     title: "Explore",
//     icon: MUIicons.ExploreIcon,
//     outLinedIcon: MUIicons.ExploreOutlinedIcon,
//     url: RoutePath.EXPLORE,
//   },
//   {
//     id: "reels",
//     title: "Reels",
//     icon: MUIicons.SmartDisplayIcon,
//     outLinedIcon: MUIicons.SmartDisplayOutlinedIcon,
//     url: RoutePath.REELS,
//   },
//   {
//     id: "messages",
//     title: "Messages",
//     icon: MUIicons.ChatIcon,
//     outLinedIcon: MUIicons.ChatOutlinedIcon,
//     url: RoutePath.MESSAGES,
//     badge: true,
//   },
//   {
//     id: "notifications",
//     title: "Notifications",
//     icon: MUIicons.FavoriteIcon,
//     outLinedIcon: MUIicons.FavoriteBorderOutlinedIcon,
//     popup: true,
//     popupType: "notification",
//   },
//   {
//     id: "create",
//     title: "Create",
//     icon: MUIicons.AccountCircleIcon,
//     outLinedIcon: MUIicons.AddCircleOutlineIcon,
//     // popup: true,
//     // popupType: "create",
//   },
//   {
//     id: "profile",
//     title: "Profile",
//     icon: MUIicons.AddCircleIcon,
//     outLinedIcon: MUIicons.AccountCircleOutlinedIcon,
//     url: RoutePath.PROFILE,
//     avatar: true,
//   },
// ];
