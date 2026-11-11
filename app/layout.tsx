import type { Metadata } from "next";
import { LanguageProvider } from "./language";
import { SmoothScroll } from "./smooth-scroll";
import { OpeningReveal } from "./opening-reveal";
import "./globals.css";

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://terramosaica.com");
const title = "Terra Mosaica | L’art du zellige marocain";
const description = "Zellige marocain façonné à la main, six générations de savoir-faire. Collections, couleurs sur mesure et accompagnement de la carrière à la pose.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  applicationName: "Terra Mosaica",
  authors: [{ name: "Terra Mosaica" }],
  creator: "Terra Mosaica",
  category: "Architecture et artisanat",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "/",
    siteName: "Terra Mosaica",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Terra Mosaica — l’art du zellige marocain, trois siècles et six générations de savoir-faire." }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body><LanguageProvider><SmoothScroll /><OpeningReveal>{children}</OpeningReveal></LanguageProvider></body>
    </html>
  );
}
