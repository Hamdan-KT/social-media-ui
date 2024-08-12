import ReactIcons from "utils/ReactIcons";
import {
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React from "react";

const StyledHeader = styled("div")(({ theme }) => ({
	width: "100%",
	height: "max-content",
	display: "flex",
	gap: "0.5rem",
	padding: "0.5rem 1rem",
	alignItems: "center",
	justifyContent: "space-between",
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));

function ShareHeader() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<>
			{!matchDownSm && (
				<StyledHeader>
					<Typography
						variant="h4"
						sx={{ userSelect: "none", textAlign: "center", width: "100%" }}
					>
						Share
					</Typography>
					<ReactIcons.IoClose
						style={{ fontSize: "1.7rem", cursor: "pointer" }}
						onClick={{}}
					/>
				</StyledHeader>
			)}
		</>
	);
}

export default ShareHeader;
