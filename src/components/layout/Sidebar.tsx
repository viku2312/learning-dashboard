"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Zap,
  User,
  type LucideProps,
} from "lucide-react";
import { sidebarContainerVariants, sidebarItemVariants } from "@/lib/motion";
import type { NavItem } from "@/types";

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", href: "/dashboard" },
  { id: "courses", label: "My Courses", icon: "BookOpen", href: "/courses" },
  { id: "progress", label: "Progress", icon: "BarChart3", href: "/progress" },
  { id: "achievements", label: "Achievements", icon: "Trophy", href: "/achievements" },
  { id: "settings", label: "Settings", icon: "Settings", href: "/settings" },
];

const iconMap: Record<string, React.FC<LucideProps>> = {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings,
  Trophy,
};

export function Sidebar() {
  const [activeId, setActiveId] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        animate={{ width: collapsed ? 72 : 220 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col h-screen bg-bg-surface border-r border-bg-border relative z-20 flex-shrink-0"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-bg-border">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-violet flex items-center justify-center shadow-glow-violet">
            <Zap size={16} className="text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="font-semibold text-text-primary text-sm tracking-wide overflow-hidden whitespace-nowrap"
              >
                LearnOS
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav Items */}
        <motion.ul
          variants={sidebarContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 py-4 px-2 space-y-1 list-none"
          role="list"
        >
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = item.id === activeId;

            return (
              <motion.li key={item.id} variants={sidebarItemVariants}>
                <button
                  onClick={() => setActiveId(item.id)}
                  className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 group"
                  style={{ color: isActive ? "var(--text-primary)" : "var(--text-muted)" }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-highlight"
                      className="absolute inset-0 rounded-lg bg-accent-violet/20 border border-accent-violet/30"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex-shrink-0">
                    {Icon && (
                      <Icon
                        size={18}
                        className={isActive ? "text-accent-violet" : "text-text-muted group-hover:text-text-secondary"}
                      />
                    )}
                  </span>
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15 }}
                        className="relative z-10 whitespace-nowrap overflow-hidden font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* User Profile */}
        <div className="p-3 border-t border-bg-border">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-accent-violet to-accent-indigo flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-xs font-medium text-text-primary whitespace-nowrap">Vivek Kumar</p>
                  <p className="text-xs text-text-muted whitespace-nowrap">Pro Plan</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-bg-elevated border border-bg-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors z-30"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </motion.nav>

      {/* Mobile Bottom Nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-surface border-t border-bg-border"
        aria-label="Mobile navigation"
      >
        <ul className="flex items-center justify-around py-2 px-4 list-none" role="list">
          {navItems.slice(0, 4).map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = item.id === activeId;

            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveId(item.id)}
                  className="flex flex-col items-center gap-1 p-2 relative"
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobile-nav-highlight"
                      className="absolute inset-0 rounded-lg bg-accent-violet/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {Icon && (
                      <Icon
                        size={20}
                        className={isActive ? "text-accent-violet" : "text-text-muted"}
                      />
                    )}
                  </span>
                  <span className={`relative z-10 text-[10px] font-medium ${isActive ? "text-accent-violet" : "text-text-muted"}`}>
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}