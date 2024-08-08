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

function PhotoType({ mediaItem, chat, onClick, sx = {} }) {
	return (
		<>
			<StyledBox chat={chat} onClick={onClick} sx={sx}>
				<img
					style={{
						display: "block",
						width: "100%",
						objectFit: "cover",
					}}
					draggable="false"
					src={mediaItem.src}
				/>
			</StyledBox>
		</>
	);
}

export default PhotoType;
