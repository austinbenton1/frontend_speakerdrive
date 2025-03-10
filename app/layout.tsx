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
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicon.png",
        type: "image/png",
        sizes: "48x48",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "SpeakerDrive",
    statusBarStyle: "default",
  },
  applicationName: "SpeakerDrive",
  keywords: ["speaker", "events", "outreach", "speaking", "coaching", "expert"],
  creator: "SpeakerDrive",
  openGraph: {
    title: "SpeakerDrive",
    description: "Discover events, contact decision-makers, and craft perfect outreach—all in one place.",
    url: "https://speakerdrive.com",
    siteName: "SpeakerDrive",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SpeakerDrive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpeakerDrive",
    description: "Discover events, contact decision-makers, and craft perfect outreach—all in one place.",
    images: ["/og-image.png"],
  },
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