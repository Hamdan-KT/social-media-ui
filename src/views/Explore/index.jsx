import { RoutePath } from "utils/routes";
import {
	Grid,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import PhotoGallery from "components/ui-components/PhotoGallery";
import { useNavigate } from "react-router";
import SearchInput from "components/common/SearchInput";

function Explore() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();

	return (
		<Grid container>
			{matchDownSm && (
				<Grid item xs={12} md={12} sm={12} lg={12}>
					<SearchInput
						onClick={() => navigate(`/${RoutePath.EXPLORE_SEARCH}`)}
					/>
				</Grid>
			)}
			<Grid item xs={12} md={12} sm={12} lg={12} mt={1}>
				<PhotoGallery sx={{ padding: { md: "0 2rem", lg: "0 6rem" } }} />
			</Grid>
		</Grid>
	);
}

export default Explore;
