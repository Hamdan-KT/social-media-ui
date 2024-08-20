import { useTheme } from "@mui/material/styles";
import { Box, Divider, Grid, styled, useMediaQuery } from "@mui/material";
import { defaultSpacing } from "utils/constants";
import StorySlider from "components/ui-components/StorySlider";
import Suggessions from "components/ui-components/ProfileAndSuggession";
import PostMobile from "components/ui-components/Post/mobile";

// dummy data
import { userPosts } from "../../data";
import MobileHeader from "layouts/MainLayout/Header";
import { memo, useEffect } from "react";
import DefaultLoader from "components/common/DefaultLoader";

const StyledBox = styled(Box)(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	background: theme.palette.background.default,
	gap: "1rem",
}));

// memorize post component
const MemoizedPost = memo(PostMobile);

function Home() {
	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Grid container spacing={defaultSpacing}>
			<Grid item md={8.5} sm={12} lg={8.5} xs={12}>
				<StyledBox>
					{/* mobile header in xs devices */}
					<MobileHeader />
					{/* story Slider */}
					<StorySlider />
					{/* post rendering */}
					{userPosts?.map((data, index, arr) => (
						<MemoizedPost
							key={data?.id}
							data={data}
							divider={Boolean(index !== arr.length - 1)}
						/>
					))}
				</StyledBox>
			</Grid>
			{/* suggession adn profile section */}
			{!matchDownMd && (
				<Grid item md={3.5} lg={3.5} xs={0} sm={0}>
					<Suggessions />
				</Grid>
			)}
		</Grid>
	);
}

export default Home;
