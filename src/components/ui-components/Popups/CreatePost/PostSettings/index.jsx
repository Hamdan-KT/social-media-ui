import ReactIcons from "utils/ReactIcons";
import {
	Avatar,
	Box,
	Collapse,
	Divider,
	IconButton,
	TextField,
	Typography,
	styled,
} from "@mui/material";
import React, { useRef, useState } from "react";
import MUISwitch from "components/common/formInputs/Switch";
import { useDispatch, useSelector } from "react-redux";
import { postStages as ps } from "utils/constants";
import { setPostDetails } from "src/app/slices/postSlice/postSlice";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import PopOver from "src/components/common/Popover";

const ContentBox = styled(Box)(({ theme }) => ({
	width: 340,
	height: "73vh",
	display: "flex",
	background: theme.palette.background.paper,
	flexDirection: "column",
	alignItems: "center",
	overflowY: "scroll",
	padding: "0.8rem",
	gap: "0.6rem",
	[theme.breakpoints.down("md")]: {
		height: "34.5vh",
	},
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

function PostSettings() {
	const postStates = useSelector((state) => state.post);
	const emojPopRef = useRef();
	const dispatch = useDispatch();
	const [openADVsettings, setOpenADVsettings] = useState(false);

	return (
		<Collapse in={postStates.postStages[ps.SHARE]} orientation="horizontal">
			{postStates.postStages[ps.SHARE] && (
				<ContentBox className="scrollbar-hide">
					<Box
						sx={{
							display: "flex",
							gap: "0.5rem",
							flexDirection: "row",
							width: "100%",
							alignItems: "center",
							justifyContent: "start",
						}}
					>
						<Avatar
							src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
							aria-label="profile-picture"
							sx={{ width: 30, height: 30 }}
						/>
						<Typography variant="userName">Jack_Sparrow</Typography>
					</Box>
					<Box
						sx={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							position: "relative",
						}}
					>
						<PopOver
							ref={emojPopRef}
							Button={
								<IconButton
									size="small"
									color="inherit"
									sx={{
										position: "absolute",
										top: 0,
										zIndex: 30,
										right: 0,
										cursor: "pointer",
									}}
								>
									<ReactIcons.LuSmile />
								</IconButton>
							}
						>
							<Picker
								data={data}
								theme="light"
								onEmojiSelect={(e) =>
									dispatch(
										setPostDetails({
											key: "caption",
											value: postStates?.postDetails?.caption + e.native,
										})
									)
								}
							/>
						</PopOver>
						<TextField
							id="outlined-basic"
							fullWidth
							multiline
							rows={6}
							placeholder="Write a caption"
							name="caption"
							value={postStates?.postDetails?.caption}
							onChange={(e) =>
								dispatch(
									setPostDetails({ key: e.target.name, value: e.target.value })
								)
							}
						/>
					</Box>
					<ItemsWrapper hoverEffect={true}>
						<Typography variant="body" sx={{ fontWeight: "medium" }}>
							Add Location
						</Typography>
						<ReactIcons.IoLocationOutline size={20} />
					</ItemsWrapper>
					<ItemsWrapper
						onClick={() => setOpenADVsettings(!openADVsettings)}
						hoverEffect={true}
					>
						<Typography variant="body" sx={{ fontWeight: "medium" }}>
							Advanced Settings
						</Typography>
						<ReactIcons.IoIosArrowDown size={20} />
					</ItemsWrapper>
					<Collapse in={openADVsettings} timeout={300} sx={{ width: "100%" }}>
						<ItemsWrapper
							sx={{
								alignItems: "start",
								flexDirection: "column",
							}}
						>
							<Typography variant="userName">Like and view counts</Typography>
							<ItemsWrapper sx={{ padding: "1rem 0rem" }}>
								<Typography>Hide like and view counts on this post</Typography>
								<MUISwitch
									name="isHideLikes"
									checked={postStates?.postDetails?.isHideLikes}
									onChange={(e) =>
										dispatch(
											setPostDetails({
												key: e.target.name,
												value: e.target.checked,
											})
										)
									}
								/>
							</ItemsWrapper>
							<Typography variant="caption">
								Only you will see the total number of likes and views on this
								post. You can change this later by going to the ... menu at the
								top of post.
							</Typography>
						</ItemsWrapper>
						<Divider />
						<ItemsWrapper
							sx={{
								alignItems: "start",
								flexDirection: "column",
							}}
						>
							<Typography variant="userName">Comments</Typography>
							<ItemsWrapper sx={{ padding: "1rem 0rem" }}>
								<Typography>Turn off commenting</Typography>
								<MUISwitch
									name="isDisableComment"
									checked={postStates?.postDetails?.isDisableComment}
									onChange={(e) =>
										dispatch(
											setPostDetails({
												key: e.target.name,
												value: e.target.checked,
											})
										)
									}
								/>
							</ItemsWrapper>
							<Typography variant="caption">
								You can change this later by going to the ... menu at the top of
								your post.
							</Typography>
						</ItemsWrapper>
						<Divider />
						<ItemsWrapper
							sx={{
								alignItems: "start",
								flexDirection: "column",
							}}
						>
							<Typography variant="userName">Accessibility</Typography>
							<ItemsWrapper sx={{ padding: "1rem 0rem" }}>
								<Typography>Write alt text</Typography>
							</ItemsWrapper>
							<Typography variant="caption">
								Alt text describes your photos for people with visual
								impairments. Alt text will be created automatically for your
								photos or you can choose to write you own
							</Typography>
						</ItemsWrapper>
					</Collapse>
				</ContentBox>
			)}
		</Collapse>
	);
}

export default PostSettings;
