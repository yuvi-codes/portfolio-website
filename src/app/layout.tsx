import type { Metadata } from "next";
import {
  Montserrat,
  Lora,
  Sarala,
  Staatliches,
  Cormorant_Garamond,
  Bebas_Neue,
} from "next/font/google";
import "./globals.css";

/* ── Body / UI Fonts ─────────────────────────────────────── */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sarala = Sarala({
  variable: "--font-sarala",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

/* ── Display / Hero Fonts ────────────────────────────────── */
const staatliches = Staatliches({
  variable: "--font-staatliches",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yuvraj Umang M — Forward Deployed Engineer & AI Builder",
  description:
    "Portfolio of Yuvraj Umang M, a Forward Deployed Engineer and AI Builder based in Bengaluru, India. Specialising in Python, LangChain, RAG, and autonomous agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = [
    montserrat.variable,
    lora.variable,
    sarala.variable,
    staatliches.variable,
    cormorantGaramond.variable,
    bebasNeue.variable,
  ].join(" ");

  return (
    <html lang="en" className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--obsidian)]">
        {children}
      </body>
    </html>
  );
}
