"use client";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { planItinerary } from "./itinerary";

function wrap(text: string, font: any, size: number, maxW: number) {
  const out: string[] = [];
  String(text).split("\n").forEach((par) => {
    if (par === "") { out.push(""); return; }
    let line = "";
    par.split(/\s+/).forEach((w) => {
      const test = line ? line + " " + w : w;
      if (font.widthOfTextAtSize(test, size) > maxW && line) { out.push(line); line = w; } else line = test;
    });
    if (line) out.push(line);
  });
  return out;
}

export interface PdfSpec { filename: string; title: string; subtitle?: string; fields?: { label: string; value: string }[]; blocks?: { h?: string; text: string }[]; }

export async function makePDF(spec: PdfSpec) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const form = doc.getForm();
  const W = 595, H = 842, M = 56, maxW = W - M * 2;
  const blue = rgb(0.11, 0.29, 0.66), ink = rgb(0.08, 0.12, 0.22), grey = rgb(0.45, 0.5, 0.58);
  let page = doc.addPage([W, H]); let y = H - M; let fieldN = 0;
  const nl = (h = 14) => { y -= h; if (y < M + 40) { page = doc.addPage([W, H]); y = H - M; } };
  const draw = (t: string, f: any, s: number, c: any, x = M) => page.drawText(String(t), { x, y, size: s, font: f, color: c });
  draw(spec.title, bold, 20, blue); nl(24);
  if (spec.subtitle) { draw(spec.subtitle, font, 11, grey); nl(20); }
  page.drawLine({ start: { x: M, y: y + 6 }, end: { x: W - M, y: y + 6 }, thickness: 1, color: rgb(0.8, 0.85, 0.93) }); nl(14);
  (spec.fields || []).forEach((f) => {
    draw(f.label, bold, 10, ink); nl(15);
    const tf = form.createTextField("f" + fieldN++); tf.setText(f.value || "");
    tf.addToPage(page, { x: M, y: y - 2, width: maxW, height: 16, borderColor: rgb(0.8, 0.85, 0.93), backgroundColor: rgb(0.97, 0.98, 1), borderWidth: 1 });
    tf.setFontSize(10); nl(26);
  });
  if ((spec.fields || []).length) nl(6);
  (spec.blocks || []).forEach((b) => {
    if (b.h) { nl(6); draw(b.h, bold, 13, blue); nl(18); }
    wrap(b.text, font, 11, maxW).forEach((line) => { draw(line, font, 11, ink); nl(15); });
    nl(4);
  });
  page.drawText("Prepared with For a Reason (forareason) — a plain-English, self-declared draft, not legal advice.", { x: M, y: M - 24, size: 8, font, color: grey });
  const bytes = await doc.save();
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = spec.filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function itineraryBlocks(tv: any, opts: any) {
  const plan = planItinerary(tv, opts);
  const blocks = plan.days.map((day: any) => {
    const lines = [day.note];
    day.stops.forEach((s: any) => { lines.push("\u2022 " + s.name + (s.label ? "  [" + s.label + "]" : "") + (s.why ? " \u2014 " + s.why : "")); if (s.station) lines.push("   Near: " + s.station); lines.push("   Directions: " + s.dir); });
    return { h: day.title, text: lines.join("\n") };
  });
  if (plan.overcommit) blocks.unshift({ h: "Take it easy", text: "There is more to see here than fits calmly in " + (opts.days || 7) + " days. We picked the best and left room to breathe." });
  return blocks;
}
