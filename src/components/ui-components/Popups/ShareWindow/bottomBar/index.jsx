import ReactIcons from "utils/ReactIcons";
import {
	Box,
	Button,
	IconButton,
	InputBase,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React from "react";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	gap: "1rem",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `0.3rem`,
		transition: theme.transitions.create("width"),
	},
}));

function ShareBottomBar() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Box
			sx={{
				display: "flex",
				width: "100%",
				position: matchDownSm ? "sticky" : "absolute",
				left: 0,
				bottom: 0,
				padding: "1rem",
				background: theme.palette.background.paper,
				borderTop: `1px solid ${theme.palette.grey[100]}`,
				height: "7rem",
			}}
		>
			{/* <CommonBox
				sx={{ gap: "2rem", overflowX: "scroll" }}
				className="scrollbar-hide"
			>
				<CommonBox sx={{ flexDirection: "column", width: "auto", gap: 0 }}>
					<IconButton
						sx={{ padding: "0.8rem", background: theme.palette.grey[300] }}
					>
						<ReactIcons.RiLinkM style={{ color: theme.palette.text.primary }} />
					</IconButton>
					<Typography variant="greyTagsXs">Copy link</Typography>
				</CommonBox>
				<CommonBox sx={{ flexDirection: "column", width: "auto", gap: 0 }}>
					<IconButton
						sx={{ padding: "0.8rem", background: theme.palette.grey[300] }}
					>
						<ReactIcons.FaWhatsapp
							style={{ color: theme.palette.text.primary }}
						/>
					</IconButton>
					<Typography variant="greyTagsXs">WhatsApp</Typography>
				</CommonBox>
				<CommonBox sx={{ flexDirection: "column", width: "auto", gap: 0 }}>
					<IconButton
						sx={{ padding: "0.8rem", background: theme.palette.grey[300] }}
					>
						<ReactIcons.HiDownload
							style={{ color: theme.palette.text.primary }}
						/>
					</IconButton>
					<Typography variant="greyTagsXs">Download</Typography>
				</CommonBox>

				<CommonBox sx={{ flexDirection: "column", width: "auto", gap: 0 }}>
					<IconButton
						sx={{ padding: "0.8rem", background: theme.palette.grey[300] }}
					>
						<ReactIcons.FiShare style={{ color: theme.palette.text.primary }} />
					</IconButton>
					<Typography variant="greyTagsXs">Share to</Typography>
				</CommonBox>
			</CommonBox> */}
			<CommonBox sx={{ flexDirection: "column", gap: 1 }}>
				<StyledInputBase
					fullWidth
					// value={value}
					// onChange={(e) => setValue(e.target.value)}
					type="text"
					placeholder="Write a message..."
					inputProps={{ "aria-label": "text" }}
				/>
				<Button
					variant="contained"
					sx={{ fontWeight: "bold", borderRadius: 2 }}
					fullWidth
					disableElevation
				>
					Send
				</Button>
			</CommonBox>
		</Box>
	);
}

export default ShareBottomBar;
