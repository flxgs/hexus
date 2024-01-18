import Link from "next/link";
import "./globals.css";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/36757830?v=4" />
            <AvatarFallback>FE</AvatarFallback>
          </Avatar>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            An example app built using Next.js 13 server components.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            I&apos;m building a web app with Next.js 13 and open sourcing
            everything. Follow along as we figure this out together.
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
