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
import SelectionList from "components/ui-components/SelectionList";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUsers } from "app/slices/shareSlice/shareSlice";

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
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const selectedUsers = useSelector((state) => state.share.selectedUsers);
	const dispatch = useDispatch();

	const handleSelection = (data) => {
		if (!_.isEmpty(data)) {
			let checked = !selectedUsers[data["id"]];
			if (checked) {
				dispatch(
					setSelectedUsers({
						...selectedUsers,
						[data["id"]]: checked,
					})
				);
			} else {
				let updatedSelection = { ...selectedUsers };
				delete updatedSelection[data["id"]];
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
						<>
							{[...Users, ...Users]?.map((user, ind) => (
								<Grid item xs={4} sm={3} key={ind}>
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
											data={user}
											storyView={false}
											sx={{
												width: { xs: 73, sm: 75 },
												height: { xs: 73, sm: 75 },
												border: "none",
												cursor: "pointer",
											}}
											badge={selectedUsers[user?.id]}
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
											{user.name}
										</Typography>
									</CommonBox>
								</Grid>
							))}
						</>
					) : (
						<ScrollBox sx={{ mt: 0, height: "auto" }}>
							<SelectionList
								data={[...Users, ...Users, ...Users]}
								sx={{ maxWidth: "100%" }}
								selection={selectedUsers}
								setSelection={setSelectedUsers}
								onClick={handleSelection}
								dataTag="id"
							/>
						</ScrollBox>
					)}
				</Grid>
			</CommonBox>
			<ShareBottomBar selectedPeoples={!_.isEmpty(selectedUsers)} />
		</>
	);
}

export default ListSection;
