import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "Blog app for ACTA",
  authors: [{ name: "ACTA Team" }], // Add author
  keywords: "ACTA, Blog, Technology, AI", // Add some relevant keywords
  viewport: "width=device-width, initial-scale=1", // Mobile-friendly scaling
  openGraph: {
    title: "Blog App for ACTA",
    description: "Discover insightful articles and updates from ACTA.",
    url: "https://yourblogapp.com", // Replace with your actual app URL
   // Provide an image for social sharing
    siteName: "ACTA Blog App",
  },
  twitter: {
    card: "summary_large_image", // Twitter card type
    site: "@ACTA", // Twitter handle (replace with your actual handle)
   // Twitter image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
