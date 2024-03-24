import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/providers/Providers";
import { ThemeProvider } from "@/providers/ThemeProvider";

const inter = Gabarito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <Toaster />

            <div className="flex flex-col min-h-screen w-screen dark:bg-[#0a0a0c] dark:text-[#fdfdfd] text-black dark:dark">
              <Header />

              {children}
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
