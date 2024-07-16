/* eslint-disable react/display-name */
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Box, Checkbox } from "@mui/material";
import verifiedBadge from "assets/images/verifiedBadge.png";
import ImgWrapper from "components/common/ImgWrapper";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Slide from "components/common/Carousel/Slide";
import Slider from "components/common/Carousel/Carousel";
import ReactIcons from "utils/ReactIcons";
import Comments from "components/ui-components/Popups/Comments";

// caption style
const captionStyle = {
	webkitLineClamp: "2",
	webkitBoxOrient: "vertical",
	overflow: "hidden",
	display: "-webkit-box",
};

function PostMobile({data}) {
	const [showExpand, setShowExpand] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const [openComments, setOpenComments] = useState(false);
	const captionRef = useRef(null);
	const customization = useSelector((state) => state.customization);
	const theme = useTheme();

	// check expand option of caption
	useEffect(() => {
		if (captionRef.current) {
			setShowExpand(
				captionRef.current.scrollHeight !== captionRef.current.clientHeight
			);
		}
	}, []);

	// handling expand
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card
			sx={{
				maxWidth: 470,
				width: "100%",
				borderRadius: `${customization?.borderRadius}px`,
			}}
		>
			<CardHeader
				sx={{
					p: 1,
					".MuiCardHeader-title": { fontSize: "13px", fontWeight: "bold" },
					".MuiCardHeader-subheader": {
						fontSize: "11px",
					},
				}}
				avatar={
					<Avatar
						src={data?.profile}
						aria-label="profile-picture"
						sx={{ width: 30, height: 30 }}
					/>
				}
				action={
					<IconButton aria-label="settings">
						<ReactIcons.MdMoreHoriz
							style={{ color: `${theme.palette.text.dark}` }}
						/>
					</IconButton>
				}
				title={
					<Box
						sx={{
							display: "flex",
							width: "100%",
							alignItems: "start",
							justifyContent: "start",
						}}
					>
						<Box
							sx={{
								width: "max-content",
								display: "flex",
								gap: "4px",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Typography variant="body">{data?.name}</Typography>
							<ImgWrapper sx={{ width: "0.8rem", height: "0.8rem" }}>
								<img
									src={verifiedBadge}
									style={{
										display: "block",
										width: "100%",
										objectFit: "cover",
									}}
								/>
							</ImgWrapper>
							{data?.time && (
								<>
									&#183;
									<Typography
										variant="p"
										sx={{
											color: theme.palette.grey[500],
											fontSize: "0.8rem",
											fontWeight: "normal",
										}}
									>
										{data?.time}
									</Typography>
								</>
							)}
						</Box>
					</Box>
				}
				subheader={data?.location ? data?.location : null}
			/>
			{/* images sections */}
			<CardMedia
				sx={{ padding: 0 }}
				alt="Not Found"
				component={() => (
					<Slider>
						{Array.isArray(data?.media) &&
							data?.media?.map((media, ind) => (
								<Slide key={ind} sx={{ background: "black", height: "100%" }}>
									{media?.type === "image" && (
										<img
											style={{
												display: "block",
												objectFit: "cover",
												width: "100%",
											}}
											alt="Not found!"
											key={ind}
											src={media?.src}
											loading="lazy"
											draggable={false}
										/>
									)}
									{media?.type === "video" && (
										<video
											controls
											key={ind}
											src={media?.src}
											alt="Not Found!"
											style={{
												display: "block",
												objectFit: "cover",
												width: "100%",
											}}
											loading="lazy"
											draggable={false}
										/>
									)}
								</Slide>
							))}
					</Slider>
				)}
			/>
			{/* card actions */}
			<CardActions disableSpacing sx={{ p: 0 }}>
				<Checkbox
					aria-label="like"
					icon={
						<ReactIcons.RiHeart3Line
							style={{ color: `${theme.palette.text.dark}`, fontSize: 25 }}
						/>
					}
					checkedIcon={
						<ReactIcons.RiHeart3Fill
							style={{ color: `${theme.palette.error.main}`, fontSize: 25 }}
						/>
					}
				/>
				<IconButton aria-label="comment" onClick={() => setOpenComments(true)}>
					<ReactIcons.RiChat1Line
						style={{ color: `${theme.palette.text.dark}`, fontSize: 25 }}
					/>
				</IconButton>
				<IconButton aria-label="share">
					<ReactIcons.LuSend
						style={{ color: `${theme.palette.text.dark}`, fontSize: 25 }}
					/>
				</IconButton>
				<Checkbox
					sx={{ ml: "auto" }}
					aria-label="save"
					icon={
						<ReactIcons.RiBookmarkLine
							style={{ color: `${theme.palette.text.dark}`, fontSize: 25 }}
						/>
					}
					checkedIcon={
						<ReactIcons.RiBookmarkFill
							style={{ color: `${theme.palette.text.dark}`, fontSize: 25 }}
						/>
					}
				/>
			</CardActions>
			{/* card content */}
			<CardContent
				sx={{
					p: 1,
					color: theme.palette.text.dark,
				}}
			>
				<Typography variant="body" fontWeight="bold">
					213,034 likes
				</Typography>
				<Box mt={1}>
					<p
						style={
							expanded
								? { fontSize: "0.80rem" }
								: { ...captionStyle, fontSize: "0.80rem" }
						}
						ref={captionRef}
					>
						<span
							style={{
								marginRight: "3px",
								fontWeight: 700,
								fontSize: "0.75rem",
							}}
						>
							{data?.name}
						</span>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s
						with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus
						PageMaker including versions of Lorem Ipsum
					</p>
				</Box>
				{showExpand &&
					(!expanded ? (
						<Typography
							variant="greyTags"
							sx={{ cursor: "pointer" }}
							onClick={handleExpandClick}
						>
							more
						</Typography>
					) : null)}
				<Box mt={1}>
					{/* view comment tag */}
					<Typography
						variant="greyTags" // onClick={handleExpandClick}
						sx={{ cursor: "pointer" }}
						onClick={() => setOpenComments(true)}
					>
						View all {data?.comments} comments
					</Typography>
				</Box>
			</CardContent>
			<Comments
				open={openComments}
				handleClose={() => setOpenComments(false)}
			/>
		</Card>
	);
}

export default PostMobile;
