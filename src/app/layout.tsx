import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/lib/react-query-client";

export const metadata: Metadata = {
  title: "Crypto-Tracker",
  description: "A Light Weight Crypto Currency Tracker",
};

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={`${bebasNeue.variable} antialiased`}>{children}</body>
      </Provider>
    </html>
  );
}
