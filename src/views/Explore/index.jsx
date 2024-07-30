import {
	Grid,
	useMediaQuery,
	useTheme,
} from "@mui/material";

// user post
import MobileSearchBar from "components/ui-components/MobileSearchBar/MobileSearchBar";
import PhotoGallery from "components/ui-components/PhotoGallery";

function Explore() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Grid container>
			{matchDownSm && (
				<Grid item xs={12} md={12} sm={12} lg={12}>
					<MobileSearchBar />
				</Grid>
			)}
			<Grid item xs={12} md={12} sm={12} lg={12}>
				<PhotoGallery sx={{ padding: { md: "0 2rem", lg: "0 6rem" } }} />
			</Grid>
		</Grid>
	);
}

export default Explore;
