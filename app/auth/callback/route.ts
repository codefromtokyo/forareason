import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Exchanges the OAuth / magic-link code for a session cookie, then redirects.
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/";
  const res = NextResponse.redirect(new URL(next, url.origin));
  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const sbKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (code && sbUrl && sbKey) {
    const supabase = createServerClient(sbUrl, sbKey, {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (list: { name: string; value: string; options?: Record<string, unknown> }[]) =>
          list.forEach(({ name, value, options }) => res.cookies.set(name, value, options)),
      },
    });
    await supabase.auth.exchangeCodeForSession(code);
  }
  return res;
}
