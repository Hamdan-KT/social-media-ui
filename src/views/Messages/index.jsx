import {
	Box,
	Grid,
	IconButton,
	Tab,
	Tabs,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Outlet, useLocation } from "react-router";
import { Users } from "src/data";
import { useState } from "react";
import PropTypes from "prop-types";
import MessageHeader from "./lMessageHeader";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { RoutePath } from "src/utils/routes";
import { IoChatbubblesOutline } from "react-icons/io5";
import { messageSections } from "src/utils/constants";
import SearchInput from "src/components/common/SearchInput";
import MsgUserSearchList from "./SearchList";
import { useDebounceValue } from "src/hooks/useDebounce";
import MsgPrimary from "./MessageSections/Primary";

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
			{value === index && <Box>{children}</Box>}
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

const CustomButton = (props) => (
	<IconButton size="large" color="inherit" {...props}>
		<CameraAltOutlinedIcon />
	</IconButton>
);

const MSGSECTIONS = [
	messageSections.PRIMARY,
	messageSections.GROUPS,
	messageSections.REQUESTS,
];

function Messages() {
	const theme = useTheme();
	const { debouncedValue, value, setValue } = useDebounceValue("", 500);
	const [tab, setTab] = useState(0);
	const { pathname } = useLocation();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const [activeSection, setActiveSection] = useState(messageSections.PRIMARY);

	return (
		<Grid container>
			{matchDownMd && <MessageHeader />}
			{pathname !== `/${RoutePath.MESSAGES}` && matchDownMd ? null : (
				<Grid item xs={12} sm={12} md={4} lg={3.5}>
					<Box
						sx={{
							width: "100%",
							position: "relative",
							padding: 0,
						}}
					>
						{/* message header */}
						{!matchDownMd && <MessageHeader />}
					</Box>
					<Box
						sx={{
							mt: 6,
						}}
					>
						<SearchInput value={value} setValue={setValue} />
						{value !== "" ? (
							<MsgUserSearchList value={debouncedValue} setValue={setValue} />
						) : (
							<>
								<Box
									sx={{
										height: "max-content",
										p: 0,
										mt: 1,
										gap: "0.5rem",
										width: "100%",
										maxWidth: "100%",
										display: "flex",
										alignItems: "center",
										overFlowX: "scroll",
									}}
								>
									{MSGSECTIONS.map((item, index) => (
										<Box
											key={index}
											sx={{
												display: "flex",
												alignItems: "center",
												width: "max-content",
												height: "max-content",
												justifyContent: "center",
												p: "0.4rem 0.8rem",
												bgcolor:
													activeSection === item
														? theme.palette.primary.light
														: theme.palette.grey[100],
												color:
													activeSection === item
														? theme.palette.primary.dark
														: theme.palette.text,
												borderRadius: "8px",
												userSelect: "none",
												cursor: "pointer",
												fontWeight: "medium",
											}}
											onClick={() => {
												setActiveSection(item);
											}}
										>
											{item}
										</Box>
									))}
								</Box>
								{activeSection === messageSections.PRIMARY && <MsgPrimary />}
							</>
						)}
					</Box>
				</Grid>
			)}
			<Grid item xs={12} sm={12} md={8} lg={8.5}>
				<Box
					sx={{
						ml: { md: 1 },
						height: "100%",
						border: { md: `1px solid ${theme.palette.grey[400]}` },
						borderRadius: { md: 7 },
						overflow: { md: "hidden" },
						alignItems: { sm: "center", md: "center" },
						justifyContent: { sm: "center", md: "center" },
						display: "flex",
						minHeight: { xs: `100%`, md: `calc(100vh - 33px)` },
					}}
				>
					{pathname === `/${RoutePath.MESSAGES}` && !matchDownMd ? (
						<Box
							sx={{
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
								flexDirection: "column",
								gap: "0.5rem",
							}}
						>
							<IoChatbubblesOutline style={{ fontSize: "6rem" }} />
							<Typography variant="h3">Your Messages</Typography>
							<Typography variant="greyTags">
								Send private photos and messages to a friend or group
							</Typography>
						</Box>
					) : (
						<Outlet />
					)}
				</Box>
			</Grid>
		</Grid>
	);
}

export default Messages;
