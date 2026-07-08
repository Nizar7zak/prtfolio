import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nizar-portfolio.vercel.app"),
  title: "Nezar Zakout — AI Engineer",
  description:
    "Portfolio of Nezar Zakout, AI Engineer & Full-Stack Developer specializing in React, Next.js, and AWS.",
  icons: {
    icon: [{ url: "/profile.jpg", type: "image/jpeg" }],
    shortcut: "/profile.jpg",
    apple: "/profile.jpg",
  },
  openGraph: {
    title: "Nezar Zakout — AI Engineer",
    description: "Turning complex ideas into scalable digital solutions",
    url: "https://nizar-portfolio.vercel.app",
    siteName: "Nezar Zakout",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 512,
        height: 512,
        alt: "Nezar Zakout",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-ide-bg text-ide-text">
        {children}
      </body>
    </html>
  );
}
