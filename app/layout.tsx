import type { Metadata } from "next";
import { Inter as InterFont } from "next/font/google";
import { cn } from "@/lib/utils"; // Adjust if your util path differs
import "./globals.css";

// 1) Import both loader components
import LuckyOrangeLoader from "../components/LuckyOrangeLoader";
import TracerLoader from "../components/TracerLoader";

const inter = InterFont({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "SpeakerDrive | Find & Book Speaking Opportunities",
  description:
    "Find speaking opportunities, connect with decision-makers, and book more gigs. The all-in-one platform for speakers, coaches, and experts to grow their business.",
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
    capable: true,
    statusBarStyle: "default",
  },
  applicationName: "SpeakerDrive",
  keywords: ["speaker", "events", "outreach", "speaking", "coaching", "expert", "business development", "lead generation"],
  creator: "SpeakerDrive",
  openGraph: {
    title: "SpeakerDrive | Find & Book Speaking Opportunities",
    description:
      "Find speaking opportunities, connect with decision-makers, and book more gigs. The all-in-one platform for speakers, coaches, and experts to grow their business.",
    url: "https://speakerdrive.com",
    siteName: "SpeakerDrive",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "SpeakerDrive",
        secureUrl: "https://speakerdrive.com/og-image.png"
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpeakerDrive | Find & Book Speaking Opportunities",
    description:
      "Find speaking opportunities, connect with decision-makers, and book more gigs. The all-in-one platform for speakers, coaches, and experts to grow their business.",
    images: [
      {
        url: "/og-image.png",
        alt: "SpeakerDrive - Find & Book Speaking Opportunities",
        width: 1200,
        height: 630,
      }
    ],
    site: "@speakerdrive",
    creator: "@austinbenton"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "verification_token",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* 2) Load Lucky Orange and Tracer scripts in the head */}
        <LuckyOrangeLoader />
        <TracerLoader />
      </head>
      <body className={cn(inter.className, "antialiased bg-white text-black")}>
        {children}
      </body>
    </html>
  );
}
