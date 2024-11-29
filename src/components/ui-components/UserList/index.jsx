/* eslint-disable react/display-name */
import * as React from "react";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";
import UserListItem from "./UserListItem";
import UserListSkeleton from "./skelton";

const UserList = React.forwardRef(
	(
		{
			customButton,
			sx = {},
			onButtonClick = () => {},
			onClick,
			data = [],
			customButtonProps,
			actionButton = false,
			profileNavigation = true,
			skeltonSx = {},
		},
		ref
	) => {
		const theme = useTheme();

		if (data?.length === 0) {
			return <UserListSkeleton sx={skeltonSx} />;
		}

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
							<UserListItem
								ref={
									pageIndex === pageArr.length - 1 &&
									userIndex === userArr.length - 1
										? ref
										: undefined
								}
								key={userIndex}
								data={user}
								primaryText={user?.userName}
								// secondaryText={user?.name}
								customButtonProps={customButtonProps}
								actionButton={actionButton}
								onClick={onClick}
								onButtonClick={onButtonClick}
								customButton={customButton}
								profileNavigation={profileNavigation}
							/>
						))}
					</React.Fragment>
				))}
			</List>
		);
	}
);

export default UserList;
