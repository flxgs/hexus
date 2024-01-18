import Link from "next/link";
import "./globals.css";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <html className="bg-gray-900">
      <body>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1 bg-gray-900">{children}</main>
        </div>
      </body>
    </html>
  );
}
