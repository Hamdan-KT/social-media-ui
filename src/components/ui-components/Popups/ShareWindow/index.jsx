import React from "react";
import CustomModal from "components/common/Modal";
import ListSection from "./ListSection";
import { styled, useMediaQuery, useTheme } from "@mui/material";
import BottomSheet from "components/common/BottomSheet";
import { useDispatch, useSelector } from "react-redux";
import { handleShareWindowOpen } from "app/slices/shareSlice/shareSlice";

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

function ShareWindow({ open = false, onClose = () => {} }) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const shareWindowOpen = useSelector((state) => state.share.shareWindowOpen);
	const dispatch = useDispatch();

	return (
		<>
			{matchDownSm ? (
				<BottomSheet
					open={shareWindowOpen}
					onClose={() => dispatch(handleShareWindowOpen(false))}
					sheetBodyStyles={{ position: "relative" }}
					title="Share"
				>
					<ListSection onClose={() => dispatch(handleShareWindowOpen(false))} />
				</BottomSheet>
			) : (
				<CustomModal closeIcon={true} open={shareWindowOpen} onClose={onClose}>
					<Wrappper>
						<ListSection
							onClose={() => dispatch(handleShareWindowOpen(false))}
						/>
					</Wrappper>
				</CustomModal>
			)}
		</>
	);
}

export default ShareWindow;
