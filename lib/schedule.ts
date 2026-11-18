import type { OpeningHours } from '@/data/types';

/**
 * Вычисление статуса «открыто/закрыто» по расписанию вида «09:00–14:00».
 * Работает в браузере (см. OpenStatusBadge) — статический HTML при этом
 * остаётся полностью сгенерированным на билде.
 */

interface Interval {
  start: number;
  end: number;
}

const WEEK_DAYS: Record<string, number[]> = {
  пн: [1],
  вт: [2],
  ср: [3],
  чт: [4],
  пт: [5],
  сб: [6],
  вс: [0],
};

function toMinutes(time: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return hours * 60 + minutes;
}

/** «Пн–Пт» -> [1,2,3,4,5], «Сб» -> [6]. */
function parseDays(days: string): number[] {
  const normalized = days.toLowerCase().replace(/ё/g, 'е').replace(/\s/g, '');
  const range = /^([а-я]{2})[–-]([а-я]{2})$/.exec(normalized);
  if (range) {
    const from = [range[1] ? WEEK_DAYS[range[1]!.slice(0, 2)] : undefined].flat().find(Boolean);
    const to = [range[2] ? WEEK_DAYS[range[2]!.slice(0, 2)] : undefined].flat().find(Boolean);
    if (from === undefined || to === undefined) return [];
    const result: number[] = [];
    let day = from;
    for (let i = 0; i < 7; i += 1) {
      result.push(day);
      if (day === to) break;
      day = (day + 1) % 7;
    }
    return result;
  }
  const single = WEEK_DAYS[normalized.slice(0, 2)];
  return single ?? [];
}

function parseHours(hours: OpeningHours[]): Map<number, Interval[]> {
  const map = new Map<number, Interval[]>();
  for (const item of hours) {
    if (item.closed) continue;
    const [from, to] = item.time.split(/[–-]/).map((part) => toMinutes(part ?? ''));
    if (from == null || to == null) continue;
    for (const day of parseDays(item.days)) {
      const list = map.get(day) ?? [];
      list.push({ start: from, end: to });
      map.set(day, list);
    }
  }
  return map;
}

export function isOpenAt(hours: OpeningHours[], date = new Date()): boolean {
  const schedule = parseHours(hours);
  const now = date.getHours() * 60 + date.getMinutes();
  return (schedule.get(date.getDay()) ?? []).some(({ start, end }) => now >= start && now < end);
}

export function todayHours(hours: OpeningHours[], date = new Date()): string {
  const schedule = parseHours(hours);
  const intervals = schedule.get(date.getDay());
  if (!intervals || intervals.length === 0) return 'выходной';
  const pad = (n: number) => String(n).padStart(2, '0');
  return intervals
    .map(({ start, end }) => `${pad(Math.floor(start / 60))}:${pad(start % 60)}–${pad(Math.floor(end / 60))}:${pad(end % 60)}`)
    .join(', ');
}
