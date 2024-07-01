/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { drawerWidth } from "utils/constants";
import {
	Avatar,
	Badge,
	Box,
	ListItemAvatar,
	useMediaQuery,
} from "@mui/material";
import { menuList } from "./MenuList";
import InstagramIcon from "@mui/icons-material/Instagram";
import PngLogo from "assets/images/logoText.png";
import { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { defaultUser } from "src/data";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { sideBarPopupOpen } from "app/slices/customizationSlice/customization";
import CreatePost from "components/ui-components/Popups/CreatePost";
import { sideBarPopupClose } from "app/slices/customizationSlice/customization";
import { sidebarpopUps } from "utils/constants";
import SlideBarPopups from "components/ui-components/Wrappers/slideBarPopups";
import SearchPopUp from "components/ui-components/Popups/Search";
import NotificationPopUp from "components/ui-components/Popups/Notification";

// third-party-libraries
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import { BrowserView, MobileView } from 'react-device-detect';

// open style
const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

// closing style
const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(10)} + 1px)`,
	},
});
// styled drawer header
const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	[theme.breakpoints.down("md")]: {
		justifyContent: "center",
	},
	[theme.breakpoints.up("md")]: {
		justifyContent: "flex-start",
	},
	padding: theme.spacing(0, 5),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

// styled drawer component
const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

// styled drawer header
const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
	"&:hover": {
		backgroundColor: theme.palette.grey[200],
	},
	borderRadius: "10px",
	minHeight: 48,
}));

function SideBar({ open, handleToggle }) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const { pathname } = useLocation();
	const popupState = useSelector((state) => state.customization.sideBarPopup);
	const dispatch = useDispatch();

	return (
		<>
			{!matchDownSm && (
				<Drawer
					sx={{ position: "relative" }}
					variant="permanent"
					open={open}
					onClose={handleToggle}
				>
					<DrawerHeader sx={{ height: "10vh", mt: 3 }}>
						{open ? (
							<Box
								sx={{
									display: "flex",
									widht: "100%",
									alignItems: "center",
									ml: 1,
								}}
							>
								<img src={PngLogo} style={{ display: "block", width: "50%" }} />
							</Box>
						) : (
							<Box
								sx={{
									display: "flex",
									widht: "100%",
									alignItems: "center",
									justifyContent: "center",
									ml: { md: 1, sm: 0 },
								}}
							>
								<InstagramIcon sx={{ fontSize: 30 }} />
							</Box>
						)}
					</DrawerHeader>
					<List>
						{menuList.map((item, index) => {
							let listItemProps = {};
							if (item?.url) {
								let itemTarget = "_self";
								if (item.target) {
									itemTarget = "_blank";
								}
								listItemProps = {
									component: forwardRef((props, ref) => (
										<Link
											ref={ref}
											{...props}
											to={item.url}
											target={itemTarget}
										/>
									)),
								};
								if (item?.external) {
									listItemProps = {
										component: "a",
										href: item.url,
										target: itemTarget,
									};
								}
							}
							const Icon = item?.icon;
							const OutlinedIcon = item?.outLinedIcon;
							return (
								<>
									<ListItem
										key={item?.id}
										disablePadding

										sx={{ display: "block" }}
										onClick={() =>
											dispatch(
												sideBarPopupOpen({
													type: item?.popupType,
													value: !popupState[item?.popupType],
												})
											)
										}
									>
										<StyledListItemButton
											{...listItemProps}
											sx={{
												justifyContent: open ? "initial" : "center",
												px: 2.5,
												ml: 1.2,
												mr: 1.2,
												mt: 1,
												mb: 1,
											}}
											// selected={
											//   pathname
											//     .toString()
											//     .split("/")
											//     .findIndex((id) => id === item.id) > -1
											// }
										>
											{item?.avatar ? (
												<ListItemAvatar
													sx={{
														minWidth: 0,
														mr: open ? 3 : 0,
														justifyContent: "center",
													}}
												>
													<Avatar
														alt={defaultUser.name}
														src={defaultUser.profile}
														sx={{ width: 30, height: 30 }}
													/>
												</ListItemAvatar>
											) : (
												<ListItemIcon
													sx={{
														minWidth: 0,
														mr: open ? 3 : 0,
														justifyContent: "center",
													}}
												>
													{item?.badge ? (
														<Badge badgeContent={4} color="error">
															<OutlinedIcon
																style={{
																	fontSize: 28,
																	color: `${theme.palette.text.dark}`,
																}}
															/>
														</Badge>
													) : (
														<OutlinedIcon
															style={{
																fontSize: 28,
																color: `${theme.palette.text.dark}`,
															}}
														/>
													)}
												</ListItemIcon>
											)}
											{open && (
												<ListItemText
													primary={item?.title}
													sx={{ opacity: open ? 1 : 0 }}
												/>
											)}
										</StyledListItemButton>
									</ListItem>
									{/* side bar popups */}
									{item?.popup &&
									(item?.popupType === sidebarpopUps.SEARCH ||
										item?.popupType === sidebarpopUps.NOTIFICATION) ? (
										<SlideBarPopups open={popupState[item?.popupType]}>
											{item?.popupType === sidebarpopUps.SEARCH && (
												<SearchPopUp />
											)}
											{item?.popupType === sidebarpopUps.NOTIFICATION && (
												<NotificationPopUp />
											)}
										</SlideBarPopups>
									) : (
										item?.popupType === sidebarpopUps.CREATE && (
											<CreatePost
												open={popupState[item?.popupType]}
												onClose={() =>
													dispatch(
														sideBarPopupClose({ type: sidebarpopUps.CREATE })
													)
												}
											/>
										)
									)}
								</>
							);
						})}
					</List>
				</Drawer>
			)}
		</>
	);
}

export default SideBar;
