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
      <meta name="google-site-verification" content="Fc18zIdo6Geo7m6nFSho38ZUL67NpIVrJrBzV57uxag" />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}>
        <div className="grid grid-cols-2 gap-6 px-4 py-6 max-w-[600px] lg:max-w-[1200px] mx-auto items-center">
          <h1 className="text-3xl font-bold text-gray-100">
            <Link href="/">BharatTube</Link>
          </h1>
          <div className="text-right">
            <Link href="/upload" className="inline-block bg-blue-600/30 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
              Upload
            </Link>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
