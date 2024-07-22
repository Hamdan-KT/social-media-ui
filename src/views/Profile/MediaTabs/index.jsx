import React from "react";
import ReactIcons from "utils/ReactIcons";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhotoGallery from "components/ui-components/PhotoGallery";
import { Box, useMediaQuery, useTheme } from "@mui/material";

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
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%", marginTop: "1rem" }}>
			<Tabs
				value={value}
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
				<TabPanel value={value} index={0} dir={theme.direction}>
					<PhotoGallery />
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<PhotoGallery />
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction}>
					<PhotoGallery />
				</TabPanel>
			</Box>
		</Box>
	);
}

export default MediaTabs;
