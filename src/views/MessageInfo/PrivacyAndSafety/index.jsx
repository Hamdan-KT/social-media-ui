import ReactIcons from "src/utils/ReactIcons";
import { Box, styled, Typography, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import MUISwitch from "@/components/common/FormInputs/Switch";

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

function MessagePrivacyAndSafety() {
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
			<CommonBox sx={{ alignItems: "start", justifyContent: "start" }}>
				<Typography variant="userName" sx={{ fontSize: "0.8rem" }}>
					{selectedChat?.receiver?.userName}
				</Typography>
			</CommonBox>
			<ItemsWrapper hoverEffect={true}>
				<CommonBox sx={{ width: "auto" }}>
					<ReactIcons.IoInformationCircleOutline size={26} />
					<Typography variant="body" sx={{ fontWeight: "medium" }}>
						About this account
					</Typography>
				</CommonBox>
				<ReactIcons.MdNavigateNext size={26} />
			</ItemsWrapper>
			<CommonBox sx={{ alignItems: "start", justifyContent: "start" }}>
				<Typography variant="h4">Who can see your activity</Typography>
			</CommonBox>
			<CommonBox
				sx={{
					justifyContent: "space-between",
					mt: 2,
				}}
			>
				<CommonBox
					sx={{
						flexDirection: "column",
						justifyContent: "start",
						alignItems: "start",
						gap: "0.2rem",
					}}
				>
					<Typography
						variant="body"
						sx={{ fontSize: "0.90rem", fontWeight: "medium" }}
					>
						Read receipts
					</Typography>
					<Typography variant="caption">
						Others can see when you've read their messages
					</Typography>
				</CommonBox>
				<MUISwitch size={35} />
			</CommonBox>
			<CommonBox
				sx={{
					justifyContent: "space-between",
					mt: 1,
				}}
			>
				<CommonBox
					sx={{
						flexDirection: "column",
						justifyContent: "start",
						alignItems: "start",
						gap: "0.2rem",
					}}
				>
					<Typography
						variant="body"
						sx={{ fontSize: "0.90rem", fontWeight: "medium" }}
					>
						Typing indicator
					</Typography>
					<Typography variant="caption">
						Others can see when you're typing
					</Typography>
				</CommonBox>
				<MUISwitch size={35} />
			</CommonBox>
			<CommonBox sx={{ alignItems: "start", mt: 2, justifyContent: "start" }}>
				<Typography variant="h4">Who can reach you</Typography>
			</CommonBox>
			<ItemsWrapper hoverEffect={true}>
				<CommonBox sx={{ width: "auto", color: theme.palette.error.main }}>
					<ReactIcons.MdBlockFlipped size={26} />
					<Typography variant="body" sx={{ fontWeight: "medium" }}>
						Block
					</Typography>
				</CommonBox>
				<ReactIcons.MdNavigateNext size={26} />
			</ItemsWrapper>
			<CommonBox sx={{ alignItems: "start", justifyContent: "start" }}>
				<Typography variant="h4">Support</Typography>
			</CommonBox>
			<ItemsWrapper hoverEffect={true}>
				<CommonBox sx={{ width: "auto", color: theme.palette.error.main }}>
					<ReactIcons.TbMessageReport size={26} />
					<Typography variant="body" sx={{ fontWeight: "medium" }}>
						Report
					</Typography>
				</CommonBox>
				<ReactIcons.MdNavigateNext size={26} />
			</ItemsWrapper>
		</CommonBox>
	);
}

export default MessagePrivacyAndSafety;
