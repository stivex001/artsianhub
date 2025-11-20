import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import "swiper/swiper-bundle.css";
import QueryProviders from "@/contexts/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { ModalCloseProvider } from "@/contexts/SheetCloseModal";
import ScrollToTop from "@/components/navigations/ScrollToTop";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

// const inter = Inter({
//   variable: "--font-inter-sans",
//   subsets: ["latin"],
// });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/satoshi/Satoshi-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "ARTISANSHUB",
  description: "Artisanshub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="description" content="ARTISANSHUB" />
        <meta property="og:title" content="ARTISANSHUB" />
        <meta property="og:description" content="ARTISANSHUB" />
        <meta property="og:image" content="/images/og-image.png" />
        <meta property="og:url" content="https://artisanshub.org/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content="ARTISANSHUB ecommerce" />
        <link rel="icon" href="/images/darklogo.svg" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://artisanshub.org/" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <QueryProviders>
        <ModalCloseProvider>
          <body className={` ${satoshi.variable} antialiased`}>
            <Toaster position="top-center" />
            <ScrollToTop />
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </body>
        </ModalCloseProvider>
      </QueryProviders>
    </html>
  );
}
