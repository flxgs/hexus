import Link from "next/link";
import "./globals.css";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const pageTransitionVariants = {
  hidden: { opacity: 0, x: 0 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 0 },
};
export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 bg-gray-900">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/36757830?v=4" />
            <AvatarFallback>FE</AvatarFallback>
          </Avatar>
          <h1 className="font-heading text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            A Simple and Clean Slideshow
          </h1>
          <p className="max-w-[42rem] text-gray-50 leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            A quick and simple slideshow displaying images while playing audio.
            It also shows progress and allows a PDF download
          </p>
          <div className="space-x-4">
            <Link
              href="/slide-show"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Go to Slide Show
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
