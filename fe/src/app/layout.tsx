import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Modern Web App",
  description: "A very simple frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
    >
      <AuthProvider>
        <body className="min-h-full flex flex-col bg-gray-50 dark:bg-zinc-950">
          <Navbar />
          <main className="grow">{children}</main>
        </body>
      </AuthProvider>
    </html>
  );
}
