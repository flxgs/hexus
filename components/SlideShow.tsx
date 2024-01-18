import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";
import { Slide } from "./Slide";

export interface ImageInfo {
  src: string;
  soundSrc: string;
}

export interface SlideProps {
  image: ImageInfo;
  isPlaying: boolean;
  playSlideAudio: () => void;
  nextSlide: () => void;
}

const images: ImageInfo[] = [
  { src: "/image1.png", soundSrc: "/notion.mp3" },
  { src: "/image3.png", soundSrc: "/cron.mp3" },
  { src: "/image2.png", soundSrc: "/linear.mp3" },
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1) % images.length);
  };

  const playSlideshow = () => {
    setIsPlaying(true);
  };

  const stopSlideshow = () => {
    setIsPlaying(false);
  };

  const playCurrentSlideAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const currentImage = images[currentSlide];

  return (
    <div className="flex flex-col items-center gap-4 p-16 h-screen">
      <Slide
        image={currentImage}
        isPlaying={isPlaying}
        playSlideAudio={playCurrentSlideAudio}
        nextSlide={nextSlide}
      />

      <div className="flex flex-row gap-4">
        <Button onClick={prevSlide}>Previous Slide</Button>

        <Button onClick={isPlaying ? stopSlideshow : playSlideshow}>
          {isPlaying ? "Stop" : "Play"}
        </Button>

        <Button onClick={nextSlide}>Next Slide</Button>
      </div>
      <div className="text-gray-600 text-sm">
        Slide {currentSlide + 1}/{images.length}
      </div>
    </div>
  );
};

export default Slideshow;
