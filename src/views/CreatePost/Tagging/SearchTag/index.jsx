import UserList from "components/ui-components/UserList";
import BottomSheet from "components/common/BottomSheet";
import React, { forwardRef, useState } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import SearchInput from "components/common/SearchInput";
import ScrollBox from "components/ui-components/Wrappers/ScrollBox";
import { Users } from "src/data";

const SearchTagPeoples = forwardRef(function ({ open, onClose }, ref) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const [value, setValue] = useState("");

	return (
		<BottomSheet
			title="Search Peoples"
			open={open}
			onClose={onClose}
			sheetBodyStyles={{ position: "relative" }}
		>
			<Box
				sx={{
					width: "100%",
					position: "sticky",
					left: 0,
					top: 0,
					p: 0.5,
					zIndex: 7,
					background: theme.palette.background.paper,
				}}
			>
				<SearchInput value={value} setValue={setValue} />
			</Box>
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
						<Grid item xs={12} position="relative">
							<ScrollBox sx={{ mt: 0, height: "auto" }}>
								<UserList
									data={[...Users, ...Users, ...Users]}
									sx={{ maxWidth: "100%" }}
								/>
							</ScrollBox>
						</Grid>
					)}
				</Box>
			</Grid>
		</BottomSheet>
	);
});

export default SearchTagPeoples;
