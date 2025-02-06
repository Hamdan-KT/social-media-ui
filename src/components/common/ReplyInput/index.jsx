import {
	Checkbox,
	IconButton,
	InputBase,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useRef, useState } from "react";
import PopOver from "../Popover";
import ReactIcons from "src/utils/ReactIcons";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const Search = styled("div")(({ theme }) => ({
	display: "flex",
	position: "relative",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	borderRadius: "55px",
	width: "100%",
	padding: "0rem 0rem",
	background: "transparent",
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

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
}));

function ReplyInput({ ...others }) {
	const [value, setValue] = useState("");
	const theme = useTheme();
	const emojPopRef = useRef();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<CommonBox sx={{ width: "100%", gap: "0.3rem" }}>
			<Search>
				<PopOver
					ref={emojPopRef}
					Button={
						<IconButton color={theme.palette.background.paper}>
							<ReactIcons.LuSmile
								style={{ color: theme.palette.background.paper }}
							/>
						</IconButton>
					}
				>
					<Picker
						data={data}
						theme="light"
						onEmojiSelect={(e) => setValue((prev) => prev + e.native)}
					/>
				</PopOver>
				<StyledInputBase
					fullWidth
					value={value}
					onChange={(e) => setValue(e.target.value)}
					type="text"
					inputProps={{
						sx: {
							"&::placeholder": {
								color: theme.palette.background.paper,
								opacity: 1,
							},
							color: theme.palette.background.paper,
						},
					}}
					{...others}
				/>
				{value && (
					<IconButton color="inherit">
						<ReactIcons.IoMdSend
							style={{ color: theme.palette.background.paper }}
						/>
					</IconButton>
				)}
			</Search>
			{!value && (
				<Checkbox
					size="small"
					aria-label="like"
					checked={data?.isLiked}
					// onChange={() => handleLiking(data?.isLiked)}
					icon={
						<ReactIcons.AiOutlineHeart
							style={{
								color: `${theme.palette.background.paper}`,
								fontSize: 25,
							}}
						/>
					}
					checkedIcon={
						<ReactIcons.AiFillHeart
							style={{
								color: `${theme.palette.error.main}`,
								fontSize: 25,
							}}
						/>
					}
				/>
			)}
			{!value && (
				<IconButton color="inherit" size="small">
					<ReactIcons.LuSend
						size={25}
						style={{ color: theme.palette.background.paper }}
					/>
				</IconButton>
			)}
		</CommonBox>
	);
}

export default ReplyInput;
