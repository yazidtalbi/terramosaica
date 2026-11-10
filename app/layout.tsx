import type { Metadata } from "next";
import { SmoothScroll } from "./smooth-scroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Terra Mosaica | L’art du zellige marocain",
  description: "L’art de la terre, la beauté du geste. Découvrez les collections de zellige, émaux et motifs de Terra Mosaica.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body><SmoothScroll />{children}</body>
    </html>
  );
}
