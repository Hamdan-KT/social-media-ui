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
				{/* profile Avatar for in active stories */}
				<CommonBox
					sx={{
						position: "absolute",
						zIndex: 10,
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)",
						flexDirection: "column",
						transition: "0.3s ease-in-out",
					}}
				>
					<ProfileAvatar profile={story?.avatar} userName={story?.name} />
					<Typography
						variant="userName"
						sx={{ color: theme.palette.background.paper }}
					>
						{story?.name}
						<Typography
							variant="greyTags"
							sx={{
								color: theme.palette.grey[300],
								fontSize: "0.8rem",
								fontWeight: "medium",
								ml: 1,
							}}
						>
							2d
						</Typography>
					</Typography>
				</CommonBox>
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
