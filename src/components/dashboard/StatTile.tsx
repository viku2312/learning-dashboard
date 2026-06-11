"use client";

import { motion } from "framer-motion";
import { tileVariants } from "@/lib/motion";
import type { LucideIcon } from "lucide-react";

interface StatTileProps {
  className?: string;
  label: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  accent: "violet" | "cyan" | "emerald" | "indigo";
}

const accentStyles: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  violet: {
    bg: "rgba(124,58,237,0.12)",
    text: "#7C3AED",
    border: "rgba(124,58,237,0.25)",
    glow: "rgba(124,58,237,0.2)",
  },
  cyan: {
    bg: "rgba(6,182,212,0.12)",
    text: "#06B6D4",
    border: "rgba(6,182,212,0.25)",
    glow: "rgba(6,182,212,0.2)",
  },
  emerald: {
    bg: "rgba(16,185,129,0.12)",
    text: "#10B981",
    border: "rgba(16,185,129,0.25)",
    glow: "rgba(16,185,129,0.2)",
  },
  indigo: {
    bg: "rgba(79,70,229,0.12)",
    text: "#4F46E5",
    border: "rgba(79,70,229,0.25)",
    glow: "rgba(79,70,229,0.2)",
  },
};

export function StatTile({ className = "", label, value, unit, icon: Icon, accent }: StatTileProps) {
  const styles = accentStyles[accent];

  return (
    <motion.article
      variants={tileVariants}
      className={`relative overflow-hidden rounded-2xl bg-bg-elevated border border-bg-border p-5 grain-overlay ${className}`}
      whileHover={{
        scale: 1.015,
        boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 20px ${styles.glow}`,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      aria-label={`${label}: ${value} ${unit}`}
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 80% 20%, ${styles.glow} 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: styles.bg, border: `1px solid ${styles.border}` }}
        >
          <Icon size={16} style={{ color: styles.text }} />
        </div>

        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-text-primary">{value}</span>
            <span className="text-xs text-text-muted">{unit}</span>
          </div>
          <p className="text-xs text-text-muted mt-0.5">{label}</p>
        </div>
      </div>
    </motion.article>
  );
}
