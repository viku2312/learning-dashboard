"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { tileVariants } from "@/lib/motion";
import { getActivityColor } from "@/lib/activity";
import { useMemo } from "react";
import type { ActivityDay } from "@/types";

interface ActivityTileProps {
  className?: string;
}

function generateStableActivityData(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const today = new Date();
  const seed = [3,0,5,2,7,1,4,6,2,0,8,3,1,5,0,4,2,6,3,1,7,0,2,5,4,1,3,0,6,2,
                8,1,4,0,3,5,2,7,1,0,4,3,6,2,1,5,0,3,4,2,7,1,0,5,3,2,6,1,4,0,
                3,2,5,1,7,0,4,3,2,6,1,0,5,2,3,4,1,6,0,3,2,5,1,4];

  for (let i = 83; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    days.push({
      date: date.toISOString().split("T")[0],
      count: seed[83 - i] ?? 0,
    });
  }
  return days;
}

export function ActivityTile({ className = "" }: ActivityTileProps) {
  const activityData = useMemo(() => generateStableActivityData(), []);

  const weeks: ActivityDay[][] = [];
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  return (
    <motion.article
      variants={tileVariants}
      className={`relative overflow-hidden rounded-2xl bg-bg-elevated border border-bg-border p-5 grain-overlay ${className}`}
      whileHover={{
        scale: 1.008,
        boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      aria-label="Learning activity chart"
    >
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(124,58,237,0.4) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-accent-violet" />
            <h2 className="text-sm font-semibold text-text-primary">Learning Activity</h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <span>Less</span>
            {[0, 2, 4, 6, 8].map((v) => (
              <div key={v} className={`w-3 h-3 rounded-sm ${getActivityColor(v)}`} />
            ))}
            <span>More</span>
          </div>
        </div>

        <div className="flex gap-1 overflow-x-auto pb-1">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1">
              {week.map((day, dIdx) => (
                <motion.div
                  key={day.date}
                  title={`${day.date}: ${day.count} activities`}
                  className={`w-3 h-3 rounded-sm ${getActivityColor(day.count)} transition-colors`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: (wIdx * 7 + dIdx) * 0.004,
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                  whileHover={{ scale: 1.4 }}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-4 text-xs text-text-muted">
          <span>
            <span className="text-text-primary font-semibold">
              {activityData.filter((d) => d.count > 0).length}
            </span>{" "}
            active days
          </span>
          <span>
            <span className="text-text-primary font-semibold">
              {activityData.reduce((sum, d) => sum + d.count, 0)}
            </span>{" "}
            total activities
          </span>
        </div>
      </div>
    </motion.article>
  );
}