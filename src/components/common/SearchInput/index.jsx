import ReactIcons from "utils/ReactIcons";
import { InputBase, styled } from "@mui/material";
import React, { forwardRef } from "react";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: "10px",
	backgroundColor: theme.palette.grey[200],
	"&:hover": {
		backgroundColor: theme.palette.grey[200],
	},
	width: "100%",
	zIndex: 5,
	display: "flex",
	alignItems: "center",
	justifyContent: "start"
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
		padding: theme.spacing(1),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
	},
}));

const SearchInput = forwardRef(
	({ value = "", setValue = () => {}, ...others }, ref) => {
		return (
			<Search>
				<SearchIconWrapper>
					<ReactIcons.IoSearchSharp size={20} />
				</SearchIconWrapper>
				<StyledInputBase
					fullWidth
					value={value}
					onChange={(e) => setValue(e.target.value)}
					type="search"
					placeholder="Search…"
					inputProps={{ "aria-label": "search" }}
					{...others}
					ref={ref}
				/>
			</Search>
		);
	}
);

export default SearchInput;
