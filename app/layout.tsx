import SupabaseProvider from "@/components/auth/SupabaseProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Just Say!",
  description: "All you have to do is just say it",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <main>{children}</main>
        </SupabaseProvider>
      </body>
    </html>
  );
}
