import Video from "src/components/common/Video";
import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme, chat }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	height: "100%",
	borderRadius: "20px",
	overflow: "hidden",
	background: "black"
}));

function VideoType({ mediaItem, chat, onClick, sx = {}, ...rest }) {
	return (
		<>
			<StyledBox chat={chat} onClick={onClick} sx={sx}>
				<Video
					style={{
						display: "block",
						width: "100%",
						objectFit: "contain",
					}}
					src={mediaItem.url}
					draggable="false"
					{...rest}
				/>
			</StyledBox>
		</>
	);
}

export default VideoType;
