import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";
import { Slide } from "./Slide";
import { jsPDF } from "jspdf";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AnimatePresence, motion } from "framer-motion";

export interface ImageInfo {
  src: string;
  soundSrc: string;
}
const pageTransitionVariants = {
  hidden: { opacity: 0, x: 0 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 0 },
};

export interface SlideProps {
  id: string;
  image: ImageInfo;
  isPlaying: boolean;
  playSlideAudio: () => void;
  nextSlide: () => void;
  onAudioEnd: () => void;
}

const images: ImageInfo[] = [
  { src: "/image1.png", soundSrc: "/notion.mp3" },
  { src: "/image3.png", soundSrc: "/cron.mp3" },
  { src: "/image2.png", soundSrc: "/linear.mp3" },
];

//////////////////////////////////////////////

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

  ////////////////////

  const playAudio = () => {
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const stopAudio = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to start
    }
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [isPlaying]);

  //////////////////////

  const playCurrentSlideAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  /////////////////////

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  /////////////////////

  const currentImage = images[currentSlide];

  const downloadPdf = async () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      if (i > 0) {
        pdf.addPage();
      }

      // Load the image to get its dimensions
      let img = new Image();
      img.src = image.src;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // A4 dimensions
      const pageWidth = 210;
      const pageHeight = 297;

      // Calculate the scaled dimensions
      let imgWidth = img.width;
      let imgHeight = img.height;

      // Scale the image to fit within the A4 dimensions
      if (imgWidth > pageWidth) {
        imgHeight *= pageWidth / imgWidth;
        imgWidth = pageWidth;
      }

      if (imgHeight > pageHeight) {
        imgWidth *= pageHeight / imgHeight;
        imgHeight = pageHeight;
      }

      // Center the image on the page
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(image.src, "PNG", x, y, imgWidth, imgHeight);
    }

    pdf.save("slideshow.pdf");
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4 h-screen justify-center">
      <motion.div
        initial="hidden"
        animate="enter"
        variants={pageTransitionVariants}
        transition={{ type: "easeInOut", duration: 0.5, delay: 0.5 }}
        className="flex flex-row justify-between items-center w-full"
      >
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/36757830?v=4" />
          <AvatarFallback>FE</AvatarFallback>
        </Avatar>
        <Button onClick={downloadPdf}>
          <FileText className="mr-2 lucide" />
          Download PDF
        </Button>
      </motion.div>

      <Slide
        id={`slide-${currentSlide}`}
        image={currentImage}
        isPlaying={isPlaying}
        playSlideAudio={playCurrentSlideAudio}
        nextSlide={nextSlide}
        onAudioEnd={handleAudioEnd}
      />

      <motion.div
        initial="hidden"
        animate="enter"
        variants={pageTransitionVariants}
        transition={{ type: "easeInOut", duration: 1.3 }}
        className="flex flex-row gap-4"
      >
        <Button onClick={prevSlide}>
          <ArrowLeft className="mr-2" />
          Previous Slide
        </Button>

        {/* Play Button */}
        <Button onClick={playAudio} disabled={isPlaying}>
          Play
        </Button>

        {/* Pause Button */}
        <Button onClick={pauseAudio} disabled={!isPlaying}>
          Pause
        </Button>

        {/* Stop Button */}
        <Button onClick={stopAudio}>Stop</Button>

        <Button onClick={nextSlide}>
          Next Slide <ArrowRight className="ml-2" />
        </Button>
      </motion.div>
      <div className="text-gray-600 text-sm">
        Slide {currentSlide + 1}/{images.length}
      </div>
    </div>
  );
};

export default Slideshow;
