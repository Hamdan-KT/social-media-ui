import Image from "src/components/common/Image";
import {
	Avatar,
	Box,
	IconButton,
	styled,
	Typography,
	useTheme,
} from "@mui/material";
import React from "react";
import { forwardRef } from "react";
import ReplyInput from "src/components/common/ReplyInput";
import StoryBottomBar from "../../BottomBar";
import StoryHeader from "../../Header";
import ProfileAvatar from "src/components/common/ProfileAvatar";
import ReactIcons from "src/utils/ReactIcons";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
}));

const StorySM = forwardRef(function Story(
	{
		story,
		isActive,
		handleNext,
		handlePrev,
		isStart,
		isEnd,
		containerSx,
		sx,
		...others
	},
	ref
) {
	const theme = useTheme();
	return (
		<Box
			ref={ref}
			sx={{
				borderRadius: "10px",
				position: "relative",
				zIndex: 9,
				maxWidth: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "start",
				...containerSx,
			}}
		>
			<CommonBox
				sx={{
					overflow: "hidden",
					width: "100%",
					height: "auto",
					borderRadius: "10px",
					cursor: "pointer",
					aspectRatio: "9/16",
					justifyContent: "start",
					alignItems: "start",
					flexDirection: "column",
					position: "relative",
					mt: 2,
					...sx,
				}}
				{...others}
			>
				{/* Header */}
				<StoryHeader story={story} />
				{/* content section */}
				<Image
					src={story?.medias[0]?.url}
					draggable={false}
					style={{
						display: "block",
						width: "100%",
						objectFit: "cover",
						userSelect: "none",
					}}
				/>
			</CommonBox>
			{/* bottom bar */}
			<StoryBottomBar
				story={story}
				sx={{ position: "relative", padding: "0.5rem" }}
			/>
		</Box>
	);
});

export default StorySM;
