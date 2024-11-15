/* eslint-disable react/display-name */
import * as React from "react";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";
import CommentListItem from "./CommentListItem";

const CommentList = React.forwardRef(
	({ data = [], primaryText, secondaryText, sx = {} }, ref) => {
		const theme = useTheme();

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
