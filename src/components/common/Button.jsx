import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

const StyledBtn = styled(Button)(({ theme, color, variant }) => ({
	display: "flex",
	borderRadius: "8px",
	fontWeight: "bold",
	backgroundColor:
		variant === "contained"
			? theme.palette.primary.dark
			: theme.palette.grey[200],
	color:
		variant === "contained"
			? (color ?? theme.palette.background.default)
			: (color ?? theme.palette.text.primary),
	border: "none",
	"&:hover": {
		border: "none",
		backgroundColor:
			variant === "contained"
				? theme.palette.primary.main
				: theme.palette.grey[300],
	},
}));

function Btn({ children, sx, variant = "contained", color, ...rest }) {
	return (
		<StyledBtn
			variant={variant}
			color={color}
			disableFocusRipple
			disableElevation
			disableRipple
			disableTouchRipple
			sx={{
				padding: {
					xs: variant === "contained" ? "0.15rem 1.7rem" : "0.15rem 1.7rem",
					sm: variant === "contained" ? "0.25rem 0.4rem" : "0.25rem 0.4rem",
				},
				fontSize: { xs: "0.85rem", sm: "0.75" },
				...sx,
			}}
			{...rest}
		>
			{children}
		</StyledBtn>
	);
}

export default Btn;
