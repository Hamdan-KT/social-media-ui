import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
	Avatar,
	IconButton,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useNavigate } from "react-router";
import { defaultUser } from "../../../../data";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ReactIcons from "utils/ReactIcons";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "0.5rem",
	backgroundColor: theme.palette.background.default,
	position: "absolute",
	[theme.breakpoints.up("md")]: {
		borderBottom: `1px solid ${theme.palette.grey[400]}`,
	},
	[theme.breakpoints.down("md")]: {
		position: "fixed",
		padding: "0.5rem",
		width: `calc(100% - ${theme.spacing(14)})`,
		marginLeft: `calc(${theme.spacing(12)} + 1px)`,
	},
	[theme.breakpoints.down("sm")]: {
		position: "fixed",
		padding: "0rem 0.5rem",
		width: `100%`,
		marginLeft: 0,
	},
	top: 0,
	left: 0,
	zIndex: 7,
}));

function ChatHeader() {
	const theme = useTheme();
	const navigate = useNavigate();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<StyledToolBar disableGutters>
			<Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
				{matchDownMd && (
					<IconButton size="large" color="inherit" onClick={() => navigate(-1)}>
						<ArrowBackIosNewIcon />
					</IconButton>
				)}
				<Avatar alt={defaultUser.name} src={defaultUser.profile} />
				<Typography variant="h5" sx={{ fontWeight: "bold" }}>
					Jack Sparrow
				</Typography>
			</Box>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<IconButton size="medium" color="inherit">
					<ReactIcons.IoCallOutline />
				</IconButton>
				<IconButton size="large" color="inherit">
					<ReactIcons.IoVideocamOutline />
				</IconButton>
				<IconButton size="large" color="inherit">
					<ReactIcons.IoInformationCircleOutline />
				</IconButton>
			</Box>
		</StyledToolBar>
	);
}

export default ChatHeader;
