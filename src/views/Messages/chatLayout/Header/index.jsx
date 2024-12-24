import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
	Avatar,
	IconButton,
	Skeleton,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ReactIcons from "utils/ReactIcons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentChat } from "src/api/messageAPI";
import { useQuery } from "@tanstack/react-query";
import { setSelectedChat } from "src/app/slices/messageSlice/messageSlice";
import { RoutePath } from "src/utils/routes";

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
	zIndex: 10,
}));

function ChatHeader() {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const selectedChat = useSelector((state) => state?.message?.selectedChat);
	const { chatId } = useParams();

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ["get-current-chat", chatId],
		queryFn: () => getCurrentChat(chatId),
		enabled: !selectedChat?._id,
	});

	useEffect(() => {
		if (isSuccess) {
			dispatch(setSelectedChat(data?.data));
		}
	}, [isSuccess, data]);

	return (
		<StyledToolBar disableGutters>
			<Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
				{matchDownMd && (
					<IconButton size="small" color="inherit" onClick={() => navigate(-1)}>
						<ArrowBackIosNewIcon />
					</IconButton>
				)}
				{!selectedChat ?? isLoading ? (
					<Skeleton variant="circular" width={40} height={40} />
				) : (
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
				)}
				<Box
					sx={{
						display: "flex",
						alignItems: "start",
						justifyContent: "center",
						flexDirection: "column",
						ml: 0.5,
					}}
				>
					{!selectedChat ?? isLoading ? (
						<>
							<Skeleton variant="text" width={120} height={24} />
							<Skeleton variant="text" width={80} height={16} />
						</>
					) : (
						<>
							<Typography variant="h5" sx={{ fontWeight: "bold" }}>
								{selectedChat?.isGroupChat
									? selectedChat?.groupName
									: selectedChat?.receiver?.userName
									? selectedChat?.receiver?.userName
									: "Instogram user"}
							</Typography>
							<Typography variant="greyTagsXs">Active 18 ago</Typography>
						</>
					)}
				</Box>
			</Box>
			{selectedChat && (
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<IconButton size="medium" color="inherit">
						<ReactIcons.IoCallOutline />
					</IconButton>
					<IconButton size="medium" color="inherit">
						<ReactIcons.IoVideocamOutline />
					</IconButton>
					<IconButton
						size="medium"
						color="inherit"
						onClick={() =>
							navigate(`/${RoutePath.MESSAGE_INFO_VIEW}/${chatId}`)
						}
					>
						<ReactIcons.IoInformationCircleOutline />
					</IconButton>
				</Box>
			)}
		</StyledToolBar>
	);
}

export default ChatHeader;
