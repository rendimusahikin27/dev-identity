import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rendi Musahikin | Fullstack Developer", // Ganti dengan nama kamu
  description: "Digital identity and portfolio of Rendi Musahikin, built with Next.js 15",
  icons: {
    icon: "/favicon.ico", // Pastikan kamu punya favicon atau hapus baris ini
  },
  openGraph: {
    title: "Rendi Musahikin | Dev Identity",
    description: "Connect with me on GitHub, LinkedIn, and WhatsApp",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}