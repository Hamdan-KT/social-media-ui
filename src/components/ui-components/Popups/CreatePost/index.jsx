import { Box, DialogContent, styled, useTheme } from "@mui/material";
import CustomModal from "components/common/Modal";
import PostView from "./PostView";
import CreateHeader from "./Header";
import PostSelect from "./PostSelect";
import { useDispatch, useSelector } from "react-redux";
import FilterAdjustment from "./FilterAdjustment";
import PostSettings from "./PostSettings";
import { postStages as ps } from "utils/constants";

const MainBox = styled(Box)(({ theme }) => ({
	width: "max-content",
	height: "max-content",
	display: "flex",
	background: theme.palette.background.paper,
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
	borderRadius: "20px",
	overflow: "hidden",
}));

const ContentBox = styled(Box)(({ theme }) => ({
	width: "max-content",
	height: "max-content",
	display: "flex",
	background: theme.palette.background.paper,
	overflow: "hidden",
}));

function CreatePost({ open = false, onClose }) {
	const theme = useTheme();
	const postMedias = useSelector((state) => state.post.postMedias);
	const postStages = useSelector((state) => state.post.postStages);

	return (
		<CustomModal
			sx={{ background: "rgba(0, 0, 0, 0.3)" }}
			closeIcon={true}
			open={open}
			onClose={onClose}
		>
			<MainBox>
				<CreateHeader />
				<ContentBox>
					{postMedias?.length !== 0 ? <PostView /> : <PostSelect />}
					<FilterAdjustment />
					<PostSettings />
				</ContentBox>
			</MainBox>
		</CustomModal>
	);
}

export default CreatePost;
