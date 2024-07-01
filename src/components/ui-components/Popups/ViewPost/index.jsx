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
} from "@mui/material";
import React, { useState } from "react";
import PostSlider from "../../Post/PostSlider";
import { commentList, userPosts } from "src/data";
import CommentList from "components/ui-components/CommentList";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import Picker from "@emoji-mart/react";
import CustomModal from "components/common/Modal";
import ReactIcons from "utils/ReactIcons";
import data from "@emoji-mart/data";

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

function ViewPost() {
	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const [value, setValue] = useState("");
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

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
					height: "92vh",
					display: "flex",
					width: "auto",
					border: "5px solid black",
					overflow: "hidden",
				}}
			>
				<PostSlider
					medias={userPosts[0].media}
					mediaStyles={{ height: "92vh", width: "auto" }}
				/>
				<Box sx={{ height: "100%", width: "33vw", background: "green" }}>
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
