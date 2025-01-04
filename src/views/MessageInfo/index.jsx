import ReactIcons from "src/utils/ReactIcons";
import {
	Box,
	IconButton,
	styled,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getCurrentChat } from "src/api/messageAPI";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "src/app/slices/messageSlice/messageSlice";

const CommonBox = styled("div")(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.5rem",
}));

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "start",
	padding: "0em",
	backgroundColor: theme.palette.background.default,
	position: "fixed",
	zIndex: 7,
	top: 0,
	left: 0,
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));

function MessageInfo() {
	const theme = useTheme();
	const selectedChat = useSelector((state) => state?.message?.selectedChat);
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { chatId } = useParams();
	const title = "Message Info";

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
		<Box
			sx={{
				p: "0.5rem",
				mt: 6,
			}}
		>
			<StyledToolBar>
				<IconButton size="medium" color="inherit" onClick={() => navigate(-1)}>
					<ReactIcons.IoChevronBack />
				</IconButton>
				{title && (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							width: "calc(100% - 5rem)",
						}}
					>
						<Typography variant="h4">{title}</Typography>
					</Box>
				)}
			</StyledToolBar>
			<Outlet />
		</Box>
	);
}

export default MessageInfo;
