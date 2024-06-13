/* eslint-disable react/display-name */
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function MessageList({
  data,
  urlPrefix,
  navigateId,
  actionButton = false,
  onClick,
  primaryText,
  secondaryText,
  customButton,
  sx = {},
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <List
      dense
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: theme.palette.background.default,
        gap: "0.5rem",
        ...sx,
      }}
    >
      {data?.map((user, index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return (
          <ListItem
            key={index}
            secondaryAction={actionButton ? customButton : null}
            disablePadding
          >
            <ListItemButton
              onClick={() => {
                typeof onClick === "function" && onClick();
                if (urlPrefix && navigateId) {
                  navigate(`${urlPrefix}/${user[navigateId]}`);
                }
              }}
            >
              <ListItemAvatar>
                <Avatar alt={`not found`} src={user?.profile} />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: "bold",
                }}
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: 12,
                  mr: 5,
                }}
                id={labelId}
                primary={user[primaryText] ?? user?.name}
                secondary={
                  user[secondaryText] ??
                  "followed by you and 40+ more.. followed by you and 40+ more.."
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default MessageList;
