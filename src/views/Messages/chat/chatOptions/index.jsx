import ReactIcons from "utils/ReactIcons";
import { Box, Typography, styled, useTheme } from "@mui/material";
import React from "react";

const StyledPopoverBox = styled(Box)(({ theme }) => ({
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexDirection: "row",
	padding: "0.5rem 0.7rem",
	borderRadius: "7px",
	cursor: "pointer",
	gap: "0.5rem",
	"&:hover": {
		background: theme.palette.grey[200],
	},
}));

function ChatOptions() {
  const theme = useTheme()
	return (
		<StyledPopoverBox sx={{ width: "180px" }}>
			<Typography
				variant="greyTags"
				sx={{
					width: "100%",
					padding: "0.6rem 1rem",
					borderBottom: `1px solid ${theme.palette.grey[300]}`,
				}}
			>
				1 Aug 2024, 12:06
			</Typography>
			<StyledPopoverBox sx={{ padding: "0.5rem" }}>
				<StyledTypography>
					Forward
					<ReactIcons.LuSend size={17}/>
				</StyledTypography>
				<StyledTypography>
					Copy
					<ReactIcons.FaRegCopy size={17}/>
				</StyledTypography>
				{/* red tags */}
				<StyledTypography sx={{ color: theme.palette.error.main }}>
					Unsend
					<ReactIcons.LuTrash size={17}/>
				</StyledTypography>
			</StyledPopoverBox>
		</StyledPopoverBox>
	);
}

export default ChatOptions;
