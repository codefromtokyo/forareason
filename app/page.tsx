import { Dashboard } from "@/components/Dashboard";
import { supabaseServer } from "@/lib/supabase-server";
export default async function Home() {
  let name = "";
  try { const supabase = await supabaseServer(); const { data } = await supabase.auth.getUser(); name = (data.user?.user_metadata?.full_name as string) || ""; } catch {}
  return <Dashboard name={name} />;
}
