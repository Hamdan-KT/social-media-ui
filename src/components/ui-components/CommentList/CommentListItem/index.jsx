import { FavoriteBorder, Favorite } from "@mui/icons-material";
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

export default function CommentListItem({
	comment = {},
	primaryText = "",
	secondaryText = "",
}) {
	const theme = useTheme();
	const [showReply, setShowReply] = useState(false);

	const handleViewReply = () => {
		setShowReply(true);
	};

	return (
		<>
			<ListItem
				dense
				disableGutters
				disablePadding
				sx={{ p: "0.2rem 2rem 0.2rem 0.7rem", userSelect: "none" }}
				alignItems="flex-start"
				secondaryAction={
					<Checkbox
						aria-label="like"
						icon={
							<FavoriteBorder
								sx={{
									color: `${theme.palette.text.dark}`,
									fontSize: "0.9rem",
								}}
							/>
						}
						checkedIcon={
							<Favorite
								sx={{
									color: `${theme.palette.error.main}`,
									fontSize: "0.9rem",
								}}
							/>
						}
					/>
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
						<Typography variant="userName">
							{comment[primaryText] ?? comment?.name}
							<Typography variant="commonText" sx={{ ml: 1 }}>
								{comment[secondaryText] ?? comment?.comment}
							</Typography>
						</Typography>
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
										variant="subtitle2"
										sx={{ cursor: "pointer", mt: 0.5 }}
									>
										--- View replies({comment?.replies?.length})
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
