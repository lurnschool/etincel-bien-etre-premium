import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Caveat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { FloatingAssistant } from "@/components/ai/FloatingAssistant";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { seoDefaults, brand } from "@/lib/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(seoDefaults.siteUrl),
  title: {
    default: seoDefaults.defaultTitle,
    template: `%s · ${brand.name}`,
  },
  description: seoDefaults.defaultDescription,
  keywords: [
    "Céline Dusseval",
    "Etincel de bien être",
    "bien-être Bordeaux",
    "thérapeute holistique Gironde",
    "numérologie Bordeaux",
    "hypnose Gironde",
    "CellRelease",
    "breathwork Bordeaux",
    "innerdance",
    "cercle de femmes Bordeaux",
    "féminin sacré",
    "retraite bien-être Gironde",
    "Le Taillan-Médoc",
  ],
  authors: [{ name: brand.practitioner }],
  creator: brand.practitioner,
  publisher: brand.name,
  openGraph: {
    type: "website",
    locale: seoDefaults.locale,
    url: seoDefaults.siteUrl,
    siteName: brand.name,
    title: seoDefaults.defaultTitle,
    description: seoDefaults.defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: seoDefaults.defaultTitle,
    description: seoDefaults.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${cormorant.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-deep">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <FloatingAssistant />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
