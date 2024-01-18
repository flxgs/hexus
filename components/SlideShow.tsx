import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";
import { Slide } from "./Slide";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";

export interface ImageInfo {
  src: string;
  soundSrc: string;
}

export interface SlideProps {
  id: string;
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

  const pdfRef = useRef<jsPDF | null>(null);

  const getFormattedDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const downloadPdf = () => {
    const formattedDate = getFormattedDate();
    const pdfFileName = `slideshow_${formattedDate}.pdf`;

    const pdf = new jsPDF();

    const addImageToPdf = (imageUrl: string) => {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        const imgWidth = 210;
        const imgHeight = (img.height * imgWidth) / img.width;
        pdf.addImage(img, "PNG", 0, 0, imgWidth, imgHeight);

        pdf.addPage();

        if (images.length === pdfRef.current?.getNumberOfPages()) {
          pdf.save(pdfFileName);
        }
      };
    };

    images.forEach((image) => {
      addImageToPdf(image.src);
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 h-screen justify-center">
      <div className="flex flex-row justify-between items-center w-full">
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/36757830?v=4" />
          <AvatarFallback>FE</AvatarFallback>
        </Avatar>
        <Button onClick={downloadPdf}>
          <FileText className="mr-2 lucide" />
          Download PDF
        </Button>
      </div>

      <Slide
        id={`slide-${currentSlide}`}
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
