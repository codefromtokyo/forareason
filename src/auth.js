/* Auth + cloud storage. Uses Supabase when config.js is filled in, else a local-only fallback.
   Public API used by the app: Cloud.ready, Cloud.mode, Cloud.user, Cloud.init(), Cloud.signInGoogle(),
   Cloud.signOut(), Cloud.loadAll(), Cloud.saveState(state), Cloud.loadProfile(), Cloud.saveProfile(p). */
const Cloud = (() => {
  const cfg = (window.FR_CONFIG || {});
  const live = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY);
  let sb = null, user = null, ready = false, lastError = null;
  const listeners = [];

  async function loadSDK() {
    if (window.supabase) return window.supabase;
    const m = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm");
    return m;
  }
  async function init() {
    if (!live) { ready = true; return { mode: "local" }; }
    try {
      const { createClient } = await loadSDK();
      sb = createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, { auth: { persistSession: true, detectSessionInUrl: true } });
      const { data } = await sb.auth.getSession();
      user = data.session ? data.session.user : null;
      sb.auth.onAuthStateChange((_e, session) => { user = session ? session.user : null; listeners.forEach(f => f(user)); });
      ready = true;
      return { mode: "supabase" };
    } catch (e) { sb = null; ready = true; lastError = (e && e.message) || String(e); return { mode: "local", error: e }; }
  }
  function onAuth(f) { listeners.push(f); }
  async function signInGoogle() {
    if (!sb) return { local: true };
    const redirectTo = location.origin + location.pathname;
    const { error } = await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo } });
    if (error) { const m = (error.message || "").toLowerCase(); throw { code: m.includes("provider") || m.includes("not enabled") ? "google_off" : "error", message: error.message }; }
    return { redirecting: true };
  }
  async function signInEmail(email) {
    if (!sb) return { local: true };
    const redirectTo = location.origin + location.pathname;
    const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
    if (error) { const m = (error.message || "").toLowerCase(); throw { code: m.includes("rate") ? "rate_limited" : m.includes("redirect") ? "redirect_off" : "error", message: error.message }; }
    return { sent: true };
  }
  async function signOut() { if (sb) await sb.auth.signOut(); user = null; }

  // Profile: one row in public.profiles plus languages/places tables.
  async function loadProfile() {
    if (!sb || !user) return null;
    await sb.from("profiles").update({ last_seen_at: new Date().toISOString() }).eq("id", user.id);
    const { data: p } = await sb.from("profiles").select("*").eq("id", user.id).maybeSingle();
    if (!p) return { id: user.id, name: (user.user_metadata && user.user_metadata.full_name) || "", from: "", bio: "", reasons: [], langs: [], places: [], honest: false, is_public: true, handle: "", locale: "", email_opt_in: false, terms_at: null };
    const [{ data: langs }, { data: places }] = await Promise.all([
      sb.from("declared_languages").select("*").eq("user_id", user.id),
      sb.from("places").select("*").eq("user_id", user.id)
    ]);
    return { id: user.id, name: p.display_name || "", from: p.home || "", bio: p.bio || "", reasons: p.reasons || [], honest: p.honest_pledge, is_public: p.is_public, handle: p.handle || "", locale: p.locale || "", email_opt_in: !!p.email_opt_in, terms_at: p.terms_accepted_at,
      langs: (langs || []).map(l => ({ code: l.language, name: l.language, test: l.test, level: l.level, goal: l.goal, note: l.note })),
      places: (places || []).map(x => ({ country: x.country, city: x.city, status: x.status, reason: x.reason, language: x.language })) };
  }
  async function saveProfile(u) {
    if (!sb || !user) return false;
    const row = { id: user.id, display_name: u.name, home: u.from, bio: u.bio, reasons: u.reasons, honest_pledge: !!u.honest, is_public: u.is_public !== false, handle: (u.handle || "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 30) || null, locale: u.locale || (typeof UI_LANG !== "undefined" ? UI_LANG : "en"), email_opt_in: !!u.email_opt_in, updated_at: new Date().toISOString() };
    if (u.terms) row.terms_accepted_at = u.terms_at || new Date().toISOString();
    const { error: upErr } = await sb.from("profiles").upsert(row);
    if (upErr && (upErr.code === "23505" || (upErr.message || "").includes("handle"))) throw { code: "handle_taken" };
    await sb.from("declared_languages").delete().eq("user_id", user.id);
    if (u.langs.length) await sb.from("declared_languages").insert(u.langs.map(l => ({ user_id: user.id, language: l.name || l.code, test: l.test, level: l.level, goal: l.goal, note: l.note })));
    await sb.from("places").delete().eq("user_id", user.id);
    if (u.places.length) await sb.from("places").insert(u.places.map(p => ({ user_id: user.id, country: p.country, city: p.city, status: p.status, reason: p.reason, language: p.language })));
    return true;
  }
  // Progress: one JSON row per course in public.progress.
  async function loadProgress() {
    if (!sb || !user) return null;
    const { data } = await sb.from("progress").select("course, data").eq("user_id", user.id);
    const out = {}; (data || []).forEach(r => out[r.course] = r.data); return out;
  }
  async function saveProgress(course, data) {
    if (!sb || !user) return false;
    await sb.from("progress").upsert({ user_id: user.id, course, data, updated_at: new Date().toISOString() });
    return true;
  }
  async function loadPublicProfile(id) {
    if (!sb) return null;
    const { data: p } = await sb.from("profiles").select("id,handle,display_name,home,bio,reasons,badges,is_public").eq("id", id).eq("is_public", true).maybeSingle();
    if (!p) return null;
    const [{ data: langs }, { data: places }] = await Promise.all([
      sb.from("declared_languages").select("*").eq("user_id", id),
      sb.from("places").select("*").eq("user_id", id)
    ]);
    return { id:p.id, handle:p.handle || "", name:p.display_name || "", from:p.home || "", bio:p.bio || "", reasons:p.reasons || [], badges:p.badges || {},
      langs:(langs || []).map(l => ({ name:l.language, test:l.test, level:l.level, goal:l.goal, note:l.note })),
      places:(places || []).map(x => ({ country:x.country, city:x.city, status:x.status, reason:x.reason, language:x.language })) };
  }
  async function resolveHandle(h) {
    if (!sb) return null;
    const { data } = await sb.rpc("profile_id_by_handle", { h });
    return data || null;
  }
  async function listPublicProfiles(limit) {
    if (!sb) return [];
    const { data } = await sb.from("public_profiles").select("id,display_name,updated_at").order("updated_at", { ascending:false }).limit(limit || 200);
    return data || [];
  }
  return { get ready() { return ready; }, get mode() { return sb ? "supabase" : "local"; }, get user() { return user; }, live,
    get lastError() { return lastError; }, init, onAuth, signInGoogle, signInEmail, signOut, loadProfile, saveProfile, loadProgress, saveProgress, loadPublicProfile, listPublicProfiles, resolveHandle };
})();
