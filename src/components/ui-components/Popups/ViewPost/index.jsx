import { Box, Modal, Typography, Backdrop, Fade, Grid, CardMedia, Dialog, useTheme, Avatar, IconButton, Checkbox, useMediaQuery, Menu, styled, InputBase, Button } from '@mui/material';
import React from 'react'
import PostSlider from '../../Post/PostSlider';
import { commentList, userPosts } from 'src/data';
import CommentList from '../../CommentList';
import { Bookmark, BookmarkBorderOutlined, Favorite, FavoriteBorder } from '@mui/icons-material';
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
// imoji picker import
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from 'react';
import CustomModal from 'components/common/Modal';
import ReactIcons from "utils/ReactIcons";

// box layout style
const style = {
	position: "absolute",
	top: "50%",
  	left: "50%",
  	display: "flex",
	alignItems: "center",
	width: "max-content",
	transform: "translate(-50%, -50%)",
	maxWidth: { xs: "98vw", sm: "98vw", md: "90vw" },
	bgcolor: "background.paper",
	border: "2px solid #000",
	height: "95vh",
	maxHeight: "95vh",
};


const commonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

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
 
function ViewPost() {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
		const open = Boolean(anchorEl);

		// handling emoji window
		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};
		const handleClose = () => {
			setAnchorEl(null);
		};

  return (
		<CustomModal open={true} closeIcon={true}>
			<Box
				sx={{
					...commonStyle,
					height: "93vh",
					maxHeight: "95vh",
					bgcolor: "background.paper",
				}}
			>
				<Box sx={{ ...commonStyle, height: "93vh" }}>
					<Box sx={{ width: "500px", height: "auto", backgroundColor: "red" }}>
						<PostSlider medias={userPosts[0].media} />
					</Box>
				</Box>
				<Box sx={{ height: "100%", width: "33vw" }}>
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
							height: "calc(100% - 12.5rem)",
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
									style={{ color: `${theme.palette.text.dark}`, fontSize: 25 }}
								/>
							</IconButton>
							<IconButton aria-label="share">
								<ReactIcons.LuSend
									style={{ color: `${theme.palette.text.dark}`, fontSize: 25 }}
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
										open={open}
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
											onEmojiSelect={(e) => setValue((prev) => prev + e.native)}
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
			</Box>
		</CustomModal>
	);
}

export default ViewPost;