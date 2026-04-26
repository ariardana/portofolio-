import type { Metadata, Viewport } from "next";
import "./globals.css";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import config from "./config";

export const metadata: Metadata = {
  title: config.site.title,
  description: config.site.description,
  metadataBase: new URL(config.site.url),
  openGraph: {
    title: config.site.title,
    description: config.site.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.site.title,
    description: config.site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#03040a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body
        className={`relative min-h-screen overflow-x-hidden ${
          config.theme.enableScanlines ? "scanlines" : ""
        } ${config.theme.enableNoise ? "noise" : ""}`}
      >
        <Background />
        <Navbar />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
