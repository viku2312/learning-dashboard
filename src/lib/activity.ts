import type { ActivityDay } from "@/types";

export function generateActivityData(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const today = new Date();

  for (let i = 83; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Generate realistic-looking activity
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseChance = isWeekend ? 0.3 : 0.65;
    const hasActivity = Math.random() < baseChance;
    const count = hasActivity ? Math.floor(Math.random() * 8) + 1 : 0;

    days.push({
      date: date.toISOString().split("T")[0],
      count,
    });
  }

  return days;
}

export function getActivityColor(count: number): string {
  if (count === 0) return "bg-bg-elevated";
  if (count <= 2) return "bg-accent-violet/30";
  if (count <= 4) return "bg-accent-violet/60";
  if (count <= 6) return "bg-accent-violet/80";
  return "bg-accent-violet";
}
