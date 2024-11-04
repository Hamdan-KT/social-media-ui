import {
	Box,
	Typography,
	useTheme,
	IconButton,
	Checkbox,
	useMediaQuery,
	Menu,
	styled,
	InputBase,
	Grid,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { commentList } from "src/data";
import CommentList from "components/ui-components/CommentList";
import Picker from "@emoji-mart/react";
import ReactIcons from "utils/ReactIcons";
import emojiData from "@emoji-mart/data";
import Slide from "components/common/Carousel/Slide";
import Slider from "components/common/Carousel/Carousel";
import ProfileAvatar from "components/common/ProfileAvatar";
import PopOver from "components/common/Popover";
import { useDispatch } from "react-redux";
import { handleShareWindowOpen } from "app/slices/shareSlice/shareSlice";
import AvatarSet from "components/common/AvatarSet";
import Video from "components/common/Video";
import Image from "components/common/Image";

const commonStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const InputBox = styled("div")(({ theme }) => ({
	display: "flex",
	position: "relative",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	borderRadius: "55px",
	width: "100%",
	padding: "0.2rem 0.2rem",
	border: `1px solid ${theme.palette.grey[300]}`,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `0.3rem`,
		transition: theme.transitions.create("width"),
	},
}));

function PostLarge({ data }) {
	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const [value, setValue] = useState("");
	const emojPopRef = useRef();
	const dispatch = useDispatch();


	return (
		<Box
			sx={{
				...commonStyle,
				height: "auto",
				display: "flex",
				width: { sm: "90vw", md: "77.9vw" },
				// maxWidth: { sm: "90vw", md: "77.9vw" },
				overflow: "hidden",
				position: "relative",
				background: theme.palette.common.white,
			}}
		>
			<Grid container sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
				<Grid item sm={7} md={8}>
					<Slider
						sx={{
							width: "100%",
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{Array.isArray(data?.media) &&
							data?.media.map((media, ind) => (
								<Slide
									key={media.uID}
									sx={{
										width: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										position: "relative",
										overflow: "hidden",
										height: "100%",
									}}
								>
									{media.type === "image" && (
										<Image
											style={{
												maxHeight: "92vh",
												width: "100%",
												display: "block",
												objectFit: "contain",
											}}
											alt="Not found!"
											key={ind}
											src={media.src}
											loading="lazy"
											draggable={false}
										/>
									)}
									{media.type === "video" && (
										<Video
											controls
											key={ind}
											src={media.src}
											alt="Not Found!"
											style={{
												maxHeight: "92vh",
												width: "100%",
												display: "block",
												objectFit: "contain",
											}}
											loading="lazy"
											draggable={false}
										/>
									)}
									{/* {media?.isTagged && } */}
									<Box
										sx={{
											position: "absolute",
											padding: "5px",
											display: "flex",
											widht: "auto",
											height: "auto",
											left: "10px",
											bottom: "10px",
											borderRadius: "50%",
											background: "black",
											cursor: "pointer",
										}}
									>
										<ReactIcons.IoPerson
											size={14}
											style={{ color: "white", margin: 0 }}
										/>
									</Box>
								</Slide>
							))}
					</Slider>
				</Grid>
				<Grid item sm={5} md={4}>
					<Box
						sx={{
							height: "100%",
							background: theme.palette.background.paper,
							borderLeft: `1px solid ${theme.palette.grey[300]}`,
						}}
					>
						{/* header */}
						<Box
							sx={{
								...commonStyle,
								justifyContent: "start",
								gap: "0.5rem",
								p: 1.5,
								width: "100%",
								borderBottom: `1px solid ${theme.palette.grey[300]}`,
							}}
						>
							<Box sx={commonStyle}>
								<ProfileAvatar data={data} sx={{ width: 36, height: 36 }} />
							</Box>
							<Box
								sx={{
									...commonStyle,
									alignItems: "start",
									flexDirection: "column",
								}}
							>
								<Typography variant="userName">{data?.name}</Typography>
								<Typography variant="caption">{"secondary text"}</Typography>
							</Box>
						</Box>
						{/* comments */}
						<Box
							className="scrollbar-hide"
							sx={{
								...commonStyle,
								maxHeight: {
									sm: "calc(50vh)",
									md: "calc(100vh - 18rem)",
								},
								padding: "0 0.2rem",
								width: "100%",
								overflowY: "scroll",
								justifyContent: "start",
								alignItems: "start",
							}}
						>
							<CommentList data={commentList} />
						</Box>
						{/* post info */}
						<Box
							sx={{
								...commonStyle,
								width: "100%",
								alignItems: "start",
								flexDirection: "column",
								borderTop: `1px solid ${theme.palette.grey[300]}`,
							}}
						>
							<Box
								sx={{
									...commonStyle,
									justifyContent: "start",
									alignItems: "center",
									width: "100%",
								}}
							>
								<Checkbox
									size="small"
									aria-label="like"
									icon={
										<ReactIcons.AiOutlineHeart
											style={{
												color: `${theme.palette.text.dark}`,
												fontSize: 28,
											}}
										/>
									}
									checkedIcon={
										<ReactIcons.AiFillHeart
											style={{
												color: `${theme.palette.error.main}`,
												fontSize: 28,
											}}
										/>
									}
								/>
								<Typography variant="userName">2,034</Typography>
								<IconButton aria-label="comment">
									<ReactIcons.RiChat3Line
										style={{
											color: `${theme.palette.text.dark}`,
											fontSize: 25,
											transform: "scaleX(-1)",
										}}
									/>
								</IconButton>
								<Typography variant="userName">1,034</Typography>
								<IconButton
									aria-label="share"
									onClick={() => dispatch(handleShareWindowOpen(true))}
								>
									<ReactIcons.LuSend
										style={{
											color: `${theme.palette.text.dark}`,
											fontSize: 24,
											transform: "rotate(20deg)",
										}}
									/>
								</IconButton>
								<Typography variant="userName">534</Typography>
								<Checkbox
									sx={{ ml: "auto" }}
									aria-label="save"
									icon={
										<ReactIcons.RiBookmarkLine
											style={{
												color: `${theme.palette.text.dark}`,
												fontSize: 25,
											}}
										/>
									}
									checkedIcon={
										<ReactIcons.RiBookmarkFill
											style={{
												color: `${theme.palette.text.dark}`,
												fontSize: 25,
											}}
										/>
									}
								/>
							</Box>
							<Box
								sx={{
									...commonStyle,
									alignItems: "start",
									padding: "0.2rem 0.8rem",
									flexDirection: "column",
									width: "100%",
								}}
							>
								<Box sx={{ display: "flex", alignItems: "center" }}>
									<AvatarSet size={18} />
									<Typography variant="body" ml={0.5}>
										Liked by <Typography variant="userName">Hamdan</Typography>{" "}
										and <Typography variant="userName">Others</Typography>
									</Typography>
								</Box>
								<Typography variant="caption">4 days ago</Typography>
							</Box>
						</Box>
						<Box sx={{ ...commonStyle, width: "100%", p: "0.4rem" }}>
							<InputBox>
								{matchDownMd ? null : (
									<PopOver
										ref={emojPopRef}
										Button={
											<IconButton color="inherit">
												<ReactIcons.LuSmile />
											</IconButton>
										}
									>
										<Picker
											data={emojiData}
											theme="light"
											onEmojiSelect={(e) => setValue((prev) => prev + e.native)}
										/>
									</PopOver>
								)}
								<StyledInputBase
									fullWidth
									value={value}
									onChange={(e) => setValue(e.target.value)}
									type="text"
									placeholder="Add a comment for ..."
									inputProps={{ "aria-label": "text" }}
								/>
								{value && (
									<Typography
										variant="body"
										sx={{
											cursor: "pointer",
											padding: "0 0.3rem",
											fontWeight: 600,
										}}
										color={theme.palette.primary.main}
									>
										Post
									</Typography>
								)}
							</InputBox>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default PostLarge;
