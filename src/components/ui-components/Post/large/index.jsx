import {
	Box,
	Typography,
	useTheme,
	Avatar,
	IconButton,
	Checkbox,
	useMediaQuery,
	Menu,
	styled,
	InputBase,
	Grid,
} from "@mui/material";
import React, { useState } from "react";
import { commentList, userPosts } from "src/data";
import CommentList from "components/ui-components/CommentList";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import Picker from "@emoji-mart/react";
import ReactIcons from "utils/ReactIcons";
import data from "@emoji-mart/data";
import Slide from "components/common/Carousel/Slide";
import Slider from "components/common/Carousel/Carousel";

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

function PostLarge() {
	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const [value, setValue] = useState("");
	const [anchorEl, setAnchorEl] = useState(null);
	const menuOpen = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box
			sx={{
				...commonStyle,
				height: "auto",
				display: "flex",
				maxWidth: { sm: "90vw", md: "77.9vw" },
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
						{Array.isArray(userPosts[0].media) &&
							userPosts[0].media.map((media, ind) => (
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
										<img
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
										<video
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
								<Avatar src={userPosts[0]?.profile} />
							</Box>
							<Box
								sx={{
									...commonStyle,
									alignItems: "start",
									flexDirection: "column",
								}}
							>
								<Typography variant="userName">{userPosts[0]?.name}</Typography>
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
									md: "calc(100vh - 16.4rem)",
								},
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
									alignItems: "start",
									width: "100%",
								}}
							>
								<Checkbox
									aria-label="like"
									icon={
										<ReactIcons.RiHeart3Line
											style={{
												color: `${theme.palette.text.dark}`,
												fontSize: 25,
											}}
										/>
									}
									checkedIcon={
										<ReactIcons.RiHeart3Fill
											style={{
												color: `${theme.palette.error.main}`,
												fontSize: 25,
											}}
										/>
									}
								/>
								<IconButton aria-label="comment">
									<ReactIcons.RiChat1Line
										style={{
											color: `${theme.palette.text.dark}`,
											fontSize: 25,
										}}
									/>
								</IconButton>
								<IconButton aria-label="share">
									<ReactIcons.LuSend
										style={{
											color: `${theme.palette.text.dark}`,
											fontSize: 25,
										}}
									/>
								</IconButton>
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
									padding: "0.2rem 0.8rem",
									flexDirection: "column",
								}}
							>
								<Typography variant="caption">4 days ago</Typography>
							</Box>
						</Box>
						<Box sx={{ ...commonStyle, width: "100%", p: "0.4rem" }}>
							<InputBox>
								{matchDownMd ? null : (
									<>
										<Menu
											id="emoji-menu"
											aria-labelledby="emoji-menu"
											anchorEl={anchorEl}
											open={menuOpen}
											onClose={handleClose}
											anchorOrigin={{
												vertical: "top",
												horizontal: "bottom",
											}}
											transformOrigin={{
												vertical: "bottom",
												horizontal: "top",
											}}
										>
											<Picker
												data={data}
												theme="light"
												onEmojiSelect={(e) =>
													setValue((prev) => prev + e.native)
												}
											/>
										</Menu>
										<IconButton color="inherit" onClick={handleClick}>
											<SentimentSatisfiedOutlinedIcon />
										</IconButton>
									</>
								)}
								<StyledInputBase
									fullWidth
									value={value}
									onChange={(e) => setValue(e.target.value)}
									type="text"
									placeholder="Message..."
									inputProps={{ "aria-label": "text" }}
								/>
								{value && (
									<Typography
										variant="body"
										sx={{ cursor: "pointer", padding: "0 0.3rem" }}
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
