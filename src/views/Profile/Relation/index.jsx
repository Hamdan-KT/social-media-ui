import React, { useEffect } from "react";
import ReactIcons from "utils/ReactIcons";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhotoGallery from "components/ui-components/PhotoGallery";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { RoutePath } from "src/utils/routes";
import { Link } from "react-router-dom";
import RelHeader from "./Header";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
			style={{ width: "100%" }}
		>
			{value === index && <Box sx={{ width: "100%" }}>{children}</Box>}
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

function Relation() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();
	// const location = useLocation();
	const { uid } = useParams();
	const location = useLocation();
	const previousLocation = location.state?.previousLocation;

	const tabValue =
		{
			[`/${RoutePath.PROFILE}/${uid}/rel/${RoutePath.MUTUAL}`]: 0,
			[`/${RoutePath.PROFILE}/${uid}/rel/${RoutePath.FOLLOWERS}`]: 1,
			[`/${RoutePath.PROFILE}/${uid}/rel/${RoutePath.FOLLOWING}`]: 2,
		}[location.pathname] || 0;

	const handleChange = (_, newValue) => {
		console.log({ newValue });
		const paths = [
			`/${RoutePath.PROFILE}/${uid}/rel/${RoutePath.MUTUAL}`,
			`/${RoutePath.PROFILE}/${uid}/rel/${RoutePath.FOLLOWERS}`,
			`/${RoutePath.PROFILE}/${uid}/rel/${RoutePath.FOLLOWING}`,
		];
		navigate(paths[newValue], {
			state: { previousLocation },
		});
	};

	useEffect(() => {
		if (!matchDownSm && !previousLocation) {
			navigate(`/${RoutePath.PROFILE}/${uid}`, { replace: true });
		}
	}, [matchDownSm, previousLocation, navigate, uid]);

	return (
		<Box sx={{ width: "100%" }}>
			<RelHeader title="username" />
			<Tabs
				value={tabValue}
				onChange={handleChange}
				indicatorColor="secondary"
				textColor="inherit"
				variant="fullWidth"
				aria-label="full width"
				sx={{ mt: { xs: 5.5, sm: 0 } }}
			>
				<Tab
					// icon={<Typography>{location.state?.mutaul}</Typography>}
					iconPosition="start"
					label={"Mutual"}
					{...a11yProps(0)}
				/>
				<Tab
					// icon={<Typography>{location.state?.followers}</Typography>}
					iconPosition="start"
					label={"Followers"}
					{...a11yProps(1)}
				/>
				<Tab
					// icon={<Typography>{location.state?.following}</Typography>}
					iconPosition="start"
					label={"Following"}
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

export default Relation;
