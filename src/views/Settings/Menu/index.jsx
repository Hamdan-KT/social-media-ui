/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { menuList } from "./MenuList";
import { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import _ from "lodash";
import { memo } from "react";
import ReactIcons from "utils/ReactIcons";
import DefaultLoader from "components/common/DefaultLoader";

// styled drawer header
const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
	"&:hover": {
		backgroundColor: theme.palette.grey[200],
	},
	"&.Mui-selected": {
		backgroundColor: theme.palette.grey[200],
		"&:hover": {
			backgroundColor: theme.palette.grey[200],
		},
	},
	borderRadius: "10px",
	minHeight: 48,
}));

const SettingsMenu = memo(function () {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const { pathname } = useLocation();

	return (
		<Box sx={{ position: "relative", mt: { xs: 5, sm: 0 } }}>
			<List>
				{menuList.map((item, index) => {
					let listItemProps = {};
					if (item?.url) {
						let itemTarget = "_self";
						if (item.target) {
							itemTarget = "_blank";
						}
						listItemProps = {
							component: forwardRef((props, ref) => (
								<Link ref={ref} {...props} to={item.url} target={itemTarget} />
							)),
						};
						if (item?.external) {
							listItemProps = {
								component: "a",
								href: item.url,
								target: itemTarget,
							};
						}
					}
					const OutlinedIcon = item?.outLinedIcon;
					return (
						<>
							<ListItem
								key={item?.id}
								disablePadding
								sx={{ display: "block" }}
								secondaryAction={
									matchDownSm && <ReactIcons.IoChevronForward size={21} />
								}
							>
								<StyledListItemButton
									{...listItemProps}
									sx={{
										justifyContent: "center",
										px: 2.5,
										ml: 1.2,
										mr: 1.2,
										mt: 1,
										mb: 1,
									}}
									selected={pathname.split("/")[1] === item?.id}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: 1.5,
											justifyContent: "center",
										}}
									>
										<OutlinedIcon
											style={{
												fontSize: 27,
												color: `${theme.palette.text.dark}`,
											}}
										/>
									</ListItemIcon>
									<ListItemText
										primary={item?.title}
										primaryTypographyProps={{
											fontFamily: "poppins",
											fontWeight:
												pathname.split("/")[1] === item?.id ? "bold" : "medium",
											fontSize: "0.82rem",
										}}
									/>
								</StyledListItemButton>
							</ListItem>
						</>
					);
				})}
				<ListItem
					disablePadding
					sx={{ display: "block" }}
					secondaryAction={
						<DefaultLoader size={23} />
					}
				>
					<StyledListItemButton
						sx={{
							justifyContent: "center",
							px: 2.5,
							ml: 1.2,
							mr: 1.2,
							mt: 1,
							mb: 1,
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: 1.5,
								justifyContent: "center",
							}}
						>
							<ReactIcons.IoMdLogOut
								style={{
									fontSize: 27,
									color: `${theme.palette.error.main}`,
								}}
							/>
						</ListItemIcon>
						<ListItemText
							primary="Log Out"
							primaryTypographyProps={{
								sx: { color: `${theme.palette.error.main}` },
								fontFamily: "poppins",
								fontWeight: "medium",
								fontSize: "0.82rem",
							}}
						/>
					</StyledListItemButton>
				</ListItem>
			</List>
		</Box>
	);
});

export default SettingsMenu;
