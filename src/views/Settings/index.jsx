import React from "react";
import SettingsMenu from "./Menu";
import {
	Box,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Outlet, useLocation } from "react-router";
import { RoutePath } from "src/utils/routes";
import SettingsHeader from "./SettingsHeader";

const StyledBox = styled(Box)(({ theme }) => ({
	background: theme.palette.background.default,
	width: "100%",
	height: "100%",
	overflowY: "scroll",
	position: "relative",
	[theme.breakpoints.up("sm")]: {
		"&::before": {
			content: `""`,
			position: "sticky",
			display: "flex",
			width: "100%",
			background: `linear-gradient(to top, rgba(255,0,0,0), ${theme.palette.background.paperLight}, ${theme.palette.background.default})`,
			padding: "1rem",
			top: 0,
			left: 0,
			zIndex: 7,
		},
		"&::after": {
			content: `""`,
			position: "sticky",
			display: "flex",
			width: "100%",
			background: `linear-gradient(to bottom, rgba(255,0,0,0), ${theme.palette.background.paperLight}, ${theme.palette.background.default})`,
			padding: "1rem",
			bottom: 0,
			left: 0,
		},
	},
}));

function Settings() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const { pathname } = useLocation();
	console.log(pathname);

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				height: {
					xs: "auto",
					sm: "calc(100vh - 1rem)",
					md: "calc(100vh - 2rem)",
				},
			}}
		>
			{(matchDownSm && pathname === `/${RoutePath.SETTINGS}`) ||
			(!matchDownSm && pathname !== `/${RoutePath.SETTINGS}`) ? (
				<Box
					sx={{
						width: 390,
						height: "100%",
						overflowY: "scroll",
						borderRight: {xs: "none", sm: `1px solid ${theme.palette.grey[300]}`},
						position: "relative",
					}}
					className="scrollbar-hide"
				>
					{!matchDownSm ? (
						<Box sx={{ p: "0rem 2rem", mt: 4 }}>
							<Typography variant="h3">Settings</Typography>
						</Box>
					) : (
						<SettingsHeader title="Settings"/>
					)}
					<SettingsMenu />
				</Box>
			) : null}
			{pathname !== `/${RoutePath.SETTINGS}` && (
				<StyledBox className="scrollbar-hide">
					<Box sx={{ p: { xs: 1, sm: 1.5 }, mt: -4 }}>
						<Outlet />
					</Box>
				</StyledBox>
			)}
		</Box>
	);
}

export default Settings;
