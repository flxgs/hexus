import Link from "next/link";
import "./globals.css";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col">
          <header className="container z-40 bg-background">
            <div className="flex h-20 items-center justify-between py-6"></div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
