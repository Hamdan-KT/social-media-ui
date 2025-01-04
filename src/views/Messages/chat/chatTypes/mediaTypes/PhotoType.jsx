import Image from "src/components/common/Image";
import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme, chat }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	height: "100%",
	borderRadius: "20px",
	overflow: "hidden",
	background: "black",
}));

function PhotoType({ mediaItem, chat, onClick, sx = {} }) {
	return (
		<>
			<StyledBox chat={chat} onClick={onClick} sx={sx}>
				<Image
					style={{
						display: "block",
						width: "100%",
						objectFit: "contain",
					}}
					draggable="false"
					src={mediaItem.url}
				/>
			</StyledBox>
		</>
	);
}

export default PhotoType;
