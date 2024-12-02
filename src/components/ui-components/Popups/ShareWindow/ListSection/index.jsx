import ReactIcons from "utils/ReactIcons";
import {
	Box,
	Grid,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ShareBottomBar from "../bottomBar";
import { Users, userStories } from "src/data";
import ShareHeader from "../header";
import ProfileAvatar from "components/common/ProfileAvatar";
import SearchInput from "components/common/SearchInput";
import _ from "lodash";
import ScrollBox from "components/ui-components/Wrappers/ScrollBox";
import SelectionList from "src/components/ui-components/SelectionList";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUsers } from "app/slices/shareSlice/shareSlice";
import { getUsers } from "src/api/userAPI";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import DefaultLoader from "src/components/common/DefaultLoader";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
}));

const StyledTickIcon = styled(Box)(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
	borderRadius: "50%",
	padding: "0.1rem",
	background: theme.palette.background.paper,
}));

function ListSection({ onClose = () => {} }) {
	const [value, setValue] = useState("");
	const theme = useTheme();
	const { ref, inView } = useInView();
	const { ref: shareListRef, inView: shareListInView } = useInView();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const selectedUsers = useSelector((state) => state.share.selectedUsers);
	const dispatch = useDispatch();

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isSuccess,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ["get-sharing-users"],
		queryFn: ({ pageParam = 1 }) => getUsers({}, pageParam, 10),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = lastPage?.data?.length
				? allPages?.length + 1
				: undefined;
			return nextPage;
		},
	});

	useEffect(() => {
		if (inView && hasNextPage && !isFetching) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage, isFetching]);

	useEffect(() => {
		console.log({ users: data });
	}, [isSuccess, data]);

	const {
		fetchNextPage: shareListfetchNextPage,
		hasNextPage: shareListhasNextPage,
		isFetchingNextPage: shareListisFetchingNextPage,
		isSuccess: shareListisSuccess,
		isFetching: shareListisFetching,
		data: shareListdata,
	} = useInfiniteQuery({
		queryKey: ["get-all-users-users"],
		queryFn: ({ pageParam = 1 }) => getUsers({}, pageParam, 10),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = lastPage?.data?.length
				? allPages?.length + 1
				: undefined;
			return nextPage;
		},
	});

	useEffect(() => {
		if (shareListInView && shareListhasNextPage && !shareListisFetching) {
			shareListfetchNextPage();
		}
	}, [
		shareListInView,
		shareListhasNextPage,
		shareListfetchNextPage,
		shareListisFetching,
	]);

	useEffect(() => {
		console.log({ shareusers: shareListdata });
	}, [shareListisSuccess, shareListdata]);

	const handleSelection = (data) => {
		if (!_.isEmpty(data)) {
			let checked = !selectedUsers[data["_id"]];
			if (checked) {
				dispatch(
					setSelectedUsers({
						...selectedUsers,
						[data["_id"]]: checked,
					})
				);
			} else {
				let updatedSelection = { ...selectedUsers };
				delete updatedSelection[data["_id"]];
				dispatch(setSelectedUsers({ ...updatedSelection }));
			}
		}
	};

	return (
		<>
			<ShareHeader onClose={onClose} />
			<CommonBox sx={{ p: 1.5 }}>
				<SearchInput value={value} setValue={setValue} />
			</CommonBox>
			<CommonBox
				className="scrollbar-hide"
				sx={{
					height: matchDownSm ? "calc(100% - 10.8rem)" : "calc(100% - 13.2rem)",
					overflowY: "scroll",
					alignItems: "start",
					justifyContent: "start",
					p: 0.5,
				}}
			>
				<Grid container>
					{_.isEmpty(value) ? (
						<React.Fragment>
							{shareListdata?.pages?.map((page, pageIndex, pageArr) => (
								<React.Fragment key={pageIndex}>
									{page?.data?.map((user, userIndex, userArr) => (
										<Grid
											item
											xs={4}
											sm={3}
											key={userIndex}
											ref={
												pageIndex === pageArr.length - 1 &&
												userIndex === userArr.length - 1
													? shareListRef
													: undefined
											}
										>
											<CommonBox
												sx={{
													p: 0.5,
													display: "flex",
													height: "max-content",
													flexDirection: "column",
													alignItems: "center",
													justifyContent: "center",
													textAlign: "center",
													width: "100%",
												}}
											>
												<ProfileAvatar
													profile={user?.avatar}
													userName={user?.userName}
													storyView={false}
													sx={{
														width: { xs: 73, sm: 75 },
														height: { xs: 73, sm: 75 },
														border: "none",
														cursor: "pointer",
													}}
													badge={selectedUsers[user?._id]}
													badgeProps={{
														badgeContent: (
															<StyledTickIcon>
																<ReactIcons.FaCheckCircle
																	size={18}
																	style={{ color: theme.palette.primary.main }}
																/>
															</StyledTickIcon>
														),
													}}
													onClick={() => handleSelection(user)}
												/>
												<Typography
													noWrap
													variant="p"
													sx={{
														fontSize: { xs: "11px" },
														userSelect: "none",
														width: "5rem",
													}}
												>
													{user.userName}
												</Typography>
											</CommonBox>
										</Grid>
									))}
								</React.Fragment>
							))}
							{shareListisFetchingNextPage && (
								<Box
									sx={{
										width: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<DefaultLoader />
								</Box>
							)}
						</React.Fragment>
					) : (
						<ScrollBox sx={{ mt: 0, height: "auto", flexDirection: "column" }}>
							<SelectionList
								ref={ref}
								data={data}
								sx={{ maxWidth: "100%" }}
								selection={selectedUsers}
								setSelection={setSelectedUsers}
								onClick={handleSelection}
								onChange={handleSelection}
								dataTag="_id"
							/>
							{isFetchingNextPage && (
								<Box
									sx={{
										width: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<DefaultLoader />
								</Box>
							)}
						</ScrollBox>
					)}
				</Grid>
			</CommonBox>
			<ShareBottomBar selectedPeoples={!_.isEmpty(selectedUsers)} />
		</>
	);
}

export default ListSection;
