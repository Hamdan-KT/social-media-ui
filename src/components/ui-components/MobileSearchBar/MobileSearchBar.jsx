import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Paper } from "@mui/material";
import UserList from "components/ui-components/UserList";
import { Users } from "src/data";
import { useSelector } from "react-redux";
import { useState } from "react";
import _ from "lodash";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.palette.grey[200],
	"&:hover": {
		backgroundColor: theme.palette.grey[200],
	},
	width: "100%",
	marginBottom: "0.5rem",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
	},
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
	width: "100%",
	display: "flex",
	padding: "0.6rem 0rem",
	alignItems: "center",
	justifyContent: "center",
	background: theme.palette.background.default,
	height: "86vh",
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
		zIndex: 6,
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
	}
}));

function MobileSearchBar({ inputProps = {}, listWrapperStyle = {} }) {
	const [value, setValue] = useState("");

	return (
		<Search>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				fullWidth
				value={value}
				onChange={(e) => setValue(e.target.value)}
				type="search"
				placeholder="Search…"
				inputProps={{ "aria-label": "search" }}
				{...inputProps}
			/>

			{/* search open */}
			{!_.isEmpty(value) && (
				<Box
					sx={{
						display: "flex",
						width: "100%",
						height: "max-content",
						alignItems: "center",
						justifyContent: "center",
						position: "absolute",
						left: 0,
						top: "100%",
						zIndex: 6,
					}}
				>
					<StyledPaper elevation={0} sx={listWrapperStyle}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								height: "100%",
								alignItems: "flex-start",
								overflowY: "scroll",
								scrollBehavior: "smooth",
								width: "100%",
							}}
							className="scrollbar-hide"
						>
							<UserList
								sx={{ maxWidth: "100%" }}
								data={[...Users, ...Users]?.filter((user) => {
									return (
										user?.name.toLowerCase().indexOf(value.toLowerCase()) != -1
									);
								})}
							/>
						</Box>
					</StyledPaper>
				</Box>
			)}
		</Search>
	);
}

export default MobileSearchBar;
