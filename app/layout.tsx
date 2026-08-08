import type { Metadata, Viewport } from "next";
import "@fontsource/anton/400.css";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/permanent-marker/400.css";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { AppProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "ABTalks — 60-Day Coding Challenge",
  description:
    "Pick a track, build daily, post proof. A 60-day coding challenge for Indian college students, built to make consistency visible to recruiters.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="grain antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <AppProvider>
            <main className="min-h-dvh">{children}</main>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
