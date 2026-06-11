"use client";

import { motion } from "framer-motion";
import { Flame, Star } from "lucide-react";
import { tileVariants, cardHoverVariants } from "@/lib/motion";

interface HeroTileProps {
  className?: string;
}

export function HeroTile({ className = "" }: HeroTileProps) {
  const streak = 12;

  return (
    <motion.article
      variants={tileVariants}
      initial="rest"
      whileHover="hover"
      // @ts-ignore framer-motion overloaded variants
      animate="visible"
      className={`relative overflow-hidden rounded-2xl bg-bg-elevated border border-bg-border p-6 min-h-[160px] grain-overlay ${className}`}
      aria-label="Welcome hero tile"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(79,70,229,0.2) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Decorative orb */}
      <motion.div
        className="absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,1) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <p className="text-text-muted text-sm font-medium mb-1">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary leading-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-violet to-accent-cyan">Alex</span> 👋
          </h1>
          <p className="text-text-secondary text-sm mt-2">
            You&apos;re on a roll! Keep up the momentum today.
          </p>
        </div>

        <div className="flex items-center gap-4 mt-6">
          {/* Streak Counter */}
          <motion.div
            className="flex items-center gap-2 bg-bg-surface rounded-xl px-4 py-2.5 border border-bg-border"
            whileHover={{ borderColor: "rgba(251,146,60,0.5)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Flame size={18} className="text-orange-400" />
            </motion.div>
            <div>
              <span className="text-lg font-bold text-text-primary">{streak}</span>
              <span className="text-text-muted text-xs ml-1">day streak</span>
            </div>
          </motion.div>

          {/* XP Badge */}
          <div className="flex items-center gap-2 bg-bg-surface rounded-xl px-4 py-2.5 border border-bg-border">
            <Star size={18} className="text-yellow-400" />
            <div>
              <span className="text-lg font-bold text-text-primary">2,840</span>
              <span className="text-text-muted text-xs ml-1">XP total</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
