import {
	Avatar,
	Box,
	Checkbox,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	useTheme,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import CommentList from "..";
import DefaultLoader from "components/common/DefaultLoader";
import ReactIcons from "utils/ReactIcons";

export default function CommentListItem({
	comment = {},
	primaryText = "",
	secondaryText = "",
}) {
	const theme = useTheme();
	const [showReply, setShowReply] = useState(false);

	const handleViewReply = () => {
		setShowReply(!showReply);
	};

	return (
		<>
			<ListItem
				dense
				disableGutters
				disablePadding
				sx={{ p: "0.9rem 2rem 0.2rem 0.5rem", userSelect: "none" }}
				alignItems="flex-start"
				secondaryAction={
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Checkbox
							sx={{padding: "0.2rem 0.5rem"}}
							size="small"
							aria-label="like"
							icon={
								<ReactIcons.AiOutlineHeart
								size={17}
									style={{
										color: `${theme.palette.grey[500]}`,
									}}
								/>
							}
							checkedIcon={
								<ReactIcons.AiFillHeart
								size={17}
									style={{
										color: `${theme.palette.error.main}`,
									}}
								/>
							}
						/>
						<Typography variant="caption" sx={{ fontWeight: "bold" }}>
							325
						</Typography>
					</Box>
				}
			>
				<ListItemAvatar>
					<Avatar sx={{ width: 33, height: 33 }} src={comment?.profile} />
				</ListItemAvatar>
				<ListItemText
					sx={{ width: "100%" }}
					primaryTypographyProps={{
						fontSize: 13,
						fontWeight: "bold",
						whiteSpace: "wrap",
						flexWrap: "wrap",
					}}
					secondaryTypographyProps={{
						whiteSpace: "wrap",
						flexWrap: "wrap",
						fontSize: 12,
					}}
				>
					<Box>
						<Box sx={{ display: "flex", flexDirection: "column" }}>
							<Typography variant="userName">
								{comment[primaryText] ?? comment?.name}
							</Typography>
							<Typography variant="commonText">
								{comment[secondaryText] ?? comment?.comment}
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								width: "100%",
								gap: "1rem",
								cursor: "pointer",
							}}
						>
							<Typography variant="caption">{comment?.time}</Typography>
							<Typography variant="caption" sx={{ fontWeight: "bold" }}>
								{`${comment?.likes} `}likes
							</Typography>
							<Typography variant="caption" sx={{ fontWeight: "bold" }}>
								Reply
							</Typography>
						</Box>
						{comment?.replies &&
							Array.isArray(comment?.replies) &&
							comment?.replies?.length && (
								<Box
									sx={{
										display: "flex",
										width: "max-content",
										alignItems: "center",
										justifyContent: "center",
										gap: "0.3rem",
									}}
								>
									<Typography
										onClick={handleViewReply}
										variant="caption"
										sx={{ cursor: "pointer", mt: 0.5, fontWeight: "bold" }}
									>
										{showReply
											? `--- Hide replies`
											: `--- View replies(${comment?.replies?.length})`}
									</Typography>
									{/* <DefaultLoader /> */}
								</Box>
							)}
					</Box>
				</ListItemText>
			</ListItem>
			{showReply && (
				<Box sx={{ ml: 6.7 }}>
					<CommentList data={comment?.replies} />
				</Box>
			)}
		</>
	);
}
