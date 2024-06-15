import ReactIcons from "utils/ReactIcons";
import { Box, Typography, styled, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postStages as ps } from "utils/constants";
import { setPostStages } from "app/slices/postSlice/postSlice";

const StyledHeader = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "max-content",
	display: "flex",
	gap: "0.5rem",
	padding: "0.5rem 1rem",
	alignItems: "center",
	justifyContent: "space-between",
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));

function CreateHeader() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const postStages = useSelector((state) => state.post.postStages);
	const statgeArr = [...Object.keys(postStages).map((key) => postStages[key])];
	console.log({ statgeArr });

	const handleStageChange = (type = "next") => {
		if (type === "next") {
			if (postStages[ps.CROP]) {
				dispatch(setPostStages({ type: ps.EDIT, value: true }));
			} else if (postStages[ps.EDIT]) {
				dispatch(setPostStages({ type: ps.SHARE, value: true }));
			} else return;
		} else {
			if (postStages[ps.SHARE]) {
				dispatch(setPostStages({ type: ps.EDIT, value: true }));
			} else if (postStages[ps.EDIT]) {
				dispatch(setPostStages({ type: ps.CROP, value: true }));
			} else return;
		}
	};

	return (
		<StyledHeader>
			<ReactIcons.IoArrowBack
				style={{ fontSize: "1.7rem", cursor: "pointer" }}
				onClick={() => handleStageChange("prev")}
			/>
			<Typography variant="h4">
				{postStages[ps.CROP]
					? "Crop"
					: postStages[ps.EDIT]
					? "Edit"
					: postStages[ps.SHARE]
					? "Share"
					: ""}
			</Typography>
			<Typography
				variant="body"
				sx={{
					cursor: "pointer",
					padding: "0 0.3rem",
					fontWeight: 600,
					"&:hover": { color: theme.palette.text.primary },
				}}
				color={theme.palette.primary.main}
				onClick={() => handleStageChange("next")}
			>
				{postStages[ps.SHARE] ? "Share" : "Next"}
			</Typography>
		</StyledHeader>
	);
}

export default CreateHeader;
