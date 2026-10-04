import type { Metadata } from "next";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { TopBar } from "@/components/TopBar";
import { PWA } from "@/components/PWA";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";

export const viewport = { themeColor: "#1D4BA8", width: "device-width", initialScale: 1, viewportFit: "cover" as const };

const SITE = process.env.SITE || "https://forareason.vercel.app";
const DESC = "A non-profit, open-source community that learns the language, travel, road rules, visas and remote-work a new country asks of them, for a real reason.";
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "For a Reason — break the language gap, together", template: "%s · For a Reason" },
  description: DESC,
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "For a Reason" },
  openGraph: { title: "For a Reason — break the language gap, together", description: DESC, url: SITE, siteName: "For a Reason", images: [{ url: "/og.png", width: 1200, height: 630 }], type: "website" },
  twitter: { card: "summary_large_image", title: "For a Reason", description: DESC, images: ["/og.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen pb-20">
        <LocaleProvider>
          <TopBar />
          <main className="mx-auto max-w-3xl px-4 py-4">{children}</main>
          <BottomNav />
          <PWA />
        </LocaleProvider>
      </body>
    </html>
  );
}
