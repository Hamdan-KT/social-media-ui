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
	Box,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { menuList } from "./MenuList";
import { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import _ from "lodash";
import { memo } from "react";

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
const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
	"&:hover": {
		backgroundColor: theme.palette.grey[200],
	},
	"&.Mui-selected": {
		backgroundColor: theme.palette.grey[200],
		"&:hover": {
			backgroundColor: theme.palette.grey[200],
		},
	},
	borderRadius: "10px",
	minHeight: 48,
}));

const SettingsMenu = memo(function () {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const { pathname } = useLocation();

	return (
		<Box sx={{ position: "relative" }}>
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
								<Link ref={ref} {...props} to={item.url} target={itemTarget} />
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
					const OutlinedIcon = item?.outLinedIcon;
					return (
						<>
							<ListItem key={item?.id} disablePadding sx={{ display: "block" }}>
								<StyledListItemButton
									{...listItemProps}
									sx={{
										justifyContent: "center",
										px: 2.5,
										ml: 1.2,
										mr: 1.2,
										mt: 1,
										mb: 1,
									}}
									selected={pathname.split("/")[1] === item?.id}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: 1.5,
											justifyContent: "center",
										}}
									>
										<OutlinedIcon
											style={{
												fontSize: 27,
												color: `${theme.palette.text.dark}`,
											}}
										/>
									</ListItemIcon>
									<ListItemText
										primary={item?.title}
										primaryTypographyProps={{
											fontFamily: "poppins",
											fontWeight:
												pathname.split("/")[1] === item?.id ? "bold" : "medium",
											fontSize: "0.82rem",
										}}
									/>
								</StyledListItemButton>
							</ListItem>
						</>
					);
				})}
			</List>
		</Box>
	);
});

export default SettingsMenu;
