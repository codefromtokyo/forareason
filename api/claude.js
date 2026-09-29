const crypto = require("crypto");
const MAX_PROMPT = 20000;

function safeEqual(a, b) {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}
function extractJSON(text) {
  const t = text.replace(/```json|```/g, "").trim();
  const start = Math.min(...["{", "["].map(c => { const i = t.indexOf(c); return i < 0 ? Infinity : i; }));
  const end = Math.max(t.lastIndexOf("}"), t.lastIndexOf("]"));
  return JSON.parse(t.slice(start, end + 1));
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(503).json({ error: "ANTHROPIC_API_KEY is not set" });
  if (process.env.APP_PASSCODE && !safeEqual(req.headers["x-app-passcode"] || "", process.env.APP_PASSCODE))
    return res.status(401).json({ error: "Wrong passcode" });

  const prompt = req.body && typeof req.body.prompt === "string" ? req.body.prompt : "";
  if (!prompt || prompt.length > MAX_PROMPT) return res.status(400).json({ error: "Prompt missing or too long" });

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5",
        max_tokens: 3000,
        messages: [{ role: "user", content: prompt }]
      })
    });
    if (r.status === 429) return res.status(429).json({ error: "Rate limited" });
    if (!r.ok) return res.status(502).json({ error: "Upstream error " + r.status });
    const body = await r.json();
    const text = (body.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
    return res.status(200).json({ data: extractJSON(text) });
  } catch (e) {
    return res.status(500).json({ error: "Could not get or parse a response" });
  }
};
