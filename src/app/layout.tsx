import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EmilianiAI | Optimiza tus Vacaciones en Colombia",
    template: "%s | EmilianiAI"
  },
  description: "Maximiza tus días de descanso en Colombia usando IA y la Ley Emiliani. El optimizador premium para tus vacaciones del 2026.",
  keywords: ["vacaciones", "Colombia", "Ley Emiliani", "festivos", "optimización", "viajes", "IA"],
  authors: [{ name: "EmilianiAI Team" }],
  openGraph: {
    title: "EmilianiAI | Maximiza tu Descanso",
    description: "Convierte 15 días de vacaciones en un mes de descanso usando inteligencia artificial.",
    url: "https://emilianiai.app",
    siteName: "EmilianiAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EmilianiAI Dashboard Preview",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EmilianiAI | Optimiza tus Vacaciones",
    description: "El optimizador de vacaciones premium para Colombia.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} dark antialiased h-full`}>
      <body className="h-full flex flex-col bg-background text-foreground overflow-hidden">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
