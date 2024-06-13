/* eslint-disable react/display-name */
import { Box, styled } from "@mui/material";
import React, { useState } from "react";
import { forwardRef } from "react";

// chat type components
import MediaChat from "./chatTypes/MediaChat";
import TextChat from "./chatTypes/TextChat";
import ReplyChat from "./chatTypes/ReplyChat";
import TimeLine from "./chatTypes/TimeLine";

const StyledBox = styled(Box)(({ theme, chat }) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  // backgroundColor: "antiquewhite",
  justifyContent: chat.incoming ? "flex-start" : "flex-end",
  minHeight: "30px",
  marginBottom: 6,
  "&:last-child": {
    marginBottom: 0,
  },
}));

const Chat = forwardRef(({ data = [] }, ref) => {
  return (
    <>
      {data?.map((item, index) => (
        <StyledBox key={index} ref={ref} chat={item}>
          {(() => {
            switch (item?.type) {
              case "media":
                return <MediaChat chat={item} />;
              case "text":
                return <TextChat chat={item} />;
              case "reply":
                return <ReplyChat chat={item} />;
              case "time":
                return <TimeLine chat={item} />;
            }
          })()}
        </StyledBox>
      ))}
    </>
  );
});

export default Chat;
