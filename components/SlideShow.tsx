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

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [isPlaying, audioRef]);

  const handleAudioEnded = () => {
    // Move to the next slide after the sound of the current slide finishes
    nextSlide();
  };

  return (
    <div className="bg-red-500 rounded-3xl border-4 border-gray-900 overflow-hidden">
      {image ? (
        <>
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

  const playSlideshow = () => {
    setIsPlaying(true);
  };

  const stopSlideshow = () => {
    setIsPlaying(false);
  };

  const playCurrentSlideAudio = (
    audioRef: React.RefObject<HTMLAudioElement>
  ) => {
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
        playSlideAudio={() => playCurrentSlideAudio(audioRef)}
        nextSlide={nextSlide}
      />
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
