/* eslint-disable react/display-name */
import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { useMediaQuery, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

// menu list for bottom bar
import { BottomBarMenuList } from "./MenuList";

function BottomBar() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const onChange = (event, value) => {
    if (value) {
      // updating state
      setValue(value);
      // navigating to specific path
      navigate(value);
    }
  };

  return (
		<>
			{matchDownSm && (
				<Paper
					sx={{ position: "fixed", zIndex: 1000, bottom: 0, left: 0, right: 0 }}
				>
					<BottomNavigation
						// showLabels
						value={value}
						onChange={onChange}
						sx={{ maxWidth: "100%"}}
					>
						{BottomBarMenuList?.map((menu, index) => {
							const FilledIcon = menu?.icon;
							const OutlinedIcon = menu?.outLinedIcon;
							return (
                <BottomNavigationAction
									value={menu?.url ?? null}
									key={index}
									icon={
										value === menu?.url ? (
											<FilledIcon
												style={{
													color: `${theme.palette.text.dark}`,
													fontSize: 25,
												}}
											/>
										) : (
											<OutlinedIcon
												style={{
													color: `${theme.palette.text.dark}`,
													fontSize: 25,
												}}
											/>
										)
									}
								/>
							);
						})}
					</BottomNavigation>
				</Paper>
			)}
		</>
	);
}

export default BottomBar;
