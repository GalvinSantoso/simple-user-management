import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProviders";
import Footer from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/sonner";

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
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-full grid grid-rows-[1fr_auto] bg-gray-100 dark:bg-background text-foreground`}
        >
          <div className="w-full min-h-screen grid grid-rows-[auto_1fr]">
            <Navbar />
            <main>{children}</main>
          </div>
          <Toaster richColors position="top-right" />
        </body>
      </QueryProvider>
    </html>
  );
}
