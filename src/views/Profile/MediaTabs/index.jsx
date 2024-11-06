import React from "react";
import ReactIcons from "utils/ReactIcons";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhotoGallery from "components/ui-components/PhotoGallery";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { RoutePath } from "src/utils/routes";
import { Link } from "react-router-dom";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: { xs: "0.5rem 0", sm: "1rem 0" } }}>{children}</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

function MediaTabs() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();
	const location = useLocation();
	const { uid } = useParams();

	const tabValue =
		{
			[`/${RoutePath.PROFILE}/${uid}`]: 0,
			[`/${RoutePath.PROFILE}/${uid}/${RoutePath.PROFILE_SAVED}`]: 1,
			[`/${RoutePath.PROFILE}/${uid}/${RoutePath.PROFILE_TAGGED}`]: 2,
		}[location.pathname] || 0;

	const handleChange = (_, newValue) => {
		console.log({ newValue });
		const paths = [
			`/${RoutePath.PROFILE}/${uid}`,
			`/${RoutePath.PROFILE}/${uid}/${RoutePath.PROFILE_SAVED}`,
			`/${RoutePath.PROFILE}/${uid}/${RoutePath.PROFILE_TAGGED}`,
		];
		navigate(paths[newValue]);
	};

	return (
		<Box sx={{ width: "100%", marginTop: "1rem" }}>
			<Tabs
				value={tabValue}
				onChange={handleChange}
				indicatorColor="secondary"
				textColor="inherit"
				variant="fullWidth"
				aria-label="full width"
			>
				<Tab
					icon={<ReactIcons.MdOutlineGridOn size={23} />}
					iconPosition="start"
					label={!matchDownSm && "POSTS"}
					{...a11yProps(0)}
				/>
				<Tab
					icon={<ReactIcons.RiBookmarkLine size={22} />}
					iconPosition="start"
					label={!matchDownSm && "SAVED"}
					{...a11yProps(1)}
				/>
				<Tab
					icon={<ReactIcons.MdOutlineAccountBox size={25} />}
					iconPosition="start"
					label={!matchDownSm && "TAGGED"}
					{...a11yProps(2)}
				/>
			</Tabs>
			<Box sx={{ width: "100%" }}>
				<TabPanel dir={theme.direction}>
					<Outlet />
				</TabPanel>
			</Box>
		</Box>
	);
}

export default MediaTabs;
