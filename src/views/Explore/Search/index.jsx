import UserList from "components/ui-components/UserList";
import { Users } from "src/data";
import { Box, Typography, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SearchInput from "components/common/SearchInput";
import ScrollBox from "components/ui-components/Wrappers/scrollBox";
import { useNavigate } from "react-router";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
}));

function ExploreSearch() {
	const [value, setValue] = useState("");
	const navigate = useNavigate();
	const inputRef = useRef();

	// focus input on load
	useEffect(() => {
		if(inputRef.current) inputRef.current?.focus();
	}, []);

	return (
		<Box sx={{ width: "100%" }}>
			<CommonBox
				sx={{
					justifyContent: "space-between",
					gap: "0.1rem",
				}}
			>
				<SearchInput value={value} setValue={setValue} ref={inputRef} />
				<Typography
					onClick={() => navigate(-1)}
					variant="body"
					sx={{ p: 0.5, userSelect: "none" }}
				>
					cancel
				</Typography>
			</CommonBox>
			<ScrollBox sx={{ mt: 0.5 }}>
				<UserList
					data={[...Users, ...Users, ...Users]}
					sx={{ maxWidth: "100%" }}
				/>
			</ScrollBox>
		</Box>
	);
}

export default ExploreSearch;
