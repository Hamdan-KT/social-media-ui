/* eslint-disable no-mixed-spaces-and-tabs */
import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useState } from "react";
import { relationStatus } from "src/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { followUser, unfollowUser } from "src/api/userAPI";

function FollowBtn({
	children,
	sx,
	// variant = "contained",
	color,
	isPublic,
	isFollowing,
	followingStatus,
	userID,
	...rest
}) {
	const StyledBtn = styled(Button)(({ theme, variant }) => ({
		display: "flex",
		borderRadius: "8px",
		fontWeight: "bold",
		backgroundColor:
			variant === "contained"
				? theme.palette.primary.dark
				: theme.palette.grey[200],
		color:
			variant === "contained"
				? color ?? theme.palette.background.default
				: color ?? theme.palette.text.primary,
		borderColor: theme.palette.background.default,
		"&:hover": {
			borderColor: theme.palette.background.default,
			backgroundColor:
				variant === "contained"
					? theme.palette.primary.main
					: theme.palette.grey[300],
		},
	}));

	const [isFollowinUser, setIsFollowingUser] = useState(isFollowing);
	const [userFollowingStatus, setUserFollowingStatus] =
		useState(followingStatus);

	const handlefollowUser = useMutation({
		mutationKey: ["follow-user"],
		mutationFn: (values) => {
			const { isFollowinUser, isPublic, userID } = values;
			console.log({ values });
			!isPublic && !isFollowinUser
				? setUserFollowingStatus(relationStatus.REQUESTED)
				: setIsFollowingUser(true);
			return followUser(userID);
		},
		onSuccess: (data) => {},
		onError: (error) => {},
	});

	const handleUnfollowUser = useMutation({
		mutationKey: ["unfollow-user"],
		mutationFn: (values) => {
			const { userID } = values;
			console.log({ values });
			setIsFollowingUser(false);
			setUserFollowingStatus(undefined);
			return unfollowUser(userID);
		},
		onSuccess: (data) => {},
		onError: (error) => {},
	});

	return (
		<StyledBtn
			disableFocusRipple
			disableElevation
			disableRipple
			sx={{
				padding: {
					xs: isFollowinUser ? "0.25rem 1.7rem" : "0.25rem 1.7rem",
					sm: isFollowinUser ? "0.25rem 0.4rem" : "0.14rem 0.4rem",
				},
				fontSize: { xs: "0.83rem", sm: "0.75" },
				...sx,
			}}
			variant={
				isFollowinUser ||
				(!isFollowinUser && userFollowingStatus == relationStatus.REQUESTED)
					? "outlined"
					: "contained"
			}
			{...rest}
			onClick={() =>
				!isFollowinUser &&
				!isPublic &&
				userFollowingStatus === relationStatus.REQUESTED
					? handleUnfollowUser.mutate({
							isFollowinUser,
							userFollowingStatus,
							isPublic,
							userID,
					  })
					: !isFollowinUser
					? handlefollowUser.mutate({
							isFollowinUser,
							isPublic,
							userID,
					  })
					: handleUnfollowUser.mutate({
							isFollowinUser,
							userFollowingStatus,
							isPublic,
							userID,
					  })
			}
		>
			{!isFollowinUser && !userFollowingStatus
				? "Follow"
				: !isFollowinUser &&
				  !isPublic &&
				  userFollowingStatus == relationStatus.REQUESTED
				? "Requested"
				: "Following"}
		</StyledBtn>
	);
}

export default FollowBtn;
