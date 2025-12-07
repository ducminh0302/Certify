import type { Metadata, Viewport } from "next";
import { Nunito, Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Certify.AI - AI-Powered Exam Preparation",
    template: "%s | Certify.AI",
  },
  description:
    "Master your certification exams with AI-powered practice tests and personalized study assistance. Start with CFA, AWS, and more.",
  keywords: [
    "certification exam",
    "CFA prep",
    "AWS certification",
    "AI tutor",
    "exam practice",
    "study assistant",
  ],
  authors: [{ name: "Certify.AI" }],
  creator: "Certify.AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Certify.AI",
    title: "Certify.AI - AI-Powered Exam Preparation",
    description:
      "Master your certification exams with AI-powered practice tests and personalized study assistance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certify.AI - AI-Powered Exam Preparation",
    description:
      "Master your certification exams with AI-powered practice tests and personalized study assistance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} ${outfit.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "var(--card)",
                color: "var(--card-foreground)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
              },
              success: {
                iconTheme: {
                  primary: "var(--success)",
                  secondary: "white",
                },
              },
              error: {
                iconTheme: {
                  primary: "var(--error)",
                  secondary: "white",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
