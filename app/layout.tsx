import type { Metadata } from "next";
import { Geist_Mono, Josefin_Sans } from "next/font/google";
import "./globals.css";
import QueryProviders from "@/contexts/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/ui/navigations/Navbar";
import ScrollToTop from "@/utils/ScrollToTop";

const josefin = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MENSAYHUB",
  description: "Mensayhub",
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
        <meta name="description" content="MENSAYHUB" />
        <meta property="og:title" content="MENSAYHUB" />
        <meta property="og:description" content="MENSAYHUB" />
        <meta property="og:image" content="/images/og-image.png" />
        <meta property="og:url" content="https://www.mensayhub.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content="MENSAYHUBs ecommerce" />
        <link rel="icon" href="/images/darklogo.svg" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://www.mensayhub.com" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <QueryProviders>
        <body
          className={`${josefin.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          <div className="w-full h-[calc(100vh-96px)] pt-24 scrollbar-hidden "> {children}</div>
          <Toaster position="top-center" />
        </body>
      </QueryProviders>
    </html>
  );
}
