import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "FAMCO Used Equipment | Verified Used Industrial Machinery Marketplace",
  description:
    "The region's trusted marketplace for verified used construction equipment, trucks, buses, and industrial machinery. FAMCO Approved — inspected, certified, ready to work.",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
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
        {/* Warm connection to Sketchfab CDNs so 3D viewers start loading
            faster — saves DNS + TLS handshake on every iframe mount. */}
        <link rel="preconnect" href="https://sketchfab.com" />
        <link rel="preconnect" href="https://static.sketchfab.com" crossOrigin="" />
        <link rel="preconnect" href="https://media.sketchfab.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://sketchfab.com" />
        <link rel="dns-prefetch" href="https://static.sketchfab.com" />
        <link rel="dns-prefetch" href="https://media.sketchfab.com" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
