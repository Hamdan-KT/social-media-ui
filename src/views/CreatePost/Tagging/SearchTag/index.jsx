import UserList from "components/ui-components/UserList";
import BottomSheet from "components/common/BottomSheet";
import React, { forwardRef } from "react";
import MobileSearchBar from "components/ui-components/MobileSearchBar/MobileSearchBar";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";

const SearchTagPeoples = forwardRef(function ({ open, onClose }, ref) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<BottomSheet title="Search Peoples" open={open} onClose={onClose}>
			<Grid container>
				<Box
					sx={{
						display: "flex",
						padding: "0.3rem",
						width: "100%",
						height: "auto",
					}}
				>
					{matchDownSm && (
						<Grid item xs={12}>
							<MobileSearchBar />
						</Grid>
					)}
				</Box>
			</Grid>
		</BottomSheet>
	);
});

export default SearchTagPeoples;
