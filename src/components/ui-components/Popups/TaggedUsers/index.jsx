import React, { useEffect } from "react";
import CustomModal from "components/common/Modal";
import { styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import BottomSheet from "components/common/BottomSheet";
import { useDispatch, useSelector } from "react-redux";
import { handleTaggedUsersWindowOpen } from "src/app/slices/postSlice/postSlice";
import TaggedListView from "./TaggedListView";

const StyledHeader = styled("div")(({ theme }) => ({
	width: "100%",
	height: "max-content",
	display: "flex",
	gap: "0.5rem",
	padding: "1rem 1rem",
	alignItems: "center",
	justifyContent: "space-between",
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));

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

function TaggedUserWindow({ open = false, onClose = () => {} }) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const shareWindowOpen = useSelector(
		(state) => state.post.taggedUsersWindowOpen
	);
	const dispatch = useDispatch();

	return (
		<>
			{matchDownSm ? (
				<BottomSheet
					open={shareWindowOpen}
					onClose={() => dispatch(handleTaggedUsersWindowOpen(false))}
					sheetBodyStyles={{ position: "relative" }}
					title="Tagged Peoples"
				>
					<TaggedListView />
				</BottomSheet>
			) : (
				<CustomModal
					closeIcon={true}
					open={shareWindowOpen}
					onClose={() => dispatch(handleTaggedUsersWindowOpen(false))}
				>
					<Wrappper>
						{!matchDownSm && (
							<StyledHeader>
								<Typography
									variant="h4"
									sx={{
										userSelect: "none",
										textAlign: "center",
										width: "100%",
									}}
								>
									Tagged Peoples
								</Typography>
							</StyledHeader>
						)}
						<TaggedListView />
					</Wrappper>
				</CustomModal>
			)}
		</>
	);
}

export default TaggedUserWindow;
