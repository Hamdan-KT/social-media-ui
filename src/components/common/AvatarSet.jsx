import { Avatar, AvatarGroup } from "@mui/material";
import React from "react";

function AvatarSet({ max = 3, size = 30 }) {
  return (
    <AvatarGroup max={max} sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "max-content"}}>
      <Avatar
        sx={{
          width: size,
          height: size,
        }}
        alt="Remy Sharp"
        src="https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <Avatar
        sx={{
          width: size,
          height: size,
        }}
        alt="Travis Howard"
        src="https://images.pexels.com/photos/6962108/pexels-photo-6962108.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <Avatar
        sx={{
          width: size,
          height: size,
        }}
        alt="Cindy Baker"
        src="https://images.pexels.com/photos/4691226/pexels-photo-4691226.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
    </AvatarGroup>
  );
}

export default AvatarSet;
