import { ImageInfo, SlideProps } from "@/components/SlideShow";
import { useEffect, useRef, useState } from "react";

const images: ImageInfo[] = [
  { src: "/image1.png", soundSrc: "/notion.mp3" },
  { src: "/image3.png", soundSrc: "/cron.mp3" },
  { src: "/image2.png", soundSrc: "/linear.mp3" },
];

export const Slide: React.FC<SlideProps> = ({
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
    <div className="flex flex-col gap-4">
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
          </>
        ) : (
          <div>No image available</div>
        )}
      </div>
      <div
        className="bg-purple-500 h-2 rounded-3xl progress-bar"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};