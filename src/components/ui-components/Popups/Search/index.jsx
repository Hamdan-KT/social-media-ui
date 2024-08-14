import { styled } from "@mui/material/styles";
import { Box, Divider, Paper } from "@mui/material";
import UserList from "components/ui-components/UserList";
import { Users } from "src/data";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Typography } from "@mui/material";
import _ from "lodash";
import SearchInput from "components/common/SearchInput";

const StyledPaper = styled(Paper)(({ theme }) => ({
	width: "100%",
	display: "flex",
	padding: "1rem 0.5rem",
	background: theme.palette.background.default,
	height: "86vh",
	[theme.breakpoints.up("xs")]: {
		height: "81vh",
	},
	position: "relative",
	"&::before": {
		content: `""`,
		position: "absolute",
		display: "flex",
		width: "100%",
		background: `linear-gradient(to top, rgba(255,0,0,0), ${theme.palette.background.paperLight}, ${theme.palette.background.default})`,
		padding: "1rem",
		top: 2,
		left: 0,
		zIndex: 7,
	},
	"&::after": {
		content: `""`,
		position: "absolute",
		display: "flex",
		width: "100%",
		background: `linear-gradient(to bottom, rgba(255,0,0,0), ${theme.palette.background.paperLight}, ${theme.palette.background.default})`,
		padding: "1rem",
		bottom: 2,
		left: 0,
	},
}));

function SearchPopUp() {
	const [value, setValue] = useState("");

	return (
		<Box sx={{ width: "100%" }}>
			<Typography variant="h2" p="0.5rem">
				Search
			</Typography>
			<SearchInput value={value} setValue={setValue} />
			<Divider sx={{ mt: 3 }} />
			<Box
				sx={{
					display: "flex",
					width: "100%",
					height: "max-content",
					alignItems: "center",
					justifyContent: "center",
					zIndex: 10,
				}}
			>
				<StyledPaper elevation={0}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							height: "100%",
							alignItems: "flex-start",
							overflowY: "scroll",
							width: "100%",
							scrollBehavior: "smooth",
						}}
						className="scrollbar-hide"
					>
						{!_.isEmpty(value) ? (
							<UserList
								sx={{ maxWidth: "100%" }}
								data={[...Users, ...Users, ...Users]?.filter((user) => {
									return (
										user?.name.toLowerCase().indexOf(value.toLowerCase()) != -1
									);
								})}
							/>
						) : (
							<Typography mt={3} variant="h5">
								No recent searches!
							</Typography>
						)}
					</Box>
				</StyledPaper>
			</Box>
		</Box>
	);
}

export default SearchPopUp;
