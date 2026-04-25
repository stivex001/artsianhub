import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "swiper/swiper-bundle.css";
import QueryProviders from "@/contexts/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { ModalCloseProvider } from "@/contexts/SheetCloseModal";
import ScrollToTop from "@/components/navigations/ScrollToTop";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import { JsonLd } from "@/components/seo/JsonLd";

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
  metadataBase: new URL("https://artisanshub.org"),
  title: {
    default: "ArtisansHub — Find Skilled Artisans Near You",
    template: "%s | ArtisansHub",
  },
  description:
    "Connect with verified skilled artisans — tailors, carpenters, photographers, and more. Hire or become an artisan on ArtisansHub.",
  keywords: [
    "artisans",
    "skilled workers",
    "hire artisan",
    "freelance craftsmen",
    "Nigeria artisans",
    "find artisan",
    "chesterfield artisans",
    "UK artisans",
  ],
  openGraph: {
    type: "website",
    url: "https://artisanshub.org",
    siteName: "ArtisansHub",
    title: "ArtisansHub — Find Skilled Artisans Near You",
    description:
      "Connect with verified skilled artisans — tailors, carpenters, photographers, and more.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "ArtisansHub" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArtisansHub — Find Skilled Artisans Near You",
    description:
      "Connect with verified skilled artisans — tailors, carpenters, photographers, and more.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ArtisansHub",
            alternateName: "ArtisansHub.org",
            url: "https://artisanshub.org",
            logo: "https://artisanshub.org/images/logo.png",
            foundingLocation: { "@type": "Place", name: "United Kingdom" },
            contactPoint: {
              "@type": "ContactPoint",
              email: "support@artisanshub.org",
              contactType: "customer service",
              availableLanguage: "English",
            },
            sameAs: [
              "https://www.facebook.com/artisanshub",
              "https://www.instagram.com/artisanshub",
              "https://www.linkedin.com/company/artisanshub",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "ArtisansHub",
            url: "https://artisanshub.org",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://artisanshub.org/artisans?search={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          },
        ]} />
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
