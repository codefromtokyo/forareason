"use client";
import { useEffect } from "react";
import { markCourse } from "@/lib/progress";
import { push } from "@/lib/progress-sync";
export function TrackVisit({ id, pct = 10 }: { id: string; pct?: number }) {
  useEffect(() => { const p = markCourse(id, pct); push(p); }, [id, pct]);
  return null;
}
