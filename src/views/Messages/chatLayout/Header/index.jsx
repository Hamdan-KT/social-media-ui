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
	padding: "0.5rem 0.4rem",
	backgroundColor: theme.palette.background.default,
	position: "absolute",
	borderBottom: `1px solid ${theme.palette.grey[400]}`,
	[theme.breakpoints.down("md")]: {
		position: "fixed",
		padding: "0.5rem",
		width: `calc(100% - ${theme.spacing(10)})`,
		marginLeft: `calc(${theme.spacing(10)} + 1px)`,
	},
	[theme.breakpoints.down("sm")]: {
		position: "fixed",
		padding: "0.4rem 0.5rem",
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
					<IconButton size="small" color="inherit" onClick={() => navigate(-1)}>
						<ArrowBackIosNewIcon />
					</IconButton>
				)}
				<Avatar alt={defaultUser.name} src={defaultUser.profile} />
				<Box
					sx={{
						display: "flex",
						alignItems: "start",
						justifyContent: "center",
						flexDirection: "column",
						ml: 0.5
					}}
				>
					<Typography variant="h5" sx={{ fontWeight: "bold" }}>
						Jack Sparrow
					</Typography>
					<Typography variant="greyTagsXs">Active 18 ago</Typography>
				</Box>
			</Box>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<IconButton size="medium" color="inherit">
					<ReactIcons.IoCallOutline />
				</IconButton>
				<IconButton size="medium" color="inherit">
					<ReactIcons.IoVideocamOutline />
				</IconButton>
				<IconButton size="medium" color="inherit">
					<ReactIcons.IoInformationCircleOutline />
				</IconButton>
			</Box>
		</StyledToolBar>
	);
}

export default ChatHeader;
