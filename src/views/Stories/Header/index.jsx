import ReactIcons from "src/utils/ReactIcons";
import { RoutePath } from "src/utils/routes";
import { Avatar, styled, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
}));

function StoryHeader({ story = [] }) {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<CommonBox
			sx={{
				flexDirection: "column",
				width: "100%",
				position: "absolute",
				top: 0,
				left: 0,
			}}
		>
			{/* story count and duration bars */}
			<CommonBox
				sx={{ width: "100%", gap: "4px", padding: "0 0.5rem", mt: "0.5rem" }}
			>
				{story?.medias?.map((str, index) => (
					<CommonBox
						key={index}
						sx={{
							width: "100%",
							height: "2px",
							borderRadius: "50px",
							background: "white",
						}}
					></CommonBox>
				))}
			</CommonBox>
			{/* profile details */}
			<CommonBox sx={{ justifyContent: "space-between", width: "100%" }}>
				<CommonBox sx={{ flexDirection: "column" }}>
					<CommonBox sx={{ gap: "0.5rem", padding: "0.5rem" }}>
						<Avatar sx={{ width: 33, height: 33 }} src={story?.avatar} />
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
				<CommonBox>
					<ReactIcons.IoClose
						style={{
							color: theme.palette.background.paper,
							cursor: "pointer",
							fontSize: "2rem",
						}}
						onClick={() => navigate(RoutePath.HOME)}
					/>
				</CommonBox>
			</CommonBox>
		</CommonBox>
	);
}

export default StoryHeader;
