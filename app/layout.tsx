import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <-- THIS IS THE CRITICAL LINE

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ripon - Full Stack Web Developer",
  description: "Creative designer and developer based in New York, USA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}