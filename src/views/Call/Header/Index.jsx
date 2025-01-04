import ReactIcons from "src/utils/ReactIcons";
import {
	Avatar,
	Box,
	IconButton,
	styled,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "0.5rem 0.4rem",
	// backgroundColor: theme.palette.background.default,
	position: "absolute",
	// borderBottom: `1px solid ${theme.palette.grey[400]}`,
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
	zIndex: 10,
}));

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	gap: 0.5,
}));

function CallHeader() {
	const theme = useTheme();
	const user = useSelector((state) => state.user?.user);
	const selectedChat = useSelector((state) => state?.message?.selectedChat);
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<StyledToolBar>
			<CommonBox sx={{ width: "auto" }}>
				<Avatar
					alt={
						selectedChat?.isGroupChat
							? selectedChat?.groupName
							: selectedChat?.receiver?.userName
							? selectedChat?.receiver?.userName
							: "Instogram user"
					}
					src={
						selectedChat?.isGroupChat
							? selectedChat?.groupAvatar
							: selectedChat?.receiver?.avatar
					}
				/>
				<Box
					sx={{
						display: "flex",
						alignItems: "start",
						justifyContent: "center",
						flexDirection: "column",
						ml: 0.5,
					}}
				>
					<Typography
						variant="userName"
						sx={{ fontWeight: "bold", color: theme.palette.common.white }}
					>
						{selectedChat?.isGroupChat
							? selectedChat?.groupName
							: selectedChat?.receiver?.userName
							? selectedChat?.receiver?.userName
							: "Instogram user"}
						, Other 1+
					</Typography>
					<Typography
						variant="greyTagsXs"
						sx={{ color: theme.palette.common.white }}
					>
						2 People
					</Typography>
				</Box>
			</CommonBox>
			<CommonBox sx={{ width: "auto", color: theme.palette.common.white }}>
				<IconButton size="medium" color="inherit">
					<ReactIcons.IoIosSettings />
				</IconButton>
				<IconButton size="medium" color="inherit">
					<ReactIcons.IoMdExpand size={20} />
				</IconButton>
			</CommonBox>
		</StyledToolBar>
	);
}

export default CallHeader;
