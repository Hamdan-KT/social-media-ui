/* eslint-disable react-hooks/exhaustive-deps */
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import sampleAudio from "/audio/audio1.mp3";
import WaveSurfer from "wavesurfer.js";

const StyledStack = styled(Stack)(({ theme, chat, disabled = false }) => ({
  position: "relative",
  display: "flex",
  width: "100%",
  alignItems: "center",
  flexDirection: "row",
  paddingRight: "0.8rem",
  justifyContent: "space-between",
  borderRadius: chat.incoming ? "20px 20px 20px 0px" : "20px 20px 0px 20px",
  background: chat.incoming
    ? disabled
      ? "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(94,4,167,0.6951155462184874) 0%, rgba(241,0,203,1) 100%)"
      : theme.palette.grey[500]
    : disabled
    ? theme.palette.grey[500]
    : "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(94,4,167,0.6951155462184874) 0%, rgba(241,0,203,1) 100%)",
}));

const StyledDisableLayer = styled(Stack)(({ theme, chat }) => ({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  left: 0,
  top: 0,
  zIndex: 2,
  borderRadius: chat.incoming ? "20px 20px 20px 0px" : "20px 20px 0px 20px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  userSelect: "none",
}));

function AudioType({ chat, disabled = false }) {
  const theme = useTheme();
  const containerRef = useRef();
  const waveSurferRef = useRef({
    isPlaying: () => false,
  });
  const [isPlaying, toggleIsPlaying] = useState(false);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      barWidth: 2,
      barRadius: 1,
      barGap: 2,
      barMinHeight: 20,
      cursorWidth: 1,
      backend: "WebAudio",
      height: 50,
      progressColor: "#ffff",
      responsive: true,
      waveColor: "#C4C4C4",
      cursorColor: "transparent",
      minPxPerSec: 10,
      hideScrollbar: true,
      dragToSeek: true,
    });
    waveSurfer.load(sampleAudio);
    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
    });

    return () => {
      waveSurfer.destroy();
    };
  }, [sampleAudio]);

  return (
    <StyledStack chat={chat} disabled={disabled}>
      <IconButton
        size="large"
        onClick={() => {
          waveSurferRef.current.playPause();
          toggleIsPlaying(waveSurferRef.current.isPlaying());
        }}
        sx={{ color: theme.palette.background.paper }}
      >
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <Box
        sx={{
          width: "calc(100% / 1.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "4px",
          padding: "0.4rem 0rem",
        }}
        onClick={
          !disabled
            ? () => {
                waveSurferRef.current.getCurrentTime();
                console.log(waveSurferRef.current.getCurrentTime());
              }
            : null
        }
        ref={containerRef}
      />
      <Typography
        sx={{ mr: 2, ml: 1 }}
        variant="caption"
        color={theme.palette.background.paper}
      >
        35:00
      </Typography>
      {disabled && <StyledDisableLayer chat={chat} />}
    </StyledStack>
  );
}

export default AudioType;
