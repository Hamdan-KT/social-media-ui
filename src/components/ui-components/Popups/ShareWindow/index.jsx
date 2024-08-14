import React from "react";
import CustomModal from "components/common/Modal";
import ListSection from "./ListSection";
import { styled, useMediaQuery, useTheme } from "@mui/material";
import BottomSheet from "components/common/BottomSheet";

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

function ShareWindow({open = false, onClose = () => {}}) {
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
				>
					<ListSection onClose={onClose} />
				</BottomSheet>
			) : (
				<CustomModal closeIcon={true} open={open} onClose={onClose}>
					<Wrappper>
						<ListSection onClose={onClose} />
					</Wrappper>
				</CustomModal>
			)}
		</>
	);
}

export default ShareWindow;
