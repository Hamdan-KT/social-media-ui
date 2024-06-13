import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

function Btn({ children, sx, variant = "contained", color, ...rest }) {
	const theme = useTheme();

	const StyledBtn = styled(Button)(({ theme }) => ({
		display: "flex",
		padding: "0.2rem 0.4rem",
		fontSize: "0.75rem",
		borderRadius: "8px",
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
