import type { Metadata } from "next";
import { Inter as InterFont } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = InterFont({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true
});

export const metadata: Metadata = {
  title: "SpeakerDrive",
  description:
    "Discover events, contact decision-makers, and craft perfect outreach—all in one place.",
  // The issue is with this icons object - false values aren't valid for these properties
  // Let's remove it since we don't want to use the default icons
  icons: undefined
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased bg-white text-black")}>
        {children}
      </body>
    </html>
  );
}