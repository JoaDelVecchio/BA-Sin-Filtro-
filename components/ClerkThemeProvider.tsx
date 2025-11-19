"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { ReactNode, useMemo } from "react";

const baseAppearance = {
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

const ClerkThemeProvider = ({ children }: { children: ReactNode }) => {
  const { resolvedTheme } = useTheme();

  const appearance = useMemo(
    () => ({
      ...baseAppearance,
      baseTheme: resolvedTheme === "dark" ? dark : undefined,
    }),
    [resolvedTheme]
  );

  return <ClerkProvider appearance={appearance}>{children}</ClerkProvider>;
};

export default ClerkThemeProvider;
