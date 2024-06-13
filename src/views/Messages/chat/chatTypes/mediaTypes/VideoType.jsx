import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme, chat }) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  borderRadius: "20px",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

function VideoType({ mediaItem, chat }) {
  return (
    <>
      <StyledBox chat={chat}>
        <video
          style={{
            display: "block",
            width: "100%",
            objectFit: "cover",
          }}
          src={mediaItem.src}
          draggable="false"
        />
      </StyledBox>
    </>
  );
}

export default VideoType;
