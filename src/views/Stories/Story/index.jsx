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
import StoryBottomBar from "./BottomBar";
import StoryHeader from "./Header";
import ProfileAvatar from "src/components/common/ProfileAvatar";
import ReactIcons from "src/utils/ReactIcons";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
}));

const Story = forwardRef(function Story(
	{ story, isActive, handleNext, handlePrev, isStart, isEnd, ...others },
	ref
) {
	const theme = useTheme();
	return (
		<Box
			className="story"
			ref={ref}
			sx={{
				// overflow: "hidden",
				borderRadius: "10px",
				position: "relative",
				zIndex: 9,
			}}
		>
			<CommonBox
				sx={{
					overflow: "hidden",
					width: "100%",
					height: "100%",
					borderRadius: "10px",
					cursor: !isActive && "pointer",
				}}
				{...others}
			>
				{/* Header */}
				{isActive && <StoryHeader story={story} />}
				{/* content section */}
				<Image
					src={story?.medias[0]?.url}
                    draggable={false}
					style={{ display: "block", width: "100%", objectFit: "cover", userSelect: "none" }}
				/>
				{/* profile Avatar for in active stories */}
				{!isActive && (
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
				)}
				{/* bottom bar */}
				{isActive && <StoryBottomBar story={story} />}
			</CommonBox>
			{/* controle btns */}
			{isActive && (
				<>
					{!isStart && (
						<IconButton
							disableRipple
							size="small"
							sx={{
								position: "absolute",
								left: "-8%",
								top: "50%",
								transform: "translateY(-50%)",
								zIndex: 10,
								backgroundColor: "rgba(202, 202, 202, 0.61)",
								"&:hover": {
									backgroundColor: theme.palette.background.paper,
								},
							}}
							onClick={handlePrev}
						>
							<ReactIcons.MdNavigateBefore
								style={{ color: theme.palette.common.black }}
							/>
						</IconButton>
					)}
					{!isEnd && (
						<IconButton
							disableRipple
							size="small"
							sx={{
								position: "absolute",
								right: "-8%",
								top: "50%",
								transform: "translateY(-50%)",
								zIndex: 10,
								backgroundColor: "rgba(202, 202, 202, 0.61)",
								"&:hover": {
									backgroundColor: theme.palette.background.paper,
								},
							}}
							onClick={handleNext}
						>
							<ReactIcons.MdNavigateNext
								style={{ color: theme.palette.common.black }}
							/>
						</IconButton>
					)}
				</>
			)}
		</Box>
	);
});

export default Story;
