import ReactIcons from "utils/ReactIcons";
import { Box, Typography, styled, useTheme } from "@mui/material";

const StyledHeader = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "max-content",
	display: "flex",
	gap: "0.5rem",
	padding: "0.5rem 1rem",
	alignItems: "center",
	justifyContent: "space-between",
	borderBottom: `1px solid ${theme.palette.grey[300]}`
}));

function CreateHeader() {
	const theme = useTheme();

	return (
		<StyledHeader>
			<ReactIcons.IoArrowBack style={{ fontSize: "1.7rem" }} />
			<Typography variant="h4">Crop</Typography>
			<Typography
				variant="body"
				sx={{
					cursor: "pointer",
					padding: "0 0.3rem",
					fontWeight: 600,
					"&:hover": { color: theme.palette.text.primary },
				}}
				color={theme.palette.primary.main}
			>
				Next
			</Typography>
		</StyledHeader>
	);
}

export default CreateHeader;
