import { useTheme } from "@mui/material/styles";
import { Box, Grid, styled, useMediaQuery } from "@mui/material";
import { defaultSpacing } from "utils/constants";
import StorySlider from "components/ui-components/StorySlider";
import Suggessions from "components/ui-components/ProfileAndSuggession";
import Post from "components/ui-components/Post";

// dummy data
import { userPosts } from "../../data";
import MobileHeader from "layouts/MainLayout/Header";
import { memo, useState } from "react";

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
const MemoizedPost = memo(Post);

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
					{[
						...userPosts,
						...userPosts,
						...userPosts,
						...userPosts,
						...userPosts,
					]?.map((data) => (
						<MemoizedPost key={data?.id} data={data} />
					))}
				</StyledBox>
			</Grid>
			{!matchDownMd && (
				<Grid item md={3.5} lg={3.5} xs={0} sm={0}>
					{/* suggession adn profile section */}
					<Suggessions />
				</Grid>
			)}
		</Grid>
	);
}

export default Home;
