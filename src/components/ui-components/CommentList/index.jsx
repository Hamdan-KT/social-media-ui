/* eslint-disable react/display-name */
import * as React from "react";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";
import CommentListItem from "./CommentListItem";
import CommentListSkeleton from "./skelton";
import { Box } from "@mui/material";

const CommentList = React.forwardRef(
	(
		{
			data = [],
			isLoading = false,
			primaryText,
			secondaryText,
			sx = {},
			skeltonSx = {},
		},
		ref
	) => {
		const theme = useTheme();

		if (!isLoading && data?.length === 0) {
			return null;
		}

		if (isLoading) {
			return <CommentListSkeleton sx={skeltonSx} />;
		}

		return (
			<List
				// ref={ref}
				sx={{
					width: "100%",
					bgcolor: theme.palette.background.default,
					...sx,
				}}
			>
				{data?.pages?.map((page, pageIndex, pageArr) => (
					<>
						{page?.data?.map((comment, commentIndex, commentArr) => (
							<CommentListItem
								ref={
									pageIndex === pageArr.length - 1 &&
									commentIndex === commentArr.length - 1
										? ref
										: undefined
								}
								key={commentIndex}
								data={comment}
							/>
						))}
					</>
				))}
			</List>
		);
	}
);

export default CommentList;
