import type { Metadata } from "next";
import { Inter as InterFont } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = InterFont({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
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
    description:
      "Discover events, contact decision-makers, and craft perfect outreach—all in one place.",
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
    description:
      "Discover events, contact decision-makers, and craft perfect outreach—all in one place.",
    images: ["/og-image.png"],
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
        {/* 1. Load the tracer script */}
        <script defer src="https://app.visitortracking.com/assets/js/tracer.js"></script>

        {/* 2. Call the tracer after the DOM and script are ready */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
document.addEventListener('DOMContentLoaded', function() {
  // Make sure Tracer is defined before using it
  if (typeof Tracer === 'function') {
    new Tracer({
      websiteId: "39d90972-4818-4a00-bd05-64f15964c5cf",
      async: true,
      debug: false
    });
  } else {
    console.error("Tracer script not loaded or Tracer is not defined.");
  }
});
            `,
          }}
        />
      </head>
      <body className={cn(inter.className, "antialiased bg-white text-black")}>
        {children}
      </body>
    </html>
  );
}
