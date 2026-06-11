"use client";

import { motion } from "framer-motion";
import { containerVariants } from "@/lib/motion";
import { HeroTile } from "./HeroTile";
import { CourseCard } from "./CourseCard";
import { ActivityTile } from "./ActivityTile";
import { StatTile } from "./StatTile";
import type { Course } from "@/types";
import { Clock, BookMarked, Award } from "lucide-react";

interface BentoGridProps {
  courses: Course[];
}

export function BentoGrid({ courses }: BentoGridProps) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 pb-24 md:pb-8"
      aria-label="Dashboard overview"
    >
      {/* Hero Tile - spans full on mobile, 8 cols on large */}
      <HeroTile className="col-span-1 md:col-span-2 lg:col-span-8" />

      {/* Stat Tiles - stack on mobile */}
      <StatTile
        className="col-span-1 lg:col-span-4"
        label="Study Hours"
        value="124"
        unit="hrs"
        icon={Clock}
        accent="cyan"
      />

      {/* Activity Tile */}
      <ActivityTile className="col-span-1 md:col-span-2 lg:col-span-7" />

      {/* Quick Stats */}
      <StatTile
        className="col-span-1 lg:col-span-2"
        label="Completed"
        value="18"
        unit="lessons"
        icon={BookMarked}
        accent="emerald"
      />

      <StatTile
        className="col-span-1 lg:col-span-3"
        label="Certificates"
        value="3"
        unit="earned"
        icon={Award}
        accent="violet"
      />

      {/* Course Cards */}
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          className="col-span-1 md:col-span-1 lg:col-span-3"
        />
      ))}
    </motion.section>
  );
}
