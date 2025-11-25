import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme-provider";
import ClerkThemeProvider from "@/components/ClerkThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BA SIN FILTRO",
  description: "Noticias sin filtro ni sesgos.",
  icons: {
    icon: [
      { url: "/BALogo.png", rel: "icon", type: "image/png" },
      { url: "/BALogo.png", rel: "shortcut icon", type: "image/png" },
    ],
    apple: [{ url: "/BALogo.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ClerkThemeProvider>{children}</ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
