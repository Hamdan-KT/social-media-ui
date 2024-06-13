import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "flex-start",
	padding: "0.2em",
	backgroundColor: theme.palette.background.default,
	position: "fixed",
	zIndex: 7,
	top: 0,
	left: 0,
}));

function NotificationHeader() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();

	return (
		<>
			{matchDownSm && (
				<StyledToolBar>
					<IconButton size="large" color="inherit" onClick={() => navigate(-1)}>
						<ArrowBackIosNewIcon />
					</IconButton>
					<Typography variant="h3">Notifications</Typography>
				</StyledToolBar>
			)}
		</>
	);
}

export default NotificationHeader;
