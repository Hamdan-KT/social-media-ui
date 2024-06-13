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

function PhotoType({ mediaItem, chat }) {
  return (
    <>
      <StyledBox chat={chat}>
        <img
          style={{
            display: "block",
            width: "100%",
            objectFit: "cover",
          }}
          draggable="false"
          src={mediaItem.src}
        />
      </StyledBox>
    </>
  );
}

export default PhotoType;
