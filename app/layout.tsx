import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/Theme-provider";

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
  description: "Noticias de buenos aires y CABA sin filtro ni sesgos.",
};

const clerkAppearance = {
  variables: {
    colorPrimary: "var(--primary)",
    colorPrimaryText: "var(--primary-foreground)",
    colorText: "var(--foreground)",
    colorBackground: "var(--background)",
    borderRadius: "var(--radius)",
    fontFamily: "var(--font-geist-sans)",
  },
  elements: {
    card: "glass-panel max-w-md text-left",
    formButtonPrimary: "btn-primary py-0 px-0 h-10",
    formFieldInput: "bg-background text-foreground border-border",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html lang="es" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
