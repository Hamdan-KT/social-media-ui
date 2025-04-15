import ReactIcons from "src/utils/ReactIcons";
import {
	Box,
	IconButton,
	styled,
	Toolbar,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MessageInfoPeoples from "src/views/MessageInfo/Peoples";
import MUISwitch from "src/components/common/FormInputs/Switch";
import Btn from "src/components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import NewMessageWindow from "src/components/ui-components/Popups/NewMessage";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchChatMembers } from "src/api/messageAPI";
import ChangeGroupDetails from "src/components/ui-components/Popups/ChangeGroupDetails";
import AddPeopleToChatWindow from "src/components/ui-components/Popups/AddPeopleToChat";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "0.62rem 0.4rem",
	position: "absolute",
	backgroundColor: theme.palette.background.default,
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
	left: 0,
	top: 0,
	zIndex: 10,
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

const CommonBox = styled("div")(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.5rem",
}));

function MessageInfoLarge({ open = false, setOpen = () => {} }) {
	const theme = useTheme();
	const selectedChat = useSelector((state) => state?.message?.selectedChat);
	const [addPeopleWindowOpen, setAddPeopleWindowOpen] = useState(false);
	const [openEditWindow, setOpenEditWindow] = useState(false);

	return (
		<CommonBox
			sx={{
				height: "100%",
				gap: 0,
				padding: 0,
				justifyContent: "start",
				flexDirection: "column",
				alignItems: "start",
				borderLeft: { md: `1px solid ${theme.palette.grey[400]}` },
				position: "relative",
			}}
		>
			<StyledToolBar disableGutters>
				<CommonBox
					sx={{
						width: "100%",
						height: "100%",
						justifyContent: "space-between",
					}}
				>
					<Typography variant="h5" sx={{ fontWeight: "bold" }}>
						Details
					</Typography>
					<IconButton
						size="medium"
						color="inherit"
						onClick={() => setOpen(false)}
					>
						<ReactIcons.IoClose size={20} />
					</IconButton>
				</CommonBox>
			</StyledToolBar>
			<CommonBox
				sx={{ width: "100%", p: 1, mt: 7, gap: 1.5, flexDirection: "column" }}
			>
				{selectedChat?.isGroupChat && (
					<CommonBox sx={{ width: "100%", justifyContent: "space-between" }}>
						<Typography variant="subtitle" sx={{ fontWeight: "medium" }}>
							Change group Details
						</Typography>
						<Btn
							variant="outlined"
							size="small"
							onClick={() => setOpenEditWindow(true)}
						>
							Change
						</Btn>
					</CommonBox>
				)}
				<CommonBox sx={{ width: "100%", justifyContent: "space-between" }}>
					<CommonBox sx={{ width: "auto" }}>
						<ReactIcons.IoNotificationsOutline size={23} />
						<Typography variant="body" sx={{ fontWeight: "medium" }}>
							Mute messages
						</Typography>
					</CommonBox>
					<MUISwitch />
				</CommonBox>
			</CommonBox>
			<CommonBox
				sx={{
					width: "100%",
					p: 1,
					borderBottom: `1px solid ${theme.palette.grey[400]}`,
					justifyContent: "space-between",
				}}
			>
				<Typography variant="body" sx={{ fontWeight: "bold" }}>
					Members
				</Typography>
				{selectedChat?.isGroupChat && (
					<Typography
						variant="subtitle1"
						sx={{
							userSelect: "none",
							cursor: "pointer",
							fontWeight: "bold",
						}}
						color={theme.palette.primary.main}
						onClick={() => setAddPeopleWindowOpen(true)}
					>
						Add People
					</Typography>
				)}
			</CommonBox>
			<CommonBox
				sx={{
					width: "100%",
					maxHeight: selectedChat?.isGroupChat
						? "calc(60vh - 5rem)"
						: "calc(61vh)",
					overflowY: "scroll",
					flexDirection: "column",
					justifyContent: "start",
				}}
			>
				<MessageInfoPeoples chat={selectedChat} count={false}/>
			</CommonBox>
			<CommonBox
				sx={{
					width: "100%",
					borderTop: `1px solid ${theme.palette.grey[400]}`,
					flexDirection: "column",
					p: 1,
					gap: 0,
					mt: "auto",
				}}
			>
				{selectedChat?.isGroupChat && (
					<ItemsWrapper hoverEffect={true}>
						<CommonBox sx={{ width: "auto", color: theme.palette.error.main }}>
							<ReactIcons.IoMdLogOut size={26} />
							<Typography variant="body" sx={{ fontWeight: "medium" }}>
								Leave chat
							</Typography>
						</CommonBox>
					</ItemsWrapper>
				)}
				{!selectedChat?.isGroupChat && (
					<ItemsWrapper hoverEffect={true}>
						<CommonBox sx={{ width: "auto", color: theme.palette.error.main }}>
							<ReactIcons.MdBlockFlipped size={26} />
							<Typography variant="body" sx={{ fontWeight: "medium" }}>
								Block
							</Typography>
						</CommonBox>
					</ItemsWrapper>
				)}
				{!selectedChat?.isGroupChat && (
					<ItemsWrapper hoverEffect={true}>
						<CommonBox sx={{ width: "auto", color: theme.palette.error.main }}>
							<ReactIcons.TbMessageReport size={26} />
							<Typography variant="body" sx={{ fontWeight: "medium" }}>
								Report
							</Typography>
						</CommonBox>
					</ItemsWrapper>
				)}
				<ItemsWrapper hoverEffect={true}>
					<CommonBox sx={{ width: "auto", color: theme.palette.error.main }}>
						<ReactIcons.LuTrash size={26} />
						<Typography variant="body" sx={{ fontWeight: "medium" }}>
							Delete chat
						</Typography>
					</CommonBox>
				</ItemsWrapper>
			</CommonBox>
			<AddPeopleToChatWindow
				open={addPeopleWindowOpen}
				onClose={() => setAddPeopleWindowOpen(false)}
			/>
			<ChangeGroupDetails
				open={openEditWindow}
				onClose={() => setOpenEditWindow(false)}
			/>
		</CommonBox>
	);
}

export default MessageInfoLarge;
