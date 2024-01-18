import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";

interface ImageInfo {
  src: string;
  soundSrc: string; // Add sound source for each image
}

const images: ImageInfo[] = [
  { src: "/image1.png", soundSrc: "/notion.mp3" },
  { src: "/image3.png", soundSrc: "/cron.mp3" },
  { src: "/image2.png", soundSrc: "/linear.mp3" },

  // Add more image objects as needed
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const playSlideshow = () => {
    setIsPlaying(true);
  };

  const stopSlideshow = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        nextSlide();
      }, 15000); // Automatically switch to the next slide after 15 seconds

      return () => {
        clearInterval(timer);
      };
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      // Play the audio of the current slide when isPlaying is true
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [currentSlide, isPlaying]);

  const handleAudioEnded = () => {
    // Move to the next slide after the sound of the current slide finishes
    nextSlide();
  };

  const currentImage = images[currentSlide];

  return (
    <div className="flex flex-col items-center gap-4 p-16 h-screen">
      <div className="bg-red-500 rounded-3xl border-4 border-gray-900 overflow-hidden">
        {currentImage ? (
          <>
            <img
              src={currentImage.src}
              alt={`Slide ${currentSlide}`}
              className="w-full h-full object-cover"
            />
            <audio
              ref={audioRef}
              src={currentImage.soundSrc}
              onEnded={handleAudioEnded}
            />
          </>
        ) : (
          <div>No image available</div>
        )}
      </div>
      <div className="flex flex-row gap-4">
        <Button onClick={isPlaying ? stopSlideshow : playSlideshow}>
          {isPlaying ? "Stop" : "Play"}
        </Button>

        <Button onClick={nextSlide}>Next Slide</Button>
      </div>
    </div>
  );
};

export default Slideshow;
