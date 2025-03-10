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
  icons: {
    icon: false,
    apple: false,
    shortcut: false
  }
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