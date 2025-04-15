import BottomSheet from "src/components/common/BottomSheet";
import CustomModal from "src/components/common/Modal";
import { styled, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

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

function ChangeGroupDetails({ open = false, onClose = () => {} }) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<>
			{matchDownSm ? (
				<BottomSheet
					open={open}
					onClose={onClose}
					sheetBodyStyles={{ position: "relative" }}
					title="Share"
				></BottomSheet>
			) : (
				<CustomModal closeIcon={true} open={open} onClose={onClose}>
					<Wrappper></Wrappper>
				</CustomModal>
			)}
		</>
	);
}

export default ChangeGroupDetails;
