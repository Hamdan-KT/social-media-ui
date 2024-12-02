/* eslint-disable react/display-name */
import * as React from "react";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";
import SelectionListItem from "./SelectionListItem";

const SelectionList = React.forwardRef(
	(
		{
			sx = {},
			onClick = () => {},
			data = [],
			selection,
			setSelection,
			dataTag = "_id",
			onChange = () => {},
		},
		ref
	) => {
		const theme = useTheme();
		return (
			<List
				dense
				sx={{
					width: "100%",
					maxWidth: 360,
					bgcolor: theme.palette.background.default,
					gap: "0.5rem",
					...sx,
				}}
			>
				{data?.pages?.map((page, pageIndex, pageArr) => (
					<React.Fragment key={pageIndex}>
						{page?.data?.map((user, userIndex, userArr) => (
							<SelectionListItem
								ref={
									pageIndex === pageArr.length - 1 &&
									userIndex === userArr.length - 1
										? ref
										: undefined
								}
								key={userIndex}
								data={user}
								primaryText={user?.userName}
								onClick={onClick}
								selection={selection}
								setSelection={setSelection}
								dataTag={dataTag}
								index={userIndex}
								onChange={onChange}
							/>
						))}
					</React.Fragment>
				))}
			</List>
		);
	}
);

export default SelectionList;
