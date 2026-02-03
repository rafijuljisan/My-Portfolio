import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <-- THIS IS THE CRITICAL LINE

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jisan - Web Developer & Designer",
  description: "Creative designer and developer based in Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}