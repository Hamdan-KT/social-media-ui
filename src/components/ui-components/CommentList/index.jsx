/* eslint-disable react/display-name */
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Checkbox, ListItemButton, Typography } from "@mui/material";
import { useState } from "react";
import CommentListItem from "./CommentListItem";

function CommentList({ data, primaryText, secondaryText, sx = {} }) {
	const theme = useTheme();

	return (
		<List
			sx={{
				width: "100%",
				bgcolor: theme.palette.background.default,
				...sx,
			}}
		>
			{data?.map((comment, index) => {
				return (
					<CommentListItem
						key={index}
						comment={comment}
						primaryText={primaryText}
						secondaryText={secondaryText}
					/>
				);
			})}
		</List>
	);
}

export default CommentList;
