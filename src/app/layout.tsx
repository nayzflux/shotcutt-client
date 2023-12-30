import type { Metadata } from "next";
import { Inter, Outfit, Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/providers/Providers";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Shotcutt",
  description: "Split your footage in seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Toaster />

          <div className="flex flex-col min-h-screen w-screen">
            <Header />

            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
