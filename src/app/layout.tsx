import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bharattube",
  description: "Video sharing website for india",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-gray-950 to-gray-900`}>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-100 max-w-[600px] mx-auto text-center mb-1 mt-3">
          <Link href="/upload">BharatTube</Link>
        </h1>
        {children}
      </body>
    </html>
  );
}
