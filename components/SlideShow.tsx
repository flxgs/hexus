import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";

interface ImageInfo {
  src: string;
  soundSrc: string;
}

interface SlideProps {
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

const Slide: React.FC<SlideProps> = ({
  image,
  isPlaying,
  playSlideAudio,
  nextSlide,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [isPlaying, audioRef]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [audioRef]);

  const updateProgress = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const calculatedProgress = (currentTime / duration) * 100;
      setProgress(calculatedProgress);
    }
  };

  const handleAudioEnded = () => {
    // Move to the next slide after the sound of the current slide finishes
    nextSlide();
    setProgress(0); // Reset progress for the next slide
  };

  return (
    <div className="bg-red-500 rounded-3xl border-4 border-gray-900 overflow-hidden">
      {image ? (
        <>
          <div>
            <img
              src={image.src}
              alt={`Slide ${images.indexOf(image) + 1}`}
              className="w-full h-full object-cover"
            />
            <audio
              ref={(el) => (audioRef.current = el)}
              src={image.soundSrc}
              onEnded={handleAudioEnded}
            />
          </div>

          <div
            className="bg-blue-500 h-4"
            style={{ width: `${progress}%` }}
          ></div>
        </>
      ) : (
        <div>No image available</div>
      )}
    </div>
  );
};

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
