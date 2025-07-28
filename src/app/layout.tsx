import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/components/providers/auth-providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Business War Room with Balogun",
  description: "Battle-tested strategies for startups and growing businesses",
  openGraph: {
    images: [
      {
        url: 'https://bwr-with-balogun.lovable.app/lovable-uploads/49e0c2cd-e060-4f36-a566-3696af51898b.png', // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: 'Logo',
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
