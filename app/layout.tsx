import type { Metadata } from "next";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { TopBar } from "@/components/TopBar";

export const metadata: Metadata = {
  title: "For a Reason — break the language gap, together",
  description:
    "A non-profit, open-source community that learns the language, travel, road rules, visas and remote-work a new country asks of them, for a real reason.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen pb-20">
        <TopBar />
        <main className="mx-auto max-w-3xl px-4 py-4">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
