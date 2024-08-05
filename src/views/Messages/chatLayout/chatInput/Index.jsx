import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {
	Box,
	IconButton,
	Menu,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import _ from "lodash";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
// imoji picker import
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import ReactIcons from "utils/ReactIcons";
import { updateAttachment } from "app/slices/messageSlice/messageSlice";

const StyledToolBar = styled(Toolbar)(({ theme, isAttachment }) => ({
	display: "flex",
	flexDirection: "column",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: theme.palette.background.default,
	borderTop: isAttachment ? `1px solid ${theme.palette.grey[300]}` : "",
	padding: "0.5rem 0.5rem",
	[theme.breakpoints.down("md")]: {
		position: "fixed",
		bottom: 0,
		padding: "0.5rem 0.3rem",
		width: `calc(100% - ${theme.spacing(10)})`,
		left: `calc(${theme.spacing(10)} + 1px)`,
	},
	[theme.breakpoints.down("sm")]: {
		position: "fixed",
		width: `100%`,
		bottom: 0,
		left: 0,
		padding: "0.5rem 0.3rem 0.8rem 0.3rem",
	},
	zIndex: 7,
}));

const Search = styled("div")(({ theme }) => ({
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
		paddingLeft: `0.5rem`,
		transition: theme.transitions.create("width"),
	},
}));

const AttachmentView = styled("div")(({ theme }) => ({
	display: "flex",
	position: "relative",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",
	padding: "0.2rem 0.5rem",
}));

function ChatInput() {
	const [value, setValue] = useState("");
	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const dispatch = useDispatch();
	const messageState = useSelector((state) => state.message);

	// handling emoji window
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<StyledToolBar
			disableGutters
			isAttachment={Boolean(messageState?.attachment?.messageId)}
		>
			{messageState?.attachment?.messageId && (
				<AttachmentView>
					<Box sx={{ display: "flex", flexDirection: "column", width: "90%" }}>
						<Typography variant="subtitle1">
							Replying to
							{/* GrAttachment */}
							<Typography variant="userName">
								{messageState?.attachment?.name}
							</Typography>
						</Typography>
						<Typography variant="disabled" textOverflow="ellipsis" noWrap>
							{messageState?.attachment?.message}
						</Typography>
					</Box>
					<Box>
						<ReactIcons.IoClose
							style={{ cursor: "pointer" }}
							size={20}
							onClick={() => dispatch(updateAttachment({}))}
						/>
					</Box>
				</AttachmentView>
			)}
			<Search>
				{matchDownMd ? (
					<IconButton
						sx={{ background: "#673ab7", "&:hover": { background: "#673ab7" } }}
					>
						<CameraAltIcon sx={{ color: "#ffff" }} />
					</IconButton>
				) : (
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
				{value ? (
					<IconButton
						color="inherit"
						sx={{
							width: 70,
							borderRadius: 50,
							background: "#673ab7",
							"&:hover": { background: "#673ab7" },
						}}
					>
						<SendIcon sx={{ color: "#ffff" }} />
					</IconButton>
				) : (
					<>
						<IconButton color="inherit">
							<ReactIcons.RiHeart3Line />
						</IconButton>
						<IconButton color="inherit">
							<ReactIcons.LuMic />
						</IconButton>
						<IconButton color="inherit">
							<ReactIcons.IoMdImages />
						</IconButton>
					</>
				)}
			</Search>
		</StyledToolBar>
	);
}

export default ChatInput;
