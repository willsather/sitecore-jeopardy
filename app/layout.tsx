import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type React from "react";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Cloud Jeopardy",
  description: "Learn more about Vercel's AI Cloud",
  icons: {
    icon: `/favicon.ico`,
    shortcut: `/favicon.ico`,
    apple: [
      { url: `/57x57.png`, sizes: "57x57" },
      { url: `/120x120.png`, sizes: "120x120" },
      { url: `/180x180.png`, sizes: "180x180" },
    ],
    other: [{ rel: "mask-icon", url: `/safari-pinned-tab.svg` }],
  },
    generator: 'v0.app'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
