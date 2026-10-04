"use client";
import Link from "next/link";
import { useI18n } from "@/components/i18n/LocaleProvider";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
export function TopBar() {
  const { t } = useI18n();
  return (
    <header className="border-b border-slate-200 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-read text-lg font-bold text-delft"><span aria-hidden>📍</span> For a Reason</Link>
        <nav className="flex items-center gap-4 text-sm font-semibold text-slate-500">
          <Link href="/tools" className="hidden hover:text-delft sm:inline">{t("tools")}</Link>
          <Link href="/community" className="hidden hover:text-delft sm:inline">{t("community")}</Link>
          <Link href="/about" className="hidden hover:text-delft sm:inline">{t("about")}</Link>
          <Link href="/signin" className="hidden rounded-lg border border-delft px-3 py-1.5 text-delft sm:inline">{t("signIn")}</Link>
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}
