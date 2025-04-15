import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import NewMessageHeader from "./AddPeopleHeader";
import NewMessageListSection from "src/components/ui-components/Popups/NewMessage/ListSection";
import { useNavigate, useParams } from "react-router";
import { RoutePath } from "src/utils/routes";
import AddPeopleHeader from "./AddPeopleHeader";
import AddPeopleToChatListSection from "src/components/ui-components/Popups/AddPeopleToChat/ListSection";
import { getCurrentChat } from "src/api/messageAPI";
import { setSelectedChat } from "src/app/slices/messageSlice/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

function AddPeopleToChat() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const selectedChat = useSelector((state) => state?.message?.selectedChat);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { chatId } = useParams();

	useEffect(() => {
		return () => {
			if (!matchDownSm) {
				navigate(`${RoutePath.HOME}`);
			}
		};
	}, [matchDownSm, navigate]);

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ["get-current-chat", chatId],
		queryFn: () => getCurrentChat(chatId),
		enabled: !selectedChat?._id,
	});

	useEffect(() => {
		if (isSuccess) {
			console.log(data?.data);
			dispatch(setSelectedChat(data?.data));
		}
	}, [isSuccess, data, dispatch]);

	return (
		<Box
			sx={{
				width: !matchDownSm ? 390 : "100%",
				height: "100%",
				overflowY: "scroll",
				borderRight: {
					xs: "none",
					sm: `1px solid ${theme.palette.grey[300]}`,
				},
				position: "relative",
			}}
			className="scrollbar-hide"
		>
			<AddPeopleHeader title="Add People" />
			<AddPeopleToChatListSection
				onClose={() => {
					navigate(`/${RoutePath.MESSAGE_INFO_VIEW}/${chatId}`);
				}}
			/>
		</Box>
	);
}

export default AddPeopleToChat;
