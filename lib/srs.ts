"use client";
/* Leitner spaced-repetition over vocab, stored locally. Drives the daily review habit + streak. */
export interface Card { box: number; due: number; }     // box 0-4, due = epoch ms
export interface SrsState { cards: Record<string, Card>; streak: number; lastReviewDay?: string; reviewedToday: number; dayGoal: number; }
const KEY = "forareason-srs";
const INTERVALS = [0, 1, 3, 7, 21]; // days per box
const dayStr = (d = new Date()) => d.toISOString().slice(0, 10);

export function loadSrs(): SrsState {
  if (typeof window === "undefined") return { cards: {}, streak: 0, reviewedToday: 0, dayGoal: 15 };
  try { return { cards: {}, streak: 0, reviewedToday: 0, dayGoal: 15, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; }
  catch { return { cards: {}, streak: 0, reviewedToday: 0, dayGoal: 15 }; }
}
export function saveSrs(s: SrsState) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} }

export const cardKey = (code: string, level: string, word: string) => `${code}:${level}:${word}`;

// words = [[word, meaning]]; returns due keys (or new, capped) for a review session
export function dueCards(s: SrsState, code: string, level: string, words: [string, string][], limit = 20) {
  const now = Date.now();
  const due: { key: string; word: string; meaning: string; isNew: boolean }[] = [];
  const fresh: { key: string; word: string; meaning: string; isNew: boolean }[] = [];
  for (const [w, m] of words) {
    const k = cardKey(code, level, w); const c = s.cards[k];
    if (!c) fresh.push({ key: k, word: w, meaning: m, isNew: true });
    else if (c.due <= now) due.push({ key: k, word: w, meaning: m, isNew: false });
  }
  return [...due, ...fresh].slice(0, limit);
}

export function grade(s: SrsState, key: string, correct: boolean): SrsState {
  const c = s.cards[key] || { box: 0, due: 0 };
  const box = correct ? Math.min(4, c.box + 1) : 0;
  const due = Date.now() + INTERVALS[box] * 86400000;
  s.cards = { ...s.cards, [key]: { box, due } };
  const today = dayStr();
  if (s.lastReviewDay !== today) {
    const yest = dayStr(new Date(Date.now() - 86400000));
    s.streak = s.lastReviewDay === yest ? (s.streak || 0) + 1 : 1;
    s.lastReviewDay = today; s.reviewedToday = 0;
  }
  s.reviewedToday = (s.reviewedToday || 0) + 1;
  saveSrs(s);
  return { ...s };
}

export function totalDue(code: string, level: string, words: [string, string][]) {
  const s = loadSrs(); return dueCards(s, code, level, words, 999).length;
}
