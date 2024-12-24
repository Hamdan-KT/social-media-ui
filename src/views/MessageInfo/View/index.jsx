import { getCurrentChat } from "src/api/messageAPI";
import { setSelectedChat } from "src/app/slices/messageSlice/messageSlice";
import {
	Avatar,
	Box,
	IconButton,
	styled,
	Typography,
	useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import ReactIcons from "src/utils/ReactIcons";
import { RoutePath } from "src/utils/routes";

const CommonBox = styled("div")(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.5rem",
}));

const ItemsWrapper = styled(Box)(({ theme, hoverEffect }) => ({
	width: "100%",
	height: "max-content",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "0.5rem 0.5rem",
	"&:hover": hoverEffect && {
		background: theme.palette.grey[200],
		borderRadius: "10px",
		cursor: "pointer",
	},
}));

const infoOptions = [
	{
		icon: <ReactIcons.BsPeople size={26} />,
		label: "People",
		url: RoutePath.MESSAGE_INFO_PEOPLES,
		id: true,
	},
	{
		icon: <ReactIcons.FiLock size={26} />,
		label: "Privacy and safty",
		url: RoutePath.MESSAGE_INFO_PRIVACY_SAFETY,
		id: true,
	},
	{
		icon: <ReactIcons.BsPersonAdd size={26} />,
		label: "Create a group chat",
		url: RoutePath.NEW_MESSAGE,
	},
];

function MessageInfoView() {
	const selectedChat = useSelector((state) => state?.message?.selectedChat);
	const dispatch = useDispatch();
	const { chatId } = useParams();
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<CommonBox
			sx={{
				justifyContent: "start",
				flexDirection: "column",
			}}
		>
			<CommonBox sx={{ flexDirection: "column" }}>
				<Avatar
					sx={{ width: 80, height: 80 }}
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
				<Typography variant="userName" sx={{ fontSize: "1rem" }}>
					{selectedChat?.receiver?.userName ?? "Instogram user"}
				</Typography>
			</CommonBox>
			<CommonBox sx={{ gap: "1.5rem", mt: 1 }}>
				{selectedChat?.isGroupChat && (
					<CommonBox sx={{ width: "auto", gap: 0, flexDirection: "column" }}>
						<IconButton sx={{ color: theme.palette.text.primary }}>
							<ReactIcons.BsPersonAdd />
						</IconButton>
						<Typography variant="commonText">Add</Typography>
					</CommonBox>
				)}
				<CommonBox sx={{ width: "auto", gap: 0, flexDirection: "column" }}>
					<IconButton
						sx={{ color: theme.palette.text.primary }}
						onClick={() =>
							navigate(`/${RoutePath.PROFILE}/${selectedChat?.receiver?._id}`)
						}
					>
						<ReactIcons.RiAccountCircleLine />
					</IconButton>
					<Typography variant="commonText">Profile</Typography>
				</CommonBox>
				<CommonBox sx={{ width: "auto", gap: 0, flexDirection: "column" }}>
					<IconButton sx={{ color: theme.palette.text.primary }}>
						<ReactIcons.IoSearchOutline />
					</IconButton>
					<Typography variant="commonText">Search</Typography>
				</CommonBox>
				<CommonBox sx={{ width: "auto", gap: 0, flexDirection: "column" }}>
					<IconButton sx={{ color: theme.palette.text.primary }}>
						<ReactIcons.IoNotificationsOutline />
					</IconButton>
					<Typography variant="commonText">Mute</Typography>
				</CommonBox>
				<CommonBox sx={{ width: "auto", gap: 0, flexDirection: "column" }}>
					<IconButton sx={{ color: theme.palette.text.primary }}>
						<ReactIcons.MdMoreHoriz />
					</IconButton>
					<Typography variant="commonText">Options</Typography>
				</CommonBox>
				{selectedChat?.isGroupChat && (
					<CommonBox sx={{ width: "auto", gap: 0, flexDirection: "column" }}>
						<IconButton sx={{ color: theme.palette.text.primary }}>
							<ReactIcons.IoMdLogOut />
						</IconButton>
						<Typography variant="commonText">Leave</Typography>
					</CommonBox>
				)}
			</CommonBox>
			<CommonBox sx={{ mt: 1, flexDirection: "column" }}>
				{selectedChat?.isGroupChat && (
					<ItemsWrapper hoverEffect={true}>
						<CommonBox sx={{ width: "auto" }}>
							<ReactIcons.RiLinkM size={26} />
							<Typography variant="body" sx={{ fontWeight: "medium" }}>
								Invitation link
							</Typography>
						</CommonBox>
						<ReactIcons.FaRegCopy size={20} />
					</ItemsWrapper>
				)}
				<ItemsWrapper hoverEffect={true}>
					<CommonBox sx={{ width: "auto" }}>
						<ReactIcons.BiBrush size={26} />
						<Typography variant="body" sx={{ fontWeight: "medium" }}>
							Theme
						</Typography>
					</CommonBox>
					<ReactIcons.MdNavigateNext size={26} />
				</ItemsWrapper>

				{infoOptions.map((option, index) => (
					<ItemsWrapper
						hoverEffect={true}
						key={index}
						onClick={() => {
							if (option.url) {
								navigate(`/${option.url}${option.id ? `/${chatId}` : ""}`);
							}
						}}
					>
						<CommonBox sx={{ width: "auto" }}>
							{option.icon}
							<Typography variant="body" sx={{ fontWeight: "medium" }}>
								{option.label}
							</Typography>
						</CommonBox>
						<ReactIcons.MdNavigateNext size={26} />
					</ItemsWrapper>
				))}
			</CommonBox>
		</CommonBox>
	);
}

export default MessageInfoView;
