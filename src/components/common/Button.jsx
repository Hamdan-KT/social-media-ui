import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

function Btn({ children, sx, variant = "contained", color, ...rest }) {

	const StyledBtn = styled(Button)(({ theme }) => ({
		display: "flex",
		padding: "0.35rem 1.7rem",
		fontSize: "0.75rem",
		borderRadius: "8px",
		fontWeight: "bold",
		backgroundColor:
			variant === "contained" ? theme.palette.primary.dark : "transparent",
		color:
			variant === "contained"
				? color ?? theme.palette.background.default
				: color ?? theme.palette.primary.dark,
		borderColor:
			variant === "contained"
				? color ?? theme.palette.background.default
				: color ?? theme.palette.primary.dark,
	}));

	return (
		<StyledBtn sx={sx} variant={variant} {...rest}>
			{children}
		</StyledBtn>
	);
}

export default Btn;
