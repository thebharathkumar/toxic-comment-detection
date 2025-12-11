import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toxic Comment Detection",
  description: "AI-powered toxic comment detection using DistilBERT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
