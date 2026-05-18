import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "UserOps | User Management", template: "%s | UserOps" },
  description: "A simple user management and operations workspace.",
  keywords: ["UserOps", "User Management", "Dashboard", "Admin"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <QueryProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-full flex flex-col`}
        >
          {children}
        </body>
      </QueryProvider>
    </html>
  );
}
