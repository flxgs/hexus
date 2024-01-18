import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";

interface VideoInfo {
  src: string;
  soundSrc: string;
}

const videos: VideoInfo[] = [
  { src: "video-1.mp4", soundSrc: "sound1.mp3" },
  { src: "video-2.mp4", soundSrc: "sound2.mp3" },
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlaying && videoRef.current && audioRef.current) {
      videoRef.current.play();
      audioRef.current.play();
    }
  }, [currentSlide]);

  const playVideo = () => {
    if (videoRef.current && audioRef.current) {
      videoRef.current.play();
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopVideo = () => {
    if (videoRef.current && audioRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const nextSlide = () => {
    stopVideo();
    setCurrentSlide((prevSlide) => (prevSlide + 1) % videos.length);
  };

  const handleVideoEnded = () => {
    // Automatically switch to the next slide when the video ends
    nextSlide();
  };

  return (
    <div>
      <video
        ref={videoRef}
        src={videos[currentSlide].src}
        muted={!isPlaying}
        onEnded={handleVideoEnded}
      />
      <audio
        ref={audioRef}
        src={videos[currentSlide].soundSrc}
        muted={!isPlaying}
      />
      <div className="">
        <Tooltip content={isPlaying ? "Stop" : "Play"} side="top">
          <Button onClick={isPlaying ? stopVideo : playVideo}>
            {isPlaying ? "Stop" : "Play"}
          </Button>
        </Tooltip>
        <Tooltip content="Next Slide" side="top">
          <Button onClick={nextSlide}>Next Slide</Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Slideshow;
