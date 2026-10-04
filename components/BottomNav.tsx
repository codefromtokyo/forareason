"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n/LocaleProvider";

const ICONS: Record<string,string> = { home:"M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5", tools:"M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z", community:"M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12Z", you:"M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" };
export function BottomNav() {
  const path = usePathname();
  const { t } = useI18n();
  const items = [
    { href: "/", key: "home", icon: ICONS.home },
    { href: "/tools", key: "tools", icon: ICONS.tools },
    { href: "/community", key: "community", icon: ICONS.community },
    { href: "/signin", key: "you", icon: ICONS.you },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex border-t border-slate-200 bg-white shadow-[0_-3px_14px_rgba(21,32,56,.10)] sm:hidden">
      {items.map((it) => {
        const active = it.href === "/" ? path === "/" : path.startsWith(it.href);
        return (
          <Link key={it.href} href={it.href}
            className={`flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-semibold ${active ? "text-delft" : "text-slate-500"}`}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={it.icon} />
            </svg>
            {t(it.key)}
          </Link>
        );
      })}
    </nav>
  );
}
