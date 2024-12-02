import React, { useEffect } from "react";
import CustomModal from "components/common/Modal";
import { styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import BottomSheet from "components/common/BottomSheet";
import PostOptions from "./PostOptions";
import { useSelector } from "react-redux";

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
	width: "50%",
	height: "auto",
	position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "start",
	justifyContent: "start",
	// aspectRatio: 1 / 1,
	background: theme.palette.background.paper,
	borderRadius: 15,
	overflow: "hidden",
}));

function PostOptionsWindow({
	open = false,
	onClose = () => {},
	pId = null,
	isHideLikes,
	isDisableComment,
	postUser,
	post = {},
}) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<>
			{matchDownSm ? (
				<BottomSheet
					open={open}
					onClose={() => onClose()}
					sheetBodyStyles={{ position: "relative" }}
					title="Options"
				>
					<PostOptions
						onClose={() => onClose()}
						post={post}
					/>
				</BottomSheet>
			) : (
				<CustomModal closeIcon={true} open={open} onClose={() => onClose()}>
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
									Options
								</Typography>
							</StyledHeader>
						)}
						<PostOptions
							onClose={onClose}
							post={post}
						/>
					</Wrappper>
				</CustomModal>
			)}
		</>
	);
}

export default PostOptionsWindow;
