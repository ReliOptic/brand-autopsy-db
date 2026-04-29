import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BAUTOPSY — Brand Intelligence Console",
    template: "%s | BAUTOPSY",
  },
  description:
    "S&P 500 brand strategy intelligence. Search, dissect and compare 513 brands across 8 strategic layers — Identity, Audience, Competitive, Content DNA, Design System, Channels, Financials, Legal.",
  keywords: [
    "brand strategy",
    "brand intelligence",
    "S&P 500",
    "brand analysis",
    "competitive intelligence",
    "brand positioning",
  ],
  authors: [{ name: "Brand Autopsy DB" }],
  openGraph: {
    type: "website",
    siteName: "BAUTOPSY",
    title: "BAUTOPSY — Brand Intelligence Console",
    description: "The Bloomberg Terminal for S&P 500 brand intelligence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BAUTOPSY — Brand Intelligence Console",
    description: "The Bloomberg Terminal for S&P 500 brand intelligence.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
