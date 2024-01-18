"use client";

import Link from "next/link";
import "../globals.css";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Slideshow from "@/components/SlideShow";

export default async function SlideShowPage() {
  return (
    <>
      <section className="flex flex-col items-center bg-gray-900">
        <Slideshow />
      </section>
    </>
  );
}
