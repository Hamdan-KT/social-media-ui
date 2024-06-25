import UserList from "components/ui-components/UserList";
import BottomSheet from "components/common/BottomSheet";
import React from "react";
import MobileSearchBar from "components/ui-components/MobileSearchBar/MobileSearchBar";
import { Grid, useMediaQuery, useTheme } from "@mui/material";

function SearchTagPeoples({ open = false, handleClose }) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<BottomSheet title="Search Peoples" open={open} onClose={handleClose}>
			<Grid container>
				{matchDownSm && (
					<Grid item xs={12}>
						<MobileSearchBar />
					</Grid>
				)}
			</Grid>
		</BottomSheet>
	);
}

export default SearchTagPeoples;
