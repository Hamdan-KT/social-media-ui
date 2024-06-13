import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import sampleAudio from "/public/audio/audio1.mp3";

const Waveform = ({ audio }) => {
  const containerRef = useRef();
  const waveSurferRef = useRef({
    isPlaying: () => false,
  });
  const [isPlaying, toggleIsPlaying] = useState(false);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      fillParent: false,
      cursorWidth: 0,
      barWidth: 2,
      barHeight: 10,
      minPxPerSec: 10,
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
    <>
      <button
        onClick={() => {
          waveSurferRef.current.playPause();
          toggleIsPlaying(waveSurferRef.current.isPlaying());
        }}
        type="button"
      >
        {isPlaying ? "pause" : "play"}
      </button>
      <div ref={containerRef} />
    </>
  );
};

export default Waveform;
