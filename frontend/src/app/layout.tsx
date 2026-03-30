import type { Metadata } from "next";
import { DM_Serif_Display, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/auth/AuthProvider";

const serif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

const sans = Syne({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Zigister 23 — All Stores. One Registry. Built for Nigeria.",
  description: "Create a universal gift registry for weddings, baby showers, and more. Add gifts from Jumia, Jiji, Temu, and any store in the world. Get exactly what you want.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${serif.variable} ${sans.variable} antialiased selection:bg-gold selection:text-background`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}


