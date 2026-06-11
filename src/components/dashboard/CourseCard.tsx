"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Layers,
  Code2,
  Network,
  Palette,
  BookOpen,
  Cpu,
  Globe,
  Database,
  GitBranch,
  Sparkles,
  type LucideProps,
} from "lucide-react";
import { tileVariants, progressBarVariants } from "@/lib/motion";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  className?: string;
}

const iconMap: Record<string, React.FC<LucideProps>> = {
  Layers,
  Code2,
  Network,
  Palette,
  BookOpen,
  Cpu,
  Globe,
  Database,
  GitBranch,
  Sparkles,
};

const gradientMap: Record<number, string> = {
  0: "from-violet-500/20 via-purple-500/10 to-transparent",
  1: "from-cyan-500/20 via-blue-500/10 to-transparent",
  2: "from-emerald-500/20 via-teal-500/10 to-transparent",
  3: "from-orange-500/20 via-amber-500/10 to-transparent",
};

const accentMap: Record<number, string> = {
  0: "#7C3AED",
  1: "#06B6D4",
  2: "#10B981",
  3: "#F59E0B",
};

export function CourseCard({ course, className = "" }: CourseCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const index = parseInt(course.id) % 4 || 0;

  const Icon = iconMap[course.icon_name] ?? BookOpen;
  const accent = accentMap[index] ?? "#7C3AED";
  const gradient = gradientMap[index] ?? gradientMap[0];

  return (
    <motion.article
      ref={ref}
      variants={tileVariants}
      initial="rest"
      whileHover="hover"
      animate={isInView ? "visible" : "hidden"}
      className={`relative overflow-hidden rounded-2xl bg-bg-elevated border border-bg-border p-5 grain-overlay cursor-pointer ${className}`}
      style={{ minHeight: "170px" }}
      aria-label={`Course: ${course.title}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60`}
        aria-hidden="true"
      />

      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        style={{ boxShadow: `inset 0 0 0 1px ${accent}40` }}
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col h-full gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${accent}20`, border: `1px solid ${accent}30` }}
        >
          <Icon size={18} style={{ color: accent }} />
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-text-primary leading-tight line-clamp-2">
            {course.title}
          </h3>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Progress</span>
            <span className="text-xs font-semibold" style={{ color: accent }}>
              {course.progress}%
            </span>
          </div>
          <div className="h-1.5 bg-bg-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${accent}CC, ${accent})`,
                boxShadow: `0 0 8px ${accent}80`,
              }}
              variants={progressBarVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={course.progress}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}