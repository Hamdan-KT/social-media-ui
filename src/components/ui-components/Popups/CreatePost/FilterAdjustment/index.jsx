import { Box, Collapse, styled } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MediaFilters from "./filters";
import EditPanel from "./edit";
import { useDispatch, useSelector } from "react-redux";
import { postStages as ps } from "utils/constants";

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
		<Box
			role="tabpanel"
			className="scrollbar-hide"
			sx={{
				width: "100%",
				maxHeight: { sm: "30.5vh", md: "67.5vh" },
				overflowY: "scroll",
			}}
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ width: "100%" }}>{children}</Box>}
		</Box>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		sx: { fontWeight: "bold" },
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

function FilterAdjustment() {
	const theme = useTheme();
	const postStages = useSelector((state) => state.post.postStages);
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Collapse in={postStages[ps.EDIT]} orientation="horizontal">
			{postStages[ps.EDIT] && (
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
						<MediaFilters />
					</TabPanel>
					<TabPanel value={value} index={1} dir={theme.direction}>
						<EditPanel />
					</TabPanel>
				</ContentBox>
			)}
		</Collapse>
	);
}

export default FilterAdjustment;
