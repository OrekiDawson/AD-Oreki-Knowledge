// Pure helpers for Asia/Shanghai (UTC+8) first-PR-per-day selection.
export function dateUtc8(value) {
  const ms = new Date(value).getTime();
  if (!Number.isFinite(ms)) throw new Error("Invalid timestamp: " + String(value));
  return new Date(ms + 8 * 3600_000).toISOString().slice(0, 10);
}

export function firstPrOfDay(prs, day) {
  const matches = prs.filter((pr) => dateUtc8(pr.created_at) === day);
  matches.sort((a, b) => new Date(a.created_at) - new Date(b.created_at) || a.number - b.number);
  return matches[0] || null;
}

export function shortText(value, limit = 1000) {
  return String(value ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").slice(0, limit);
}
