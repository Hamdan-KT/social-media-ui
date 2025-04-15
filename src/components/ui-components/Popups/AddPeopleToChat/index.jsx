import React from "react";
import CustomModal from "components/common/Modal";
import { styled, useMediaQuery, useTheme } from "@mui/material";
import BottomSheet from "components/common/BottomSheet";
import { useDispatch, useSelector } from "react-redux";
import { handleShareWindowOpen } from "app/slices/shareSlice/shareSlice";
import { setSelectedUsers } from "src/app/slices/shareSlice/shareSlice";
import NewMessageListSection from "./ListSection";
import NewMessageHeader from "./header";
import AddPeopleToChatListSection from "./ListSection";

const Wrappper = styled("div")(({ theme }) => ({
	height: "72%",
	position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "start",
	justifyContent: "start",
	aspectRatio: 1 / 1,
	background: theme.palette.background.paper,
	borderRadius: 15,
	overflow: "hidden",
}));

function AddPeopleToChatWindow({ open = false, onClose }) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<CustomModal closeIcon={true} open={open} onClose={onClose}>
			<Wrappper>
				<AddPeopleToChatListSection onClose={onClose} />
			</Wrappper>
		</CustomModal>
	);
}

export default AddPeopleToChatWindow;
