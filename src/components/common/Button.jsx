import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

function Btn({ children, sx, variant = "contained", color, ...rest }) {

	const StyledBtn = styled(Button)(({ theme }) => ({
		display: "flex",
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
		<StyledBtn
			sx={{
				padding: {
					xs: "0.35rem 1.7rem",
					sm: "0.35rem 0.4rem",
				},
				...sx
			}}
			variant={variant}
			{...rest}
		>
			{children}
		</StyledBtn>
	);
}

export default Btn;
