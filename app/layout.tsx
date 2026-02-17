import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora"
});

export const metadata: Metadata = {
  title: "MrBeast Live Stats",
  description: "Dashboard avec compteurs et historique stocke dans Neon."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={sora.variable}>{children}</body>
    </html>
  );
}
