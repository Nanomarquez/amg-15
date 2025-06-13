import type React from "react";
import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Alma Morena Gamboa - XV Años",
  description:
    "Te invita a celebrar sus XV años - Una noche mágica e inolvidable",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${dancingScript.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
