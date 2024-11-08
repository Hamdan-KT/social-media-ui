import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

function FollowBtn({
	children,
	sx,
	variant = "contained",
	color,
	isPublic,
	isFollowing,
	followingStatus,
	userID,
	...rest
}) {
	const StyledBtn = styled(Button)(({ theme }) => ({
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
		},
	}));

	return (
		<StyledBtn
			disableFocusRipple
			disableElevation
			sx={{
				padding: {
					xs: variant === "contained" ? "0.25rem 1.7rem" : "0.25rem 1.7rem",
					sm: variant === "contained" ? "0.25rem 0.4rem" : "0.14rem 0.4rem",
				},
				fontSize: { xs: "0.85rem", sm: "0.75" },
				...sx,
			}}
			variant={variant}
			{...rest}
		>
			{children}
		</StyledBtn>
	);
}

export default FollowBtn;
