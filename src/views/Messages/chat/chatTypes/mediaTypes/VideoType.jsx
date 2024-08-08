import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme, chat }) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  borderRadius: "20px",
  overflow: "hidden",
}));

function VideoType({ mediaItem, chat, onClick, sx = {} }) {
	return (
		<>
			<StyledBox chat={chat} onClick={onClick} sx={sx}>
				<video
					style={{
						display: "block",
						width: "100%",
						objectFit: "cover",
					}}
					src={mediaItem.src}
					draggable="false"
				/>
			</StyledBox>
		</>
	);
}

export default VideoType;
