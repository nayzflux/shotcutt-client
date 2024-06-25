import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/providers/Providers";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Footer } from "@/components/footer/Footer";

const inter = Gabarito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Shotcutt",
  description:
    "Shotcutt allows you to split your footage using AI & Automation. Let us handle the intricate work - allow the magic of automatic scene detection to set your creativity free!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="shotcutt.nayz.fr"
          src="https://plausible.nayz.fr/js/script.js"
        ></script>
      </head>

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

              <Footer />
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
