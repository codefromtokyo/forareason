import Link from "next/link";

export function TopBar() {
  return (
    <header className="border-b border-slate-200 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-read text-lg font-bold text-delft">
          <span aria-hidden>📍</span> For a Reason
        </Link>
        <nav className="hidden items-center gap-4 text-sm font-semibold text-slate-500 sm:flex">
          <Link href="/tools" className="hover:text-delft">Tools</Link>
          <Link href="/community" className="hover:text-delft">Community</Link>
          <Link href="/about" className="hover:text-delft">About</Link>
          <Link href="/signin" className="rounded-lg border border-delft px-3 py-1.5 text-delft">Sign in</Link>
        </nav>
      </div>
    </header>
  );
}
