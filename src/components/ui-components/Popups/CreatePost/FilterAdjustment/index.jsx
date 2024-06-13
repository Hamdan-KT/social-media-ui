import { Box, styled } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import MediaFilters from "./filters";
import EditPanel from "./edit";

const ContentBox = styled(Box)(({ theme }) => ({
	width: 340,
	height: "100%",
	display: "flex",
	background: theme.palette.background.paper,
  flexDirection: "column",
  alignItems: "center",
	overflow: "hidden",
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			style={{ width: "100%" }}
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
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
    sx: {fontWeight: "bold"},
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

function FilterAdjustment() {
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
  
	return (
		<ContentBox>
			<Box sx={{ width: "100%", padding: 0 }}>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="inherit"
					variant="fullWidth"
					aria-label="full width tabs example"
				>
					<Tab label="Filters" {...a11yProps(0)} />
					<Tab label="Adjustments" {...a11yProps(1)} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0} dir={theme.direction}>
				<EditPanel />
			</TabPanel>
			<TabPanel value={value} index={1} dir={theme.direction}>
				<MediaFilters />
			</TabPanel>
		</ContentBox>
	);
}

export default FilterAdjustment;
