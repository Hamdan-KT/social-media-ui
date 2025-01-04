import ReactIcons from "src/utils/ReactIcons";
import { Checkbox, IconButton, styled, Tooltip, useTheme } from "@mui/material";
import React from "react";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
}));

function CallOptions() {
	const theme = useTheme();
	return (
		<CommonBox
			sx={{
				position: "absolute",
				bottom: 30,
				width: "auto",
				background: "rgba(0,0,0,0.5)",
				left: "50%",
				transform: "translateX(-50%)",
				borderRadius: "40px",
				gap: "1rem",
				padding: "0.5rem",
				zIndex: 10,
			}}
		>
			<Tooltip title="Screen Share" arrow placement="top">
				<Checkbox
					size="small"
					aria-label="screen-share"
					disableRipple
					// checked={data?.isLiked}
					// onChange={() => handleLiking(data?.isLiked)}
					sx={{
						background: theme.palette.grey[500],
					}}
					icon={
						<ReactIcons.LuScreenShare
							style={{
								color: theme.palette.common.white,
								fontSize: 28,
							}}
						/>
					}
					checkedIcon={
						<ReactIcons.LuScreenShare
							style={{
								color: `${theme.palette.text.primary}`,
								fontSize: 28,
							}}
						/>
					}
				/>
			</Tooltip>
			<Tooltip title="Video On/Off" arrow placement="top">
				<Checkbox
					size="small"
					aria-label="like"
					disableRipple
					// checked={data?.isLiked}
					// onChange={() => handleLiking(data?.isLiked)}
					sx={{
						background: theme.palette.grey[500],
					}}
					icon={
						<ReactIcons.IoVideocam
							style={{
								color: theme.palette.common.white,
								fontSize: 28,
							}}
						/>
					}
					checkedIcon={
						<ReactIcons.IoVideocamOff
							style={{
								color: `${theme.palette.text.primary}`,
								fontSize: 28,
							}}
						/>
					}
				/>
			</Tooltip>
			<Tooltip title="Mute/Unmute" arrow placement="top">
				<Checkbox
					size="small"
					aria-label="like"
					disableRipple
					// checked={data?.isLiked}
					// onChange={() => handleLiking(data?.isLiked)}
					sx={{
						background: theme.palette.grey[500],
					}}
					icon={
						<ReactIcons.IoMdMic
							style={{
								color: theme.palette.common.white,
								fontSize: 28,
							}}
						/>
					}
					checkedIcon={
						<ReactIcons.IoMdMicOff
							style={{
								color: `${theme.palette.text.primary}`,
								fontSize: 28,
							}}
						/>
					}
				/>
			</Tooltip>
			<Tooltip title="End Call" arrow placement="top">
				<IconButton
					size="medium"
					color="inherit"
					disableRipple
					sx={{ background: theme.palette.error.main }}
				>
					<ReactIcons.MdCallEnd
						style={{
							color: `${theme.palette.common.white}`,
							fontSize: 28,
						}}
					/>
				</IconButton>
			</Tooltip>
		</CommonBox>
	);
}

export default CallOptions;
