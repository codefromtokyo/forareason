"use client";
export interface Progress { badges: Record<string, { label: string; ts: number }>; courses: Record<string, number>; streak: number; lastDay?: string; }
const KEY = "forareason-progress";
export function loadProgress(): Progress {
  if (typeof window === "undefined") return { badges: {}, courses: {}, streak: 0 };
  try { return { badges: {}, courses: {}, streak: 0, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch { return { badges: {}, courses: {}, streak: 0 }; }
}
export function saveProgress(p: Progress) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {} }
export function markCourse(id: string, pct: number) {
  const p = loadProgress(); p.courses[id] = Math.max(p.courses[id] || 0, pct); saveProgress(p); return p;
}
export function awardBadge(id: string, label: string) {
  const p = loadProgress(); if (!p.badges[id]) { p.badges[id] = { label, ts: Date.now() }; saveProgress(p); } return p;
}
